import { Hono } from 'hono';
import { isNil } from 'lodash';

import { createErrorResult } from '../common/error';
import {
    createPostItem,
    deletePostItem,
    queryPostItem,
    queryPostItemById,
    queryPostItemBySlug,
    queryPostPaginate,
    queryPostTotalPages,
    updatePostItem,
} from './service';

const app = new Hono();

export const postApi = app
    .get('/', async (c) => {
        try {
            const query = c.req.query();
            const options = Object.fromEntries(
                Object.entries(query).map(([k, v]) => [k, Number(v)]),
            );
            const result = await queryPostPaginate(options);
            return c.json(result, 200);
        } catch (error) {
            return c.json(createErrorResult('查询文章分页数据失败', error), 500);
        }
    })
    .get('/page-numbers', async (c) => {
        try {
            const query = c.req.query();
            const limit = query.limit ? Number(query.limit) : undefined;
            const result = await queryPostTotalPages(limit);
            return c.json({ result }, 200);
        } catch (error) {
            return c.json(createErrorResult('查询页面总数失败', error), 500);
        }
    })
    .get('/:item', async (c) => {
        try {
            const { item } = c.req.param();
            const result = await queryPostItem(item);
            if (!isNil(result)) return c.json(result, 200);
            return c.json(createErrorResult('文章不存在'), 404);
        } catch (error) {
            return c.json(createErrorResult('查询文章失败', error), 500);
        }
    })
    .get('/byid/:id', async (c) => {
        try {
            const { id } = c.req.param();
            const result = await queryPostItemById(id);
            if (!isNil(result)) return c.json(result, 200);
            return c.json(createErrorResult('文章不存在'), 404);
        } catch (error) {
            return c.json(createErrorResult('查询文章失败', error), 500);
        }
    })
    .get('/byslug/:slug', async (c) => {
        try {
            const { slug } = c.req.param();
            const result = await queryPostItemBySlug(slug);
            if (!isNil(result)) return c.json(result, 200);
            return c.json(createErrorResult('文章不存在'), 404);
        } catch (error) {
            return c.json(createErrorResult('查询文章失败', error), 500);
        }
    })
    .post('/', async (c) => {
        try {
            const body = await c.req.json();
            const result = await createPostItem(body);
            return c.json(result, 201);
        } catch (error) {
            return c.json(createErrorResult('创建文章失败', error), 500);
        }
    })
    .patch('/:id', async (c) => {
        try {
            const { id } = c.req.param();
            const body = await c.req.json();
            const result = await updatePostItem(id, body);
            return c.json(result, 200);
        } catch (error) {
            return c.json(createErrorResult('更新文章失败', error), 500);
        }
    })
    .delete('/:id', async (c) => {
        try {
            const { id } = c.req.param();
            const result = await deletePostItem(id);
            return c.json(result, 200);
        } catch (error) {
            return c.json(createErrorResult('删除文章失败', error), 500);
        }
    });
