import type { FC } from 'react';

import { fetchApi } from '@/libs/api';

import { SimplePaginate } from '../paginate/simple';

export const PostListPaginate: FC<{ limit: number; page: number }> = async ({ limit, page }) => {
    const result = await fetchApi(async (c) => {
        return c.api.posts['page-numbers'].$get({
            query: { limit: limit.toString() },
        });
    });
    if (!result.ok) return null;
    const { result: totalPages } = await result.json();
    return (
        <div className="mb-5 w-full flex-none">
            <SimplePaginate totalPages={totalPages} currentPage={page} />
        </div>
    );
};
