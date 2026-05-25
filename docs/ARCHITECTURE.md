# Архитектура проекта «Делай»

## Обзор

«Делай» — мультиплатформенный планировщик задач (web, mobile, desktop).
Проект построен на единой кодовой базе с использованием монорепозитория.

## Технологический стек

| Компонент | Технология |
|---|---|
| Монорепозиторий | Turborepo + pnpm workspaces |
| Язык | TypeScript 5.8+ |
| Веб | Next.js 15 + Tamagui |
| Мобильные | React Native (Expo в будущем) |
| Десктоп | Electron (заготовка) |
| API | tRPC v11 (end-to-end типы) |
| БД | PostgreSQL 16 + Drizzle ORM |
| Кеш | Redis 7 |
| Локальная БД | WatermelonDB (mobile) / IndexedDB (web) |
| Стейт-менеджмент | TanStack Query (сервер) + Zustand (UI) |
| Валидация | Zod |
| CI | GitHub Actions |

## Структура монорепозитория

```
delay/
├── apps/
│   ├── web/              # Next.js (веб-клиент)
│   ├── mobile/           # React Native (мобильный) — заготовка
│   └── desktop/          # Electron (десктоп) — заготовка
├── packages/
│   ├── core/             # FSD-архитектура: entities, features, shared
│   ├── api/              # tRPC сервер + роутеры
│   ├── db/               # Drizzle ORM схемы + миграции
│   ├── ui/               # Tamagui дизайн-система
│   └── config/           # Общие конфиги (eslint, tsconfig)
├── docker/
│   └── docker-compose.yml # PostgreSQL + Redis
├── docs/                 # Документация
└── .github/workflows/    # CI
```

## Feature-Sliced Design (FSD)

В `packages/core/` применяется FSD:

```
core/src/
├── entities/         # Бизнес-сущности
│   ├── task/         # Задача (model, schema, index)
│   └── list/         # Список задач
├── features/         # Пользовательские сценарии
│   ├── create-task/  # Создание задачи (use-case)
│   └── sync/         # Синхронизация (engine, conflict resolver)
└── shared/           # Переиспользуемое
    ├── api/          # Клиент API
    ├── lib/          # Утилиты (date-fns, nanoid, helpers)
    └── types/        # Общие типы
```

### Сущность Task

- `TaskStatus`: backlog, todo, in_progress, done, cancelled
- `TaskPriority`: 0 (None) — 4 (Urgent)
- Поля: id, title, description, status, priority, listId, parentId, sortOrder, dueDate, timestamps, syncStatus

### Сущность List

- Поля: id, title, description, icon, color, projectId, sortOrder, timestamps, syncStatus

## Database schema (PostgreSQL)

### Таблица tasks
- `id` (text, PK)
- `title` (text, NOT NULL)
- `description` (text, nullable)
- `status` (enum: backlog|todo|in_progress|done|cancelled)
- `priority` (enum: 0-4)
- `list_id` (text, FK → lists.id)
- `parent_id` (text, self-FK)
- `sort_order` (integer)
- `due_date` (timestamptz)
- `completed_at` (timestamptz)
- `created_at`, `updated_at` (timestamptz)
- `deleted_at` (timestamptz, soft delete)
- `sync_status` (enum: synced|pending|conflict)
- `user_id` (text, NOT NULL)
- Индексы: user_id, list_id, due_date, status, parent_id

### Таблица lists
- Аналогичная структура с полями title, description, icon, color, project_id, sort_order, timestamps, sync_status, user_id
- Индексы: user_id, project_id

## API (tRPC)

Все роутеры доступны через `/api/trpc`:

### Tasks
- `tasks.getAll` — получить задачи (фильтр по listId, status; пагинация limit/offset)
- `tasks.getById` — получить задачу по ID
- `tasks.create` — создать задачу (использует createTaskUseCase из core)
- `tasks.update` — обновить задачу
- `tasks.delete` — мягкое удаление (sets deletedAt)

Контекст: `{ db, userId }`. Защищённые процедуры проверяют `userId`.

## Офлайн-синхронизация

Архитектура offline-first:

1. Мутация пишется в локальную БД (мгновенный UI)
2. Ставится в Sync Queue (SyncEngine)
3. При появлении сети: push изменений на сервер
4. Pull изменений с сервера
5. Конфликты разрешаются через LastWriteWinsResolver

## Docker Compose

- PostgreSQL 16 (порт 5432, user: delay, password: delay_dev, db: delay)
- Redis 7 (порт 6379)

## CI/CD

GitHub Actions workflow:
- Lint (eslint)
- Typecheck (tsc)
- Test (pnpm --filter @delay/core test)

## Как запустить локально

```bash
# 1. Запустить инфраструктуру
docker compose -f docker/docker-compose.yml up -d

# 2. Установить зависимости
pnpm install

# 3. Накатить миграции БД
pnpm db:migrate

# 4. Запустить веб-приложение
pnpm --filter @delay/web dev
```

## Соглашения

- Коммиты на русском языке
- Обязателен typecheck и lint перед коммитом
- Новые фичи — через FSD (entities/features/shared)
- Все изменения документируются в docs/
