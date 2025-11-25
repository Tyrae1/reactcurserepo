ДЗ 13. Робота з URL В JavaScript


1. index.html

Є масив задач у JS (3–5 штук з id, title, status).
Вивести список задач на сторінку.
Додати інпут search і селект status (all | done | pending).
При зміні фільтрів оновлювати URL: ?status=...&search=... через history.pushState/replaceState.
При завантаженні сторінки читати status і search з URL і застосовувати фільтри.
2. Перехід на сторінку деталей (task.html)

У кожної задачі кнопка/лінк “Деталі” → перехід на task.html?id=XXX.
На task.html прочитати id з URL (URLSearchParams), знайти задачу в масиві, показати її дані.
Кнопка “Назад” → history.back().
Обов’язково використати:
new URL(window.location.href)
url.searchParams
history.pushState / history.replaceState
window.addEventListener('popstate', ...)
