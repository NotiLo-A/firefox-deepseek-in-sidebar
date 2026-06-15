const sidebarToggle = "_execute_sidebar_action";

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
  }
}

async function openSidebar() {
  try {
    await browser.sidebarAction.toggle();

    const isOpen = await browser.sidebarAction.isOpen({});
    await browser.storage.local.set({ sidebarOpen: isOpen });
  } catch (error) {
    console.error("Error toggling sidebar:", error);
  }
}

browser.runtime.onStartup.addListener(async () => {
  try {
    const { sidebarOpen } = await browser.storage.local.get("sidebarOpen");
    const currentlyOpen = await browser.sidebarAction.isOpen({});

    if (sidebarOpen && !currentlyOpen) {
      await browser.sidebarAction.open();
    }
  } catch (error) {
    console.error("Error restoring sidebar state:", error);
  }
});

browser.browserAction.onClicked.addListener(openSidebar);
document.addEventListener("DOMContentLoaded", updateUI);
