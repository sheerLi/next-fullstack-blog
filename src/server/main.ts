import { swaggerUI } from '@hono/swagger-ui';
import { Scalar } from '@scalar/hono-api-reference';
import { openAPIRouteHandler } from 'hono-openapi';

import { createHonoApp } from './common/app';
import { postApi } from './post/routes';

const app = createHonoApp().basePath('/api');

app.get('/', (c) => c.text('blog api'));
app.notFound((c) => c.json({ message: 'Not Found', success: false }, 404));

const routes = app.route('/posts', postApi);

app.get(
    '/data',
    openAPIRouteHandler(app, {
        documentation: {
            info: {
                version: 'v1',
                title: 'blog API',
                description: 'blog API',
            },
        },
    }),
);

app.get('/swagger', swaggerUI({ url: '/api/data' }));

app.get(
    '/docs',
    Scalar({
        theme: 'saturn',
        url: '/api/data',
    }),
);

type AppType = typeof routes;

export { app, type AppType };
