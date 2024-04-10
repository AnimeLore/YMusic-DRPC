[[ > Русский < ]](https://github.com/Maks1mio/YMusic-DRPC) - [[ English ]](https://github.com/Maks1mio/YMusic-DRPC/blob/main/doc/en/readme.md)
![image](https://github.com/Maks1mio/YMusic-DRPC/assets/44835662/8e797094-3fac-4e3e-aedb-c9e3f3106cb3)

<p align="center">
   <a href="https://discord.gg/qy42uGTzRy">
      <img width="250" alt="YMusic-DRPC приглашение" src="https://github.com/Maks1mio/YMusic-DRPC/assets/44835662/405a8b18-1383-45d0-944a-8d7e4abf6e42">
   </a>
</p>

**Интеграция Discord Rich Presence для YandexMusic - Документация**

*Примечание: Следующие инструкции предполагают, что Яндекс Музыка BETA 5.0.19 установлен в стандартном каталоге ("AppData\Local\Programs\YandexMusic"). Убедитесь, что Яндекс Музыка закрыт перед выполнением следующих шагов.*

**Скриншоты**

![image](https://github.com/Maks1mio/YMusic-DRPC/assets/44835662/c8af3316-db14-4fdd-85dc-23fc6e8d9406)

![image](https://github.com/Maks1mio/YMusic-DRPC/assets/44835662/8cb9421e-feac-454c-abad-6ce6e0b769fe)
![image](https://github.com/Maks1mio/YMusic-DRPC/assets/44835662/20965613-eb89-41cf-99dc-6430b93d38e8)

### Этапы установки:

1. **Скачайте YandexMusic:**
   - Скачайте YandexMusic BETA 5.0.19 с [Yandex Music](https://music.yandex.ru/download/?utm_source=music&utm_medium=selfpromo_music&utm_term=branding&utm_campaign=app).
   - Установите YandexMusic в стандартный каталог: `C:\Users\<ВашеИмя>\AppData\Local\Programs\YandexMusic`.

2. **Скачайте файлы скрипта**
   - Скачайте файлы проекты или склонируй проект с помошью консоли:
    ```bash
    git clone https://github.com/Maks1mio/YMusic-DRPC.git
    ```
   - Склонируйте в каталог Programs: `C:\Users\<ВашеИмя>\AppData\Local\Programs`.

    ### Структура каталогов:
    ```markdown
    | Local\Programs        | Files              |
    |-----------------------|--------------------|
    | YMusic-DRPC/          |                    |
    | |-- YandexDiscordRPC/ |                    |
    | |   |-- main.py       |                    |
    | |   |-- другие файлы..|                    |
    | YandexMusic/          |                    |
    | |-- Яндекс Музыка.exe |                    |
    | |-- другие файлы...   |                    |
    ```  

3. **Установите зависимости:**
   - Дважды щелкните по `install.cmd`, чтобы установить все модули.

4. **Запустите скрипт:**
   - Дважды щелкните по `YDRPC.exe`, чтобы запустить скрипт Discord Rich Presence.

### Использование:

- Скрипт автоматически определяет, использовать ли `py` ~~или `python`~~ в зависимости от вашей системы. Если один не работает, он пробует другой.

- Скрипт запускает сервер на порту 19582 и обновляет информацию о Яндекс Музыка в вашем Discord Rich Presence.

### Устранение неполадок:

- **Ошибки скрипта:**
  - Если возникают ошибки, проверьте консольное окно для получения подробностей.
  - Убедитесь, что Яндекс Музыка закрыт перед запуском скрипта.

- **Версия YandexMusic:**
  - Этот скрипт разработан для Яндекс Музыка BETA 5.0.19

- **Зависимости:**
  - Если возникают проблемы с зависимостями, убедитесь, что ваша установка Python находится в системном PATH.

- **WebSocket URL не найден:**
  - Если URL WebSocket не найден, проверьте, запущен ли Яндекс Музыка и включена ли опция удаленной отладки.

### Дополнительная информация:

- Скрипт создает файл журнала (`yandex_music.log`) в каталоге Яндекс Музыка для отладки. 
**НА ДАННЫЙ МОМЕНТ НЕ ИМЕЕТ СМЫСЛА**

- Кнопки в Discord Rich Presence позволяют открыть текущий трек в браузере.

- Следите за обновлениями или изменениями в скрипте на [репозитории GitHub](https://github.com/Maks1mio/YMusic-DRPC).

**Отказ от ответственности:**
Эта интеграция была разработана исключительно в образовательных целях. Совместимость с будущими версиями Яндекс Музыка не гарантируется. **За использование данного скрипта в целях нарушения правил YandexMusic может наложить бан на ваш аккаунт.**
