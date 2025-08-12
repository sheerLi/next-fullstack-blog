import type { FC } from 'react';

import { isNil } from 'lodash';
import { notFound } from 'next/navigation';

import { PageModal } from '@/app/_components/modal/page-modal';

const PostEditPage: FC<{ params: Promise<{ item: string }> }> = async ({ params }) => {
    const { item } = await params;
    if (isNil(item)) return notFound();

    return (
        <PageModal title="编辑文章" match={['/post-edit/*']} className="min-w-full lg:min-w-[60%]">
            编辑
        </PageModal>
    );
};

export default PostEditPage;
