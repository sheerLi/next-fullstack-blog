'use client';

import type { FC } from 'react';

import { cn } from '@/app/_components/shadcn/utils';

import { PostCreateButton } from '../post/create-button';
import { BackButton } from './back-button';
import $styles from './tools.module.css';

export const Tools: FC<{ back?: boolean; className?: string }> = ({ back, className }) => {
    return (
        <div className={cn($styles.tools, className)}>
            {back && <BackButton />}
            <PostCreateButton />
        </div>
    );
};
