const sidebarToggle = "_execute_sidebar_action";
// test
function isValidShortcut(shortcut) {
  if (!shortcut || shortcut.trim() === "") return false;

  const pattern =
    /^((Ctrl|Alt|Command|MacCtrl|Shift)\+)+([\w\d]|F[1-9]|F1[0-2]|Home|End|PageUp|PageDown|Space|Insert|Delete|Up|Down|Left|Right|Period|Comma)$/i;
  return pattern.test(shortcut);
}

function showFeedback(message, isError = false) {
  const feedback = document.querySelector("#feedback");
  feedback.textContent = message;
  feedback.className = `notification ${isError ? "is-danger" : "is-success"} is-light`;
  feedback.style.display = "block";

  setTimeout(() => {
    feedback.style.display = "none";
  }, 3000);
}

async function updateUI() {
  try {
    let commands = await browser.commands.getAll();
    for (const command of commands) {
      if (command.name === sidebarToggle) {
        document.querySelector("#shortcut").value = command.shortcut;
      }
    }
  } catch (error) {
    console.error("Error updating UI:", error);
    showFeedback("Error loading settings", true);
  }
}

function validateInput() {
  const input = document.querySelector("#shortcut");
  const value = input.value.trim();
  const updateBtn = document.querySelector("#update");

  if (value === "") {
    input.classList.remove("is-danger", "is-success");
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

async function updateShortcut() {
  const shortcutValue = document.querySelector("#shortcut").value.trim();

  if (!isValidShortcut(shortcutValue)) {
    showFeedback("Invalid shortcut format! Example: Alt+Shift+D", true);
    return;
  }

  try {
    await browser.commands.update({
      name: sidebarToggle,
      shortcut: shortcutValue,
    });
    showFeedback("successfully updated!");
  } catch (error) {
    console.error("Error updating shortcut:", error);
    showFeedback("Error updating keyboard shortcut", true);
  }
}

async function resetShortcut() {
  try {
    await browser.commands.reset(sidebarToggle);
    await updateUI();
    showFeedback("reset to default");
  } catch (error) {
    console.error("Error resetting shortcut:", error);
    showFeedback("Error resetting keyboard shortcut", true);
  }
}

function applyTheme() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.body.classList.toggle("dark-theme", prefersDark);
}

document.addEventListener("DOMContentLoaded", () => {
  updateUI();
  applyTheme();
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", applyTheme);
});

document.querySelector("#update").addEventListener("click", updateShortcut);
document.querySelector("#reset").addEventListener("click", resetShortcut);
document.querySelector("#shortcut").addEventListener("input", validateInput);
