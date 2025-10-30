'use client';

import type { FC } from 'react';

import DocumentEdit24Regular from '@ricons/fluent/DocumentEdit24Regular';
import { isNil } from 'lodash';
import { UserPen } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useMemo } from 'react';

import { Button as CNButton } from '@/app/_components/shadcn/ui/button';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../shadcn/ui/tooltip';
import { cn } from '../shadcn/utils';

const Button: FC<{ id: string; iconBtn?: boolean }> = ({ id, iconBtn }) => {
    const searchParams = useSearchParams();
    const getUrlQuery = useMemo(() => {
        const query = new URLSearchParams(searchParams.toString()).toString();
        return isNil(query) || query.length < 1 ? '' : `?${query}`;
    }, [searchParams]);
    return (
        <CNButton
            asChild
            className={cn({
                'mr-3': !iconBtn,
                'btn-icon-transparent ': iconBtn,
            })}
            variant={iconBtn ? 'outline' : 'default'}
            size={iconBtn ? 'icon' : 'default'}
        >
            <Link href={`/posts/edit/${id}${getUrlQuery}`}>
                {iconBtn ? (
                    <span className="xicon text-2xl">
                        <DocumentEdit24Regular />
                    </span>
                ) : (
                    <UserPen />
                )}
                {!iconBtn && ' 编辑'}
            </Link>
        </CNButton>
    );
};

export const PostEditButton: FC<{ id: string; iconBtn?: boolean }> = ({ id, iconBtn }) => (
    <Suspense>
        {iconBtn ? (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Button id={id} iconBtn />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>编辑文章</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        ) : (
            <Button id={id} />
        )}
    </Suspense>
);
