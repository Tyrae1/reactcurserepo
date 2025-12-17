Mini Pokédex на RTK Query + MUI

Запуск:
- завантажити з Git;
- запустити "npm run dev"


Зроблено:
1) API
   PokeAPI: https://pokeapi.co/api/v2
- GET /pokemon?limit=20&offset=0 — список
- GET /pokemon-species/{name-or-id} — опиc
- GET /pokemon/{name-or-id} — деталі


2) UI
   A. Список
   - Показує 20 покемонів (name + картинка sprite).
   - Next/Prev сторінки (через offset).
   - Loading / error / empty стани.
   B. Деталі
   - При кліку на покемона відкривається Details (можна окрема сторінка або drawer).
   - Показує: name, id, sprite, types, stats.
3) RTK Query
   - createApi + fetchBaseQuery
   - 2 endpoints:
   - getPokemonList({ limit, offset })
   - getPokemonByName(nameOrId)
   - Prefetch: на hover по елементу списку зробити prefetch деталей:
   - api.util.prefetch("getPokemonByName", name, { force: false })
   - Skip: якщо nameOrId пустий (або details не вибрані) — не робить запит (через skipToken або skip: true).
4) Acceptance Criteria
   - Працює pagination (next/prev)
   - Деталі відкриваються і показують дані
   - Є prefetch на hover
   - Є loading/error states
   - Нема зайвих запитів, коли details не потрібно (skip)