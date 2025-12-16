Mini Pokédex на RTK Query + MUI

1) API
   PokeAPI: https://pokeapi.co/api/v2

Потрібно лише:

GET /pokemon?limit=20&offset=0 — список
GET /pokemon/{name-or-id} — деталі
(Опційно) GET /pokemon-species/{name-or-id} — опис (якщо хочете “+1 фіча”).

2) UI
   A. Список
   Показати 20 покемонів (name + картинка sprite).
   Next/Prev сторінки (через offset).
   Loading / error / empty стани.
   B. Деталі
   При кліку на покемона відкривається Details (можна окрема сторінка або drawer).
   Показати: name, id, sprite, types, stats.
3) RTK Query (обов’язково)
   createApi + fetchBaseQuery
   2 endpoints:
   getPokemonList({ limit, offset })
   getPokemonByName(nameOrId)
   Prefetch: на hover по елементу списку зробити prefetch деталей:
   api.util.prefetch("getPokemonByName", name, { force: false })
   Skip: якщо nameOrId пустий (або details не вибрані) — не робити запит (через skipToken або skip: true).
4) Acceptance Criteria
   Працює pagination (next/prev)
   Деталі відкриваються і показують дані
   Є prefetch на hover
   Є loading/error states
   Нема зайвих запитів, коли details не потрібно (skip)
5) Що здати
   Repo + README (як запустити, що зроблено: list/details/prefetch/skip)