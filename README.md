# SkillForge — Freelance Marketplace (Client)

A modern full-stack freelance marketplace where clients post jobs and verified
freelancers accept and deliver them. Built with **React + Vite + Tailwind v4**,
authenticated with **Firebase**, and powered by an **Express + MongoDB** API.

- **Live site:** https://skillforge-marketplace.netlify.app
- **API:** https://skillforge-api.vercel.app
- **Server repo:** ../freelancer-marketplace-server

## Highlights

- Full CRUD for jobs (add, view, update, delete) with TanStack Query caching and
  optimistic UI updates on the dashboard.
- Firebase email/password and Google auth, protected routes, persistent session
  across refresh (no redirect-loop on private pages).
- Accept jobs posted by other users, manage them in **My Accepted Tasks**, and
  mark tasks **Done** or **Cancel** with instant UI feedback.
- Dark / light theme toggle, responsive layout for mobile / tablet / desktop,
  and framer-motion micro-interactions throughout.
- Toast-based notifications (react-toastify) — no `alert()`, no Lorem text,
  environment variables for every secret (Firebase + API URL).

## Tech stack

- React 19, react-router 7, Vite 8
- Tailwind CSS 4 + daisyUI 5
- Firebase Authentication
- TanStack Query 5 + Axios
- Framer Motion, Lucide React, react-toastify

## Getting started

```bash
# 1. Install
npm install

# 2. Configure env
cp .env.example .env
# fill VITE_API_URL + VITE_FIREBASE_* keys

# 3. Run
npm run dev
```

The app expects the API (see `../freelancer-marketplace-server`) to be reachable
at `VITE_API_URL`.

## Environment variables

```
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

## Routes

| Path                    | Access  | Purpose                          |
| ----------------------- | ------- | -------------------------------- |
| `/`                     | public  | Home (banner, latest, about)     |
| `/allJobs`              | public  | All jobs, filter & sort          |
| `/allJobs/:id`          | private | Job details + accept             |
| `/addJob`               | private | Post a new job                   |
| `/myAddedJobs`          | private | Manage own jobs                  |
| `/updateJob/:id`        | private | Edit a posted job                |
| `/deleteJob/:id`        | private | Confirm deletion                 |
| `/my-accepted-tasks`    | private | Track accepted tasks             |
| `/login`, `/register`   | public  | Authentication                   |
| `*`                     | public  | Custom 404                       |

## Deploy notes

- `public/_redirects` and `netlify.toml` ship SPA rewrites for Netlify.
- `vercel.json` ships SPA rewrites for Vercel.
- Add your deployment domain (Netlify / Vercel preview) to the Firebase Auth
  authorized domains list so popup sign-in works in production.
