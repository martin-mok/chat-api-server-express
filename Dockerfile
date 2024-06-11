FROM node:18.17.0-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS dep
WORKDIR /app
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN pnpm i -P

FROM base AS builder
WORKDIR /app
COPY --from=dep /app/node_modules /app/node_modules
COPY . ./
# build js and remove devDependencies from node_modules
RUN pnpm run build && pnpm prune --prod


FROM node:18.17.0-alpine AS runner
WORKDIR /app
COPY --from=builder /app/build /app/build
COPY --from=builder /app/node_modules /app/node_modules
ENTRYPOINT [ "node" ]
CMD [ "build/src/main.js" ]