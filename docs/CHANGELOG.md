# Changelog

## [0.0.1] — 2026-05-25

### Добавлено

#### Монорепозиторий
- Turborepo + pnpm workspaces
- TypeScript 5.8+ с конфигами для web (nextjs) и mobile (react-native)
- ESLint с typescript-eslint и prettier
- .gitignore, .prettierrc, .env.example

#### packages/core (FSD-архитектура)
- **entities/task**: модель задачи (TaskStatus, TaskPriority), Zod-схемы (createTaskSchema, updateTaskSchema)
- **entities/list**: модель списка задач, Zod-схемы
- **features/create-task**: createTaskUseCase — чистый use-case для создания задачи
- **features/sync**: SyncEngine (push/pull), LastWriteWinsResolver для разрешения конфликтов
- **shared/lib**: утилиты (date-fns helpers, generateId, clampSortOrder)
- **shared/types**: общие типы (SyncQueueItem, PaginationParams, ViewMode, TaskGroup)

#### packages/db (Drizzle ORM)
- Схема таблицы `tasks` с enum-ами (task_status, task_priority, sync_status) и индексами
- Схема таблицы `lists` с индексами
- Клиент PostgreSQL (postgres.js + drizzle-orm)
- drizzle-kit конфиг для миграций

#### packages/api (tRPC)
- Сервер с initTRPC, superjson, форматтер ошибок Zod
- Контекст: `{ db, userId }`
- Процедуры: publicProcedure, protectedProcedure (проверка userId)
- Роутер задач: getAll (фильтрация + пагинация), getById, create (use-case), update (частичное), delete (soft)

#### apps/web (Next.js)
- App Router с RootLayout
- TRPCProvider (QueryClient + httpBatchLink)
- API route handler для tRPC (/api/trpc/[trpc])

#### Docker
- docker-compose.yml: PostgreSQL 16 + Redis 7

#### CI
- GitHub Actions workflow: lint + typecheck + test

### Изменено
- Переименование проекта: `delai` → `delay` (все файлы, папки, скрипты, Docker)
- Перемещение проекта: `C:\Users\Kurban\delai` → `E:\delay`

### Технические решения
- Offline-first архитектура: все мутации проходят через локальную очередь синхронизации
- Soft-delete для задач и списков (поле deletedAt)
- Версионирование через timestamps для разрешения конфликтов
- end-to-end типизация через tRPC + Zod
