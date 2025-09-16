# Bun Shop Next.js demo

This project showcases a Bun Shop storefront and admin dashboard built with Next.js API routes. It includes:

- Client-side pages for browsing products, categories, and marketing content.
- Authentication forms that call dedicated `/api/auth/register` and `/api/auth/login` routes backed by MongoDB.
- Generic CRUD API endpoints under `/api/[resource]` for managing products, orders, users, promotions, and coupons.

## Getting started

```bash
npm install
npm run dev
```

Set `MONGODB_URI` in your environment before running the development server so API routes can connect to your database.

## Available scripts

- `npm run dev` – start the Next.js development server.
- `npm run build` – create an optimized production build.
- `npm run start` – run the production build.
- `npm run lint` – run Next.js linting (requires project dependencies).

## Project structure

```
src/
  components/         # Reusable UI building blocks
  context/            # Authentication context shared across pages
  lib/                # Database helpers, password utilities, and Mongoose models
  pages/              # Next.js pages and API routes
    api/              # REST endpoints, including auth and resource CRUD
    ...               # Front-end routes (home, login, register, admin, etc.)
```
