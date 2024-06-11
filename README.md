# Project

for demo purpose: no register, login, jwt signing and verify at the moment.  
Instead, user id will be passed into the bearer token header and extracted to express req.user.

## Setup

this project use pnpm, so install the project with

```bash
pnpm install
cp .env.example .env
```

## migration

test migration without creating migration files by pushing the schema changes directly.  
see: <https://andriisherman.medium.com/migrations-with-drizzle-just-got-better-push-to-sqlite-is-here-c6c045c5d0fb>

```bash
pnpm drizzle-kit push
```

create migration SQLs

```bash
pnpm drizzle-kit generate --name "$(date +%s)\_create_user.sql"
```

start migration

```bash
pnpm ts-node migrate.ts
```

## Start Server

```bash
npm run build:release && npm run start
```

## Deployment

build container

```bash
docker build -t chat-api-server-express .
```

run standalone container

```bash
# default port set to 3200
docker run -d -p 3000:3200 --name chat-api-server-express chat-api-server-express
# run with env file with port set to 3000
docker run -d --env-file=".env" -p 3000:3000 --name chat-api-server-express chat-api-server-express
```

run with infra and network (with postgres and redis)

```bash
cp redis.conf.example redis.conf
docker compose up -d --build
```

## Todo

- consider switching to fastify
- consider using trpc
