'use client';

import type { FC } from 'react';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

import { useUrlQuery } from '@/libs/url';

import { Button as CNButton } from '../shadcn/ui/button';
import { cn } from '../shadcn/utils';

export const Button: FC<{ iconBtn: boolean }> = ({ iconBtn = false }) => {
    const urlQuery = useUrlQuery();

    return (
        <CNButton
            asChild
            className={cn('ml-auto', {
                'focus-visible:!ring-0': !iconBtn,
                'rounded-sm': !iconBtn,
            })}
            variant="secondary"
            size={iconBtn ? 'icon' : 'default'}
        >
            <Link href={`/posts/create${urlQuery}`}>
                <Plus />
                {!iconBtn && '创建'}
            </Link>
        </CNButton>
    );
};

export const PostCreateButton: FC<{ iconBtn: boolean }> = ({ iconBtn = false }) => {
    return (
        <Suspense>
            <Button iconBtn={iconBtn} />
        </Suspense>
    );
};
