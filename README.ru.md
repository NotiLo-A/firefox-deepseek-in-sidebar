##### Языки:
[![English](https://img.shields.io/badge/English-lightgrey)](README.md) &nbsp; 
[![中文](https://img.shields.io/badge/%E4%B8%AD%E6%96%87-lightgrey)](README.zh-CN.md) &nbsp;
[![Русский](https://img.shields.io/badge/%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9-4d6eff)](README.ru.md)  

# <img src="assets/deepseek.png" width="64" height="64" /> DeepSeek in Sidebar

![Mozilla Add-on](https://img.shields.io/amo/v/deepseek-in-sidebar)
![Add-on rating](https://img.shields.io/amo/rating/deepseek-in-sidebar)
![Add-on downloads](https://img.shields.io/amo/dw/deepseek-in-sidebar)
![Add-on users](https://img.shields.io/amo/users/deepseek-in-sidebar)
![License](https://img.shields.io/github/license/NotiLo-A/firefox-deepseek-in-sidebar)

Расширение для Firefox, которое показывает DeepSeek в боковой панели браузера. Оно добавляет в боковую панель новый раздел с веб-приложением DeepSeek, а также сочетание клавиш и кнопку на панели инструментов для её переключения.

[![Установить дополнение](https://raw.githubusercontent.com/semanticdata/text-revealer-firefox-extension/master/firefox.png)](https://addons.mozilla.org/en-US/firefox/addon/deepseek-in-sidebar/)

## Использование

1. Нажмите _`Alt+Shift+D`_, чтобы открыть или закрыть боковую панель. Это сочетание можно изменить в разделе _`Дополнения` → `DeepSeek in Sidebar` → `Настройки`_.
2. Если вам удобнее кнопки, нажмите кнопку на панели инструментов, чтобы переключить боковую панель.

## Локальная установка / Разработка

Если вы клонировали исходный код этого репозитория и хотите загрузить его самостоятельно (а не устанавливать из магазина), есть три способа:

1. **Временная загрузка (рекомендуется для отладки)**: откройте Firefox, перейдите по адресу `about:debugging#/runtime/this-firefox`, нажмите «Загрузить временное дополнение...» («Load Temporary Add-on») и выберите файл `manifest.json` в папке репозитория. После загрузки DeepSeek появится в боковой панели (временная загрузка сбрасывается при перезапуске Firefox).
2. **Установка из магазина**: перейдите на [Mozilla Add-ons](https://addons.mozilla.org/en-US/firefox/addon/deepseek-in-sidebar/) для установки официальной версии.
3. **Инструмент web-ext**: выполните `npm start` или `npx web-ext run` (требуется среда Node.js) в корневой папке проекта - это автоматически запустит Firefox и загрузит расширение.

## ⚠ Отказ от ответственности

Это расширение является независимым проектом, не связано с DeepSeek и не аффилировано с ним никоим образом. Расширение предназначено в первую очередь для личного использования, это, можно сказать, личный проект. Дополнение <i>только</i> открывает веб-приложение DeepSeek в боковой панели.

## © Лицензия

Исходный код в этом репозитории доступен по [лицензии MIT](LICENSE).
