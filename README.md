# Bagh-One Restaurant

A React + Vite restaurant website with an Express API, PostgreSQL persistence through Prisma, and a protected administration dashboard.

## Requirements

- Node.js 20 or newer
- PostgreSQL

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a PostgreSQL database for Bagh-One.

3. Copy `.env.example` to `.env` and configure every required value:

   ```env
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE
   JWT_SECRET=use-a-long-random-secret
   ADMIN_EMAIL=your-admin-email
   ADMIN_PASSWORD=use-a-strong-password-with-at-least-12-characters
   ADMIN_NAME=Bagh-One Administrator
   CLIENT_URL=http://localhost:5173
   PORT=5000
   VITE_API_URL=http://localhost:5000
   ```

   Never commit `.env`. For separate production frontend/backend domains, HTTPS is required for the cross-site secure authentication cookie. Set `CLIENT_URL` to the exact frontend origin; multiple origins may be comma-separated.

4. Generate the Prisma client:

   ```bash
   npm run prisma:generate
   ```

5. Create and apply the initial migration:

   ```bash
   npm run prisma:migrate -- --name init
   ```

6. Seed the admin account from the environment values:

   ```bash
   npm run prisma:seed
   ```

## Local development

Start the backend in one terminal:

```bash
npm run server:dev
```

Start Vite in another terminal:

```bash
npm run dev
```

- Website: `http://localhost:5173`
- API health check: `http://localhost:5000/api/health`
- Admin login: `http://localhost:5173/admin/login`

The booking date is persisted as PostgreSQL `DATE`. The API accepts `YYYY-MM-DD` and constructs it at noon UTC before Prisma persistence so date serialization cannot shift it to the previous day.

## Vercel deployment

This project now supports deploying the React frontend and Express API together on Vercel.

1. Create a PostgreSQL database (Neon, Supabase, Railway, or another PostgreSQL provider).
2. Import the project into Vercel from GitHub.
3. Add these Vercel Environment Variables for **Production**:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD` (at least 12 characters)
   - `ADMIN_NAME`
   - `CLIENT_URL` = your production website origin, for example `https://your-domain.com`
4. Deploy. The build command generates Prisma Client automatically.
5. Run the Prisma migration once from a machine with the production `DATABASE_URL`:
   `npm run prisma:migrate -- --name init`
6. Seed the admin account once:
   `npm run prisma:seed`
7. Open `https://your-domain.com/admin/login`.

The frontend uses same-origin `/api` requests in production, while the Vercel catch-all function serves the Express API.

## Production checks

```bash
npm run lint
npm run build
```

Run database migrations in the deployment environment before starting the API. Keep `JWT_SECRET`, database credentials, and seed credentials in the hosting provider’s secret manager.

## API overview

Public:

- `GET /api/health`
- `POST /api/bookings`
- `POST /api/contact`

Authentication:

- `POST /api/admin/auth/login`
- `GET /api/admin/auth/me`
- `POST /api/admin/auth/logout`

Protected administration:

- `GET /api/admin/dashboard`
- `GET /api/admin/bookings`
- `GET /api/admin/bookings/:id`
- `PATCH /api/admin/bookings/:id/status`
- `DELETE /api/admin/bookings/:id`
- `GET /api/admin/enquiries`
- `GET /api/admin/enquiries/:id`
- `PATCH /api/admin/enquiries/:id/status`
- `DELETE /api/admin/enquiries/:id`
