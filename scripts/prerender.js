import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distClient = path.resolve(__dirname, '../dist/client');

const clientRoutes = ['/', '/products', '/about', '/contact'];

async function prerender() {
  const template = fs.readFileSync(path.resolve(distClient, 'index.html'), 'utf-8');
  const { render } = await import('../dist/server/entry-server.js');

  for (const route of clientRoutes) {
    const { html: appHtml } = render(route);
    const html = template.replace('<!--app-html-->', appHtml);

    const dir =
      route === '/'
        ? distClient
        : path.resolve(distClient, route.slice(1));

    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.resolve(dir, 'index.html'), html);
    console.log(`Pre-rendered: ${route}`);
  }
}

prerender();
