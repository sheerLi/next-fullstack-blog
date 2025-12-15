import type { Post } from '@prisma/client';
import type { BaseSyntheticEvent } from 'react';

import type { PostCreateOrUpdateData, PostItem } from '@/server/post/type';

export interface PostCreateFormProps {
    type: 'create';
}

export interface PostUpdateFormProps {
    type: 'update';
    item: PostItem;
}

export type PostUpdateData = Partial<Omit<Post, 'id'>> & { id: string };

export type PostActionFormProps = (PostCreateFormProps | PostUpdateFormProps) & {
    /**
     * 在文章正在创建时执行一些动画
     * @param value
     */
    setPedding: (value: boolean) => void;
};

export type PostFormData = Omit<PostCreateOrUpdateData, 'id'>;

export interface PostActionFormRef {
    save?: (e: BaseSyntheticEvent) => Promise<void>;
}
