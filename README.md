##### Languages:
[![English](https://img.shields.io/badge/English-4d6eff)](README.md) &nbsp; 
[![中文](https://img.shields.io/badge/%E4%B8%AD%E6%96%87-lightgrey)](README.zh-CN.md) &nbsp;
[![Русский](https://img.shields.io/badge/%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9-lightgrey)](README.ru.md)  

# <img src="assets/deepseek.png" width="64" height="64" /> DeepSeek in Sidebar

![Mozilla Add-on](https://img.shields.io/amo/v/deepseek-in-sidebar)
![Add-on rating](https://img.shields.io/amo/rating/deepseek-in-sidebar)
![Add-on downloads](https://img.shields.io/amo/dw/deepseek-in-sidebar)
![Add-on users](https://img.shields.io/amo/users/deepseek-in-sidebar)
![License](https://img.shields.io/github/license/NotiLo-A/firefox-deepseek-in-sidebar)

Firefox extension to display DeepSeek within the Firefox sidebar. This extension adds a new section to the sidebar which contains the DeepSeek web app. It also adds a shortcut, and a button toggle within the toolbar.

[![Get the Addon](https://raw.githubusercontent.com/semanticdata/text-revealer-firefox-extension/master/firefox.png)](https://addons.mozilla.org/en-US/firefox/addon/deepseek-in-sidebar/)

## Usage

1. Toggle the sidebar by pressing _`Alt+Shift+D`_. This shortcut can be changed by going to _`Add-ons` → `DeepSeek in Sidebar` → `Options`_.
2. If you prefer buttons over shortcuts, there is a toolbar button you can press to toggle the sidebar.

## Local Installation / Development

If you cloned this repository's source code and want to load it yourself (instead of installing from the store), there are three ways:

1. **Temporary loading (recommended for debugging)**: Open Firefox, navigate to `about:debugging#/runtime/this-firefox`, click "Load Temporary Add-on...", and select the `manifest.json` file in this repository. Once loaded, DeepSeek will appear in the sidebar (this temporary loading expires after Firefox restarts).
2. **Store installation**: Go to [Mozilla Add-ons](https://addons.mozilla.org/en-US/firefox/addon/deepseek-in-sidebar/) to install the official release.
3. **web-ext tool**: Run `npm start` or `npx web-ext run` (requires Node.js environment) in the project root to automatically launch Firefox and load the extension.

## ⚠ Disclaimer

This extension is an independent project, has no relationship, and is not affiliated to DeepSeek in any way. This extension is primarily for personal use; a personal project if you will. This add-on <i>only</i> launches their web app in the sidebar.

## © License

Source code in this repository is available under the [MIT License](LICENSE).
