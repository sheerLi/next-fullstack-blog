import type { Post, Prisma } from '@prisma/client';
import type { BaseSyntheticEvent } from 'react';
import type { z } from 'zod';

import type { generatePostFormValidator } from './form-validator';

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

export type PostFormData = z.infer<ReturnType<typeof generatePostFormValidator>>;

export interface PostActionFormRef {
    save?: (e: BaseSyntheticEvent) => Promise<void>;
}
