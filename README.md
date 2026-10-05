# Aditya Rana — Portfolio Website

A fully dynamic portfolio website with an admin dashboard. Every section of the public site is managed from the admin panel — no code changes are needed to update content.

**Stack:** React 19 + Vite + Tailwind CSS 4 (frontend) · Node.js + Express 5 + MongoDB (backend) · Cloudinary (images and PDF resume)

## Project structure

```
Backend/    REST API (Express, MongoDB, JWT auth, Cloudinary uploads)
Frontend/   Public website + admin dashboard (React, Vite)
```

## 1. Backend setup

```bash
cd Backend
npm install
cp .env.example .env      # then fill in the values below
npm run seed              # creates the admin account (run once)
npm run dev               # http://localhost:5000
```

| Variable | Description |
| --- | --- |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Long random string used to sign login tokens |
| `JWT_EXPIRES_IN` | Token lifetime, e.g. `7d` |
| `CLIENT_URL` | Frontend URL (local: `http://localhost:5173`). Several URLs can be separated with commas |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Credentials for the first admin account (used by `npm run seed`) |
| `CLOUDINARY_*` | Cloudinary cloud name, API key and API secret |

## 2. Frontend setup

```bash
cd Frontend
npm install
cp .env.example .env      # VITE_API_URL=http://localhost:5000/api
npm run dev               # http://localhost:5173
npm run build             # production build in Frontend/dist
```

## 3. Using the admin panel

Open **`/admin/login`** and sign in with the seeded credentials.

1. **Profile** — name, photo, roles, bio, contact details, social links and PDF resume.
2. **Education, Skills, Experience, Projects, Publications, Certificates, Achievements, Gallery, Blogs** — add, edit, delete, reorder (arrow buttons) and publish/unpublish (eye icon) any item.
3. **Messages** — messages sent through the contact form; reply by email, mark as read or delete.
4. **Settings** — website title, SEO description and keywords, footer text, default theme, section on/off switches and password change.

A section appears on the website only when it is switched on in Settings **and** contains at least one published item.

## 4. Deployment

* **Backend** (Render / Railway / any Node host): root directory `Backend`, build command `npm install`, start command `npm start`. Add all environment variables from the table above and set `CLIENT_URL` to the live frontend URL.
* **Frontend** (Vercel / Netlify): root directory `Frontend`, build command `npm run build`, output directory `dist`. Set `VITE_API_URL` to `https://<your-backend-domain>/api`. Single-page-app rewrites are already included (`vercel.json`, `public/_redirects`).

## Features

* Mobile-first, fully responsive layout (phones, tablets, laptops, large screens)
* Light and dark mode with a theme switch
* Accessible: keyboard navigation, visible focus states, skip link, reduced-motion support
* Rate-limited contact form and admin login, Helmet security headers, validated inputs
* Blog with SEO-friendly URLs (`/blog/<slug>`) and sanitized content