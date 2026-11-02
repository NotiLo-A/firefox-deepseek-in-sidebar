/**
 * Background script for DeepSeek in Sidebar extension.
 */

const DEEPSEEK_URL = "https://chat.deepseek.com/";

async function initSidebar() {
  try {
    await browser.sidebarAction.setPanel({ panel: DEEPSEEK_URL });
  } catch (error) {
    console.error("Error setting sidebar panel:", error);
  }
}

async function toggleSidebar() {
  try {
    await browser.sidebarAction.toggle();
  } catch (error) {
    console.error("Error toggling DeepSeek sidebar:", error);
  }
}

// Set DeepSeek URL directly on startup and installation so sidebar opens it instantly
initSidebar();
browser.runtime.onInstalled.addListener(initSidebar);
browser.runtime.onStartup.addListener(initSidebar);

browser.action.onClicked.addListener(toggleSidebar);
