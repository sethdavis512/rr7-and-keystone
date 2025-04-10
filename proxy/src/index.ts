import { Hono } from 'hono';
// import { proxy } from 'hono/proxy';
import { html } from 'hono/html';
// import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';

const app = new Hono();

const view = html`
    <html>
        <body>
            <h1>Hono Proxy 🤓</h1>
        </body>
    </html>
`;

// app.use('/api/*', cors());

app.get('/', (c) => c.html(view));

app.all('/api/:path', (c) => {
    console.log('===== LOG =====', c.req.param('path'));
    return c.json({ success: true });
    // return proxy(
    //     `${process.env.KEYSTONE_INTERNAL_URL}/api/${c.req.param('path')}`,
    //     {
    //         method: 'POST'
    //         // headers: {
    //         //     ...c.req.header()
    //         // }
    //     }
    // );
});

serve(app);

export default app;
