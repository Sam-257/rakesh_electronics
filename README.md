# Rakesh Electronics — Website

A modern, responsive website for **Rakesh Electronics**, a retail electronics shop specialising in spare parts and components. Built with React + Vite, featuring a built-in CMS admin panel for non-technical content editing.

## Tech Stack

- **React 18** (Vite 5, fast HMR)
- **React Router v7** — client-side routing
- **CSS Modules** — scoped, maintainable styling
- **react-icons** — icon library (Bootstrap Icons + Heroicons)
- **Express API** — lightweight backend that stores CMS content as local JSON files
- **Built-in CMS** — admin panel with file-based persistence, works across all browsers/devices

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
- **API server** on `http://localhost:3001` (stores CMS content to `server/data/`)
- **Vite dev server** on `http://localhost:5173` (proxies `/api` requests to the API server)

You can also run them separately:

```bash
npm run dev:server   # API only
npm run dev:client   # Vite only
```

### Build for Production

```bash
npm run build        # Build the frontend
npm run start        # Serve the built frontend + API server together
```

### Lint

```bash
npm run lint
```

## Project Structure

```
server/
  index.js            Express API server (content + auth endpoints)
  data/               Auto-created directory for CMS content (gitignored)
    content.json      All CMS content (written by the API)
    auth.json         Admin password (written by the API)
src/
  components/         Shared UI components (Navbar, Footer, Layout, Hero, etc.)
  pages/              Page-level components
    Home/             Landing page (Hero + Categories + Highlights + Testimonials + Store Location)
    Products/         Product catalog with category filter
    About/            Store story and values
    Contact/          Contact form + store info
    Admin/            CMS admin panel (password-protected)
  data/
    defaults.js       Default/seed content for all sections
  services/
    contentService.js Data layer — getContent/setContent via API calls
  hooks/
    useContent.js     React hook for reading CMS content in components
  utils/
    iconMap.jsx       String-to-icon component lookup (icons stored as strings in CMS data)
  styles/
    global.css        CSS reset, custom properties, utility classes
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
2. Log in with the default password: **admin**
3. Use the sidebar to switch between content sections:
   - **Hero Section** — headline text, subtitle, button labels
   - **Store Info** — shop name, address, phone, email, working hours (used across Footer, Contact, and Store Location)
   - **About — Story** — the "Our Story" section title and paragraphs
   - **About — Values** — the "Our Values" cards (icon, title, description)
   - **Categories** — homepage category cards (icon, label, accent colour)
   - **Why Choose Us** — homepage highlights (icon, title, description)
   - **Testimonials** — customer reviews (name, role, quote)
   - **Products** — full product catalog (name, description, category, price)
4. Edit fields as needed, then click **Save Changes**
5. Changes take effect immediately on the live site (refresh the page to see updates)
6. Use **Reset to Defaults** to revert a section to its original content
7. To change the admin password, click **Change Password** in the sidebar

> **Note:** Content is stored as JSON files in `server/data/`. This data persists across browsers and devices — any change made in the admin panel is visible everywhere. To reset everything, delete the `server/data/` folder.

## How Data Flows

1. All components use the `useContent(key)` hook to read content
2. The hook calls `getContent(key)` from `contentService.js`
3. `contentService.js` makes a `GET /api/content/:key` fetch call
4. The Express server reads from `server/data/content.json` and returns the value
5. If no override exists, the frontend falls back to defaults from `src/data/defaults.js`

Admin saves go through `PUT /api/content/:key`, which writes to the same JSON file.

## Migrating to Firebase (Future)

To switch from file-based storage to Firebase:

1. Install Firebase: `npm install firebase`
2. Create `src/services/firebase.js` with your Firebase config
3. Replace the 3 async functions in `src/services/contentService.js`:
   - `getContent(key)` → `getDoc(doc(db, 'content', key))`
   - `setContent(key, value)` → `setDoc(doc(db, 'content', key), { value })`
   - `resetContent(key)` → `deleteDoc(doc(db, 'content', key))`
4. Replace `/api/auth/*` calls in `Admin.jsx` with Firebase Auth
5. Remove the `server/` directory — no longer needed

No component changes are needed — the `useContent` hook and async interface remain the same.

## License

Private — not for redistribution.
