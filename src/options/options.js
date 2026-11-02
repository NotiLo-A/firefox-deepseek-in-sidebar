const sidebarToggle = "_execute_sidebar_action";
let feedbackTimer = null;

function t(key, fallback = "") {
  if (typeof browser !== "undefined" && browser.i18n && browser.i18n.getMessage) {
    const msg = browser.i18n.getMessage(key);
    if (msg) return msg;
  }
  return fallback;
}

function localizeUI() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const msg = t(key);
    if (msg) {
      if (el.tagName === "INPUT" && el.hasAttribute("placeholder")) {
        el.setAttribute("placeholder", msg);
      } else {
        el.textContent = msg;
      }
    }
  });

  const pageTitle = t("settingsTitle");
  if (pageTitle) {
    document.title = pageTitle;
  }
}

function isValidShortcut(shortcut) {
  if (!shortcut || shortcut.trim() === "") {
    return true; // Empty string is valid (removes shortcut)
  }

  const s = shortcut.trim();

  // Standalone function keys F1-F12 are valid without modifiers
  if (/^F([1-9]|1[0-2])$/i.test(s)) {
    return true;
  }

  // Key combination must have a primary modifier (Ctrl, Alt, Command, MacCtrl)
  // Optionally a secondary modifier (Shift or another distinct modifier)
  // And a key
  const validKey =
    "([A-Z0-9]|F[1-9]|F1[0-2]|Home|End|PageUp|PageDown|Space|Insert|Delete|Up|Down|Left|Right|Period|Comma)";
  const pattern = new RegExp(
    `^(Ctrl|Alt|Command|MacCtrl)(\\+(Shift|Ctrl|Alt|Command|MacCtrl))?\\+${validKey}$`,
    "i"
  );

  const match = s.match(pattern);
  if (!match) {
    return false;
  }

  // If a secondary modifier is present, it must differ from the primary modifier
  const primaryMod = match[1].toLowerCase();
  const secondaryMod = match[3] ? match[3].toLowerCase() : null;
  if (secondaryMod && primaryMod === secondaryMod) {
    return false;
  }

  return true;
}

function showFeedback(message, isError = false) {
  const feedback = document.querySelector("#feedback");
  if (!feedback) return;

  if (feedbackTimer) {
    clearTimeout(feedbackTimer);
    feedbackTimer = null;
  }

  feedback.textContent = message;
  feedback.className = `notification ${isError ? "is-danger" : "is-success"}`;
  feedback.classList.remove("is-hidden");

  feedbackTimer = setTimeout(() => {
    feedback.classList.add("is-hidden");
    feedbackTimer = null;
  }, 3500);
}

async function updateUI() {
  try {
    const commands = await browser.commands.getAll();
    const input = document.querySelector("#shortcut");
    for (const command of commands) {
      if (command.name === sidebarToggle) {
        input.value = command.shortcut || "";
        validateInput();
        break;
      }
    }
  } catch (error) {
    console.error("Error loading shortcut settings:", error);
    showFeedback(t("feedbackErrorLoad", "Error loading settings"), true);
  }
}

function validateInput() {
  const input = document.querySelector("#shortcut");
  const updateBtn = document.querySelector("#update");
  const value = input.value.trim();

  if (value === "") {
    input.classList.remove("is-danger");
    input.classList.add("is-success");
    updateBtn.disabled = false;
    return;
  }

  if (isValidShortcut(value)) {
    input.classList.remove("is-danger");
    input.classList.add("is-success");
    updateBtn.disabled = false;
  } else {
    input.classList.remove("is-success");
    input.classList.add("is-danger");
    updateBtn.disabled = true;
  }
}

async function updateShortcut(event) {
  if (event) {
    event.preventDefault();
  }

  const input = document.querySelector("#shortcut");
  const shortcutValue = input.value.trim();

  if (!isValidShortcut(shortcutValue)) {
    showFeedback(
      t("feedbackErrorInvalid", "Invalid shortcut format! Example: Alt+Shift+D"),
      true
    );
    return;
  }

  try {
    await browser.commands.update({
      name: sidebarToggle,
      shortcut: shortcutValue,
    });
    showFeedback(t("feedbackSuccess", "Shortcut successfully updated!"));
    validateInput();
  } catch (error) {
    console.error("Error updating shortcut:", error);
    const errorMsg =
      (error && error.message) ||
      t("feedbackErrorUpdate", "Error updating keyboard shortcut");
    showFeedback(errorMsg, true);
  }
}

