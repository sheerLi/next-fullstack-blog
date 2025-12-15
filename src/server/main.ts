import { createHonoApp } from './common/app';
import { postApi } from './post/api';

const app = createHonoApp().basePath('/api');

app.get('/', (c) => c.text('blog api'));
app.notFound((c) => c.json({ message: 'Not Found', success: false }, 404));

const routes = app.route('/posts', postApi);

type AppType = typeof routes;

export { app, type AppType };
