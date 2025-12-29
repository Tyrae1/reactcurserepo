GPT-подібний чат (Frontend-only) з роутингом + Redux + MUI
1) Ціль
   Зробити SPA “як ChatGPT” без бекенду:

список чатів
сторінка конкретного чату
відправка повідомлень
отримання відповіді через API провайдера напряму з браузера або через mock
Redux для всього state/flow
MUI для UI
2) Техстек (обов’язково)
   React + TypeScript
   React Router
   Redux Toolkit
   MUI
   HTTP: fetch (або axios)
3) Роутинг
   /chats — список чатів
   /chats/:chatId — конкретний чат
   /settings — налаштування (ключ/модель/температура)
* → redirect /chats
4) Модель даних (Redux state)
   Chat

id, title, createdAt, updatedAt
Message

id, chatId, role: 'user'|'assistant'|'system'
content
createdAt
status: 'draft'|'sending'|'streaming'|'done'|'error'
error?: string
UI

activeChatId
inputDraftByChatId: Record<chatId, string>
isStreamingByChatId: Record<chatId, boolean>
toast?: { type, message }
Вимога: або createEntityAdapter, або чітка структура без дублювань.

5) API шар (без сервера)
   Варіант A: User-provided API key (рекомендовано для реального LLM)
   На /settings користувач вводить:

apiKey
model
temperature
Зберігання:

localStorage (мінімум)
бонус: шифрування (не “справжня” безпека, але ок)
Вимога: В UI прямо показати попередження: “ключ зберігається локально у браузері”.

Варіант B: Mock provider (для навчання)
mockChatCompletion(messages) повертає текст (або стрімить символи/слова таймером).

6) Поведінка чату
   Мінімум (one-shot)
   Користувач пише → Send
   Додається message(role=user)
   Додається placeholder message(role=assistant, status=sending)
   Запит → оновити assistant content → status=done
   Помилка → status=error + показати Snackbar
   Бонус (стрімінг-емуляція)
   assistant message оновлюється chunk-ами (таймером або ReadableStream якщо провайдер підтримує)
   кнопка Stop (AbortController)
7) UI (MUI)
   Layout

Left sidebar: список чатів + кнопка New chat
Main: повідомлення + інпут
Компоненти

ChatSidebar
ChatHeader (title + rename/delete actions)
MessageList
MessageBubble (MUI Paper)
ChatComposer (TextField multiline + IconButton Send)
SettingsPage (TextField для ключа, Select для моделі)
UX

автоскрол вниз
disabled input під час streaming
Enter → send, Shift+Enter → newline
Snackbar для errors
8) Обов’язкові фічі
   New chat → створює чат і redirect на нього
   Rename chat (Dialog або inline)
   Delete chat (Confirm Dialog)
   Draft input окремо для кожного чату
   Persist в localStorage (чати+меседжі+settings без ключа або з ключем — залежно від варіанту)
9) Acceptance Criteria
   Працюють роути /chats, /chats/:chatId, /settings
   Redux керує чатами/повідомленнями/статусами
   UI тільки на MUI
   Є обробка помилок (Snackbar + статус message=error)
   Дані відновлюються після refresh
   Нема “бізнес-логіки” в компонентах (тільки dispatch/select)

