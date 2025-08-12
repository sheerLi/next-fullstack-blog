import type { BaseSyntheticEvent } from 'react';

import type { IPost } from '@/database/types';

export interface PostCreateFormProps {
    type: 'create';
    /**
     * 在文章正在创建时执行一些动画
     * @param value
     */
    setPedding: (value: boolean) => void;
}

export interface PostUpdateFormProps {
    type: 'update';
    item: IPost;
}

export type PostCreateData = Omit<IPost, 'id'>;

export type PostUpdateData = Partial<Omit<IPost, 'id'>> & { id: string };

export type PostActionFormProps = PostCreateFormProps | PostUpdateFormProps;

export type PostFormData = PostCreateData | PostUpdateData;

export interface PostCreateFormRef {
    create?: (e: BaseSyntheticEvent) => Promise<void>;
}
