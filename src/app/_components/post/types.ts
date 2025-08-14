import type { Post, Prisma } from '@prisma/client';
import type { BaseSyntheticEvent } from 'react';

export interface PostCreateFormProps {
    type: 'create';
}

export interface PostUpdateFormProps {
    type: 'update';
    item: Post;
}

export type PostCreateData = Prisma.PostCreateInput;

export type PostUpdateData = Partial<Omit<Post, 'id'>> & { id: string };

export type PostActionFormProps = (PostCreateFormProps | PostUpdateFormProps) & {
    /**
     * 在文章正在创建时执行一些动画
     * @param value
     */
    setPedding: (value: boolean) => void;
};

export type PostFormData = PostCreateData | PostUpdateData;

export interface PostActionFormRef {
    save?: (e: BaseSyntheticEvent) => Promise<void>;
}