async function resetShortcut() {
  try {
    await browser.commands.reset(sidebarToggle);
    await updateUI();
    showFeedback(t("feedbackReset", "Shortcut reset to default"));
  } catch (error) {
    console.error("Error resetting shortcut:", error);
    showFeedback(
      t("feedbackErrorUpdate", "Error resetting keyboard shortcut"),
      true
    );
  }
}

async function openFirefoxShortcuts() {
  try {
    if (
      typeof browser !== "undefined" &&
      browser.commands &&
      typeof browser.commands["openShortcutSettings"] === "function"
    ) {
      await browser.commands["openShortcutSettings"]();
    } else {
      window.open("about:addons", "_blank");
    }
  } catch (error) {
    console.error("Error opening Firefox shortcut settings:", error);
    showFeedback(
      (error && error.message) || "Unable to open Firefox shortcut settings",
      true
    );
  }
}

function handleKeyCapture(e) {
  // Allow navigation keys without modifier (Tab, Escape) to behave normally
  if (e.key === "Tab" || e.key === "Escape") {
    return;
  }

  // Clear on Backspace or Delete if pressed without modifier
  if ((e.key === "Backspace" || e.key === "Delete") && !e.ctrlKey && !e.altKey && !e.metaKey) {
    e.preventDefault();
    e.target.value = "";
    validateInput();
    return;
  }

  // Don't record pure modifier presses
  if (["Control", "Alt", "Shift", "Meta"].includes(e.key)) {
    return;
  }

  const parts = [];

  // Match platform conventions (Firefox WebExtensions: Ctrl / Alt / Command / MacCtrl + optional Shift)
  if (e.ctrlKey) parts.push("Ctrl");
  if (e.altKey) parts.push("Alt");
  if (e.metaKey) parts.push("Command");
  if (e.shiftKey) parts.push("Shift");

  let keyName = e.key;

  // Normalize key names to Firefox WebExtensions format
  if (/^Key[A-Z]$/.test(e.code)) {
    keyName = e.code.replace("Key", "");
  } else if (/^Digit[0-9]$/.test(e.code)) {
    keyName = e.code.replace("Digit", "");
  } else if (keyName === " ") {
    keyName = "Space";
  } else if (keyName === "ArrowUp") {
    keyName = "Up";
  } else if (keyName === "ArrowDown") {
    keyName = "Down";
  } else if (keyName === "ArrowLeft") {
    keyName = "Left";
  } else if (keyName === "ArrowRight") {
    keyName = "Right";
  } else if (e.code === "Comma" || keyName === ",") {
    keyName = "Comma";
  } else if (e.code === "Period" || keyName === ".") {
    keyName = "Period";
  } else if (/^[a-z]$/.test(keyName)) {
    keyName = keyName.toUpperCase();
  }

  // Prevent browser default shortcut execution while capturing
  if (parts.length > 0 || /^F([1-9]|1[0-2])$/i.test(keyName)) {
    e.preventDefault();
    parts.push(keyName);
    e.target.value = parts.join("+");
    validateInput();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  localizeUI();
  updateUI();

  const form = document.querySelector("#settings-form");
  if (form) {
    form.addEventListener("submit", updateShortcut);
  }

  const resetBtn = document.querySelector("#reset");
  if (resetBtn) {
    resetBtn.addEventListener("click", resetShortcut);
  }

  const openShortcutsBtn = document.querySelector("#open-firefox-shortcuts");
  if (openShortcutsBtn) {
    openShortcutsBtn.addEventListener("click", openFirefoxShortcuts);
  }

  const shortcutInput = document.querySelector("#shortcut");
  if (shortcutInput) {
    shortcutInput.addEventListener("input", validateInput);
    shortcutInput.addEventListener("keydown", handleKeyCapture);
  }
});
