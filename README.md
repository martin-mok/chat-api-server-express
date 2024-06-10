# Project

for demo purpose: no register, login, jwt signing and verify at the moment.  
Instead, user id will be passed into the bearer token header and extracted to express req.user.

## Setup

this project use pnpm, so install the project with

```bash
pnpm install
cp .env.example .env
#Start Server
npm run build:release && npm run start
```
