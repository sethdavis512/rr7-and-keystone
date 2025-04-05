import { Hono } from 'hono';
import { proxy } from 'hono/proxy';
import { html } from 'hono/html';
import { serve } from '@hono/node-server';

const app = new Hono();

const view = html`
    <html>
        <body>
            <h1>Hono Proxy 🤓</h1>
        </body>
    </html>
`;

app.get('/', (c) => c.html(view));

// Use the proxy helper to forward requests matching /api/*
// The baseUrl is taken from the environment variable KEYSTONE_INTERNAL_URL.
// For example, KEYSTONE_INTERNAL_URL could be "http://<PROJECT_NAME>.railway.internal"
app.all('/api/*', () => {
    console.log('===== PROXY =====', process.env.KEYSTONE_INTERNAL_URL);
    return proxy(process.env.KEYSTONE_INTERNAL_URL!);
});

serve({
    fetch: app.fetch,
    port: 8787
});

export default app;
