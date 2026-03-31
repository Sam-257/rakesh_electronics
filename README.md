# Rakesh Electronics — Website

A modern, responsive website for **Rakesh Electronics**, a retail electronics shop specialising in spare parts and components. Built with React + Vite, featuring a built-in CMS admin panel for content management and a theme editor.

## Tech Stack

- **React 18** (TypeScript, Vite 5, fast HMR)
- **React Router v7** — client-side routing
- **TanStack React Query** — data fetching, caching, and Suspense integration
- **CSS Modules** — scoped, maintainable styling
- **react-icons** — icon library (Bootstrap Icons + Heroicons)
- **Express API + SQLite** — lightweight backend with persistent storage
- **SSG** — static site generation for client pages, SPA for admin
- **Built-in CMS** — admin panel with password protection and theme editor

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Install & Run

```bash
# Install dependencies
npm install

# Start both the API server and Vite dev server
npm run dev
```

This starts two processes concurrently:
- **API server** on `http://localhost:3001` (stores CMS content in SQLite at `server/data/cms.db`)
- **Vite dev server** on `http://localhost:5173` (proxies `/api` requests to the API server)

You can also run them separately:

```bash
npm run dev:server   # API only
npm run dev:client   # Vite only
```

### Build for Production

```bash
npm run build        # Build client, SSR bundle, and pre-render static pages
npm run start        # Serve the built frontend + API server together
```

The build pipeline:
1. `build:client` — Vite client bundle → `dist/client/`
2. `build:server` — Vite SSR bundle → `dist/server/`
3. `prerender` — generates static HTML for client routes (`/`, `/products`, `/about`, `/contact`)

Admin routes (`/admin/*`) are not pre-rendered — they run as a standard SPA.

### Lint

```bash
npm run lint
```

## Project Structure

```
server/
  index.js            Express API server (content + auth endpoints)
  db.js               SQLite database setup, schema, and data helpers
  data/
    defaults.js       Default/seed content for all sections
    cms.db            SQLite database (gitignored, auto-created)
  routes/
    content.js        Content CRUD endpoints
    auth.js           Authentication endpoints
src/
  components/         Shared UI components (Navbar, Footer, Layout, Hero, Loader, etc.)
  pages/              Page-level components
    Home/             Landing page (Hero + Categories + Highlights + Testimonials + Store Location)
    Products/         Product catalog with category filter
    About/            Store story and values
    Contact/          Contact form + store info
    Admin/            CMS admin panel (password-protected)
  data/
    defaults.ts       Typed default content (used for SSG pre-rendering)
  services/
    contentService.ts Data layer — getContent/setContent via API calls
  hooks/
    useContent.ts     React Query hook (useSuspenseQuery) for reading CMS content
    useTheme.ts       Fetches theme config and applies CSS custom properties
  utils/
    iconMap.tsx        String-to-icon component lookup (icons stored as strings in CMS data)
  types/
    content.ts        TypeScript interfaces for all content types
  styles/
    global.css        CSS reset, custom properties, utility classes
scripts/
  prerender.js        SSG build step — renders client routes to static HTML
```

## Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Landing page with hero, categories, highlights, testimonials, store location |
| `/products` | Products | Filterable product catalog |
| `/about` | About | Store story and company values |
| `/contact` | Contact | Contact form and store information |
| `/admin` | Admin | CMS panel (not linked in navigation — access directly) |

## Using the CMS Admin Panel

1. Navigate to `/admin` in your browser
2. Log in with the default password: **password**
3. Use the sidebar to switch between content sections:
   - **Hero Section** — headline text, subtitle, button labels
   - **Store Info** — shop name, address, phone, email, working hours (used across Footer, Contact, and Store Location)
   - **About — Story** — the "Our Story" section title and paragraphs
   - **About — Values** — the "Our Values" cards (icon, title, description)
   - **Categories** — homepage category cards (icon, label, accent colour)
   - **Why Choose Us** — homepage highlights (icon, title, description)
   - **Testimonials** — customer reviews (name, role, quote)
   - **Products** — full product catalog (name, description, category, price)
   - **Theme** — color pickers for primary, secondary, accent, text, background, gradients, and footer colors
4. Edit fields as needed, then click **Save Changes**
5. Changes take effect immediately on the live site (refresh the page to see updates)
6. Use **Reset to Defaults** to revert a section to its original content
7. To change the admin password, click **Change Password** in the sidebar

> **Note:** Content is stored in a SQLite database at `server/data/cms.db`. This data persists across browsers and devices — any change made in the admin panel is visible everywhere. To reset everything, delete the database file; it will be recreated with defaults on the next server start.

## How Data Flows

1. All components use the `useContent(key)` hook to read content
2. The hook uses `useSuspenseQuery` from TanStack React Query with caching
3. React Query calls `getContent(key)` from `contentService.ts`
4. `contentService.ts` makes a `GET /api/content/:key` fetch call
5. The Express server reads from SQLite and returns the data
6. A `<Suspense>` boundary in the Layout shows a loading spinner until data is ready
7. Once cached, subsequent navigations are instant (no re-fetch unless stale)

Theme colors are handled separately via `useTheme()` which applies CSS custom properties to `:root`.

Admin saves go through `PUT /api/content/:key`, which writes to SQLite and updates the React Query cache.

## License

Private — not for redistribution.
