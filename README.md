# Делай — Task Planner

Мультиплатформенный планировщик задач (Web, iOS, Android, Desktop).

## Быстрый старт

```bash
pnpm install
docker compose -f docker/docker-compose.yml up -d
pnpm db:migrate
pnpm --filter @delay/web dev
```

## Структура проекта

| Директория | Назначение |
|---|---|
| `apps/web/` | Веб-клиент (Next.js) |
| `apps/mobile/` | Мобильный клиент (React Native) |
| `apps/desktop/` | Десктоп клиент (Electron) |
| `packages/core/` | Бизнес-логика (FSD) |
| `packages/api/` | tRPC API |
| `packages/db/` | Drizzle ORM схемы |
| `packages/ui/` | Дизайн-система (Tamagui) |
| `docs/` | Документация |

Подробнее: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
