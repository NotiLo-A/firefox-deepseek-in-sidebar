##### 语言：
[![English](https://img.shields.io/badge/English-lightgrey)](README.md) &nbsp; 
[![中文](https://img.shields.io/badge/%E4%B8%AD%E6%96%87-4d6eff)](README.zh-CN.md) &nbsp;
[![Русский](https://img.shields.io/badge/%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9-lightgrey)](README.ru.md) 

# <img src="src/icons/deepseek.png" width="64" height="64" /> DeepSeek in Sidebar（Firefox 侧边栏版）

![Mozilla Add-on](https://img.shields.io/amo/v/deepseek-in-sidebar)
![Add-on rating](https://img.shields.io/amo/rating/deepseek-in-sidebar)
![Add-on downloads](https://img.shields.io/amo/dw/deepseek-in-sidebar)
![Add-on users](https://img.shields.io/amo/users/deepseek-in-sidebar)
![License](https://img.shields.io/github/license/NotiLo-A/firefox-deepseek-in-sidebar)

一款 Firefox 扩展，用于在 Firefox 侧边栏中显示 DeepSeek。本扩展会在侧边栏新增一个区域，内嵌 DeepSeek 网页应用（chat.deepseek.com）；同时提供快捷键与工具栏按钮来开关侧边栏。

[![获取扩展](https://raw.githubusercontent.com/semanticdata/text-revealer-firefox-extension/master/firefox.png)](https://addons.mozilla.org/en-US/firefox/addon/deepseek-in-sidebar/)

## 功能说明

- 侧边栏内嵌 DeepSeek 聊天页（`chat.deepseek.com`），开箱即用。
- 工具栏按钮（Toolbar Button）一键开关侧边栏。
- 默认快捷键 `Alt+Shift+D` 开关侧边栏，可在「选项」页自定义或重置。
- 重新打开 Firefox 时会记住上次侧边栏的开关状态（基于本地存储 `storage`）。
- 仅申请 `storage` 权限；采用 Manifest V2，最低要求 Firefox 100.0。

## 使用方法

1. 按 `Alt+Shift+D` 开关侧边栏。该快捷键可在 `附加组件 → DeepSeek in Sidebar → 选项` 中修改。
2. 若更习惯用按钮，可点击工具栏上的按钮来开关侧边栏。

## 本地加载 / 开发调试

如果你克隆了本仓库的源码，想自己加载（而不是从商店安装），有三种方式：

1. **临时加载（推荐用于调试）**：打开 Firefox，访问 `about:debugging#/runtime/this-firefox`，点击「临时加载附加组件（Load Temporary Add-on）」，选择本仓库目录下的 `manifest.json` 文件。加载后即可在侧边栏看到 DeepSeek；该临时加载在 Firefox 重启后失效。
2. **商店安装**：前往 [Mozilla Add-ons](https://addons.mozilla.org/en-US/firefox/addon/deepseek-in-sidebar/) 一键安装正式版。
3. **web-ext 工具**：在项目根目录执行 `npx web-ext run`（需要 Node.js 环境），会自动启动 Firefox 并加载扩展。

## 如何解除 Firefox 侧边栏宽度限制

Firefox 默认会**锁定侧边栏宽度**。由于侧边栏本身限制较多，扩展能做的增强有限，下面给出一步步解除限制的方法。

### 操作步骤

1. 在新标签页中打开 `about:support`。
2. 在「应用程序概要（Application Basics）」中找到「配置文件夹（Profile Folder）」。
3. 点击它旁边的「打开文件夹（Open Folder）」按钮。路径类似：`%appdata%\Mozilla\Firefox\Profiles\{profile-id}.default`。
4. 在 Firefox 的**配置文件夹**内，新建一个名为 `chrome` 的文件夹。
5. 在新建的 `chrome` 文件夹内，新建一个名为 `userChrome.css` 的文件。
6. 将以下代码复制进去并保存：

```css
#sidebar-box {
  max-width: 40% !important;
  min-width: 300px !important;
}
```

7. 最后，在新标签页打开 `about:config`，搜索 `toolkit.legacyUserProfileCustomizations.stylesheets` 并将其改为 `true`。
8. 重启 Firefox 即可生效！

## ⚠ 免责声明

本扩展是一个独立项目，与 DeepSeek **无任何关联，也未获得其授权或背书**。本扩展主要供个人使用，本质上只是将 DeepSeek 的网页应用以侧边栏形式打开。

## © 许可证

本仓库中的源代码基于 [MIT 许可证](LICENSE) 发布。
