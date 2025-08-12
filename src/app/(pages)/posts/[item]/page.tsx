import type { FC } from 'react';

import { isNil } from 'lodash';
import { notFound } from 'next/navigation';

import { Tools } from '@/app/_components/home/tool';
import { cn } from '@/app/_components/shadcn/utils';
import { queryPostItem } from '@/app/actions/post';

import $styles from './page.module.css';

const PostItemPage: FC<{ params: Promise<{ item: string }> }> = async ({ params }) => {
    const { item } = await params;
    const post = await queryPostItem(item);
    if (isNil(post)) return notFound();
    return (
        <div className="page-item">
            <Tools className="page-container" back />
            <div className={cn('page-container', $styles.item)}>
                <div className={$styles.item}>id: {item}</div>
            </div>
        </div>
    );
};
export default PostItemPage;
