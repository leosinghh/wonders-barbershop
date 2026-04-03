# Wonders Barbershop – Full Stack Website Starter

A full-stack starter for a premium barbershop website with:
- React + Vite frontend
- Express backend
- Prisma ORM
- SQLite database
- Booking form and API
- Simple admin bookings endpoint
- Services showcase, hero section, hours, and contact section

## Project Structure

- `client/` – React frontend
- `server/` – Express API + Prisma + SQLite

## Quick Start

### 1) Install dependencies

In one terminal:
```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

In another terminal:
```bash
cd client
npm install
npm run dev
```

### 2) Open the app
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

## API Endpoints

- `GET /api/health`
- `GET /api/services`
- `GET /api/bookings`
- `POST /api/bookings`

## Notes

- The database is SQLite for easy setup. You can switch to PostgreSQL later by updating `prisma/schema.prisma` and `.env`.
- CORS is enabled for local frontend development.
- For production, deploy:
  - Frontend to Vercel or Netlify
  - Backend to Render / Railway / Fly.io
  - Database to PostgreSQL (Neon / Supabase / Railway / Render)

## Booking Payload Example

```json
{
  "name": "Leo Singh",
  "email": "leo@example.com",
  "phone": "6175551234",
  "serviceId": 1,
  "date": "2026-04-10",
  "time": "14:00",
  "notes": "Skin fade and lineup"
}
```
