'use client';

import type { HydrateProps } from 'next-mdx-remote-client';
import type { FC, JSX } from 'react';

import { isNil } from 'lodash';
import { hydrate } from 'next-mdx-remote-client';
import { useMemo, useRef, useState } from 'react';
import { useDeepCompareEffect, useMount } from 'react-use';

import { useIsMobile, useIsTablet } from '@/libs/broswer';
import { deepMerge } from '@/libs/utils';

import type { MdxHydrateProps } from './types';

import { Toc } from './components/toc';
import './styles/index.css';
import { useCodeWindow } from './hooks/code-window';
import $styles from './hydrate.module.css';
import { defaultMdxHydrateOptions } from './options/hydrate';

export const MdxHydrate: FC<MdxHydrateProps> = (props) => {
    const { serialized, toc = true, ...rest } = props;
    const contentRef = useRef<HTMLDivElement>(null);
    const [content, setContent] = useState<JSX.Element | null>(null);
    const mobile = useIsMobile();
    const tablet = useIsTablet();
    const isMobile = useMemo(() => mobile || tablet, [mobile, tablet]);
    const options = useMemo(() => deepMerge(defaultMdxHydrateOptions, rest, 'merge'), [rest]);
    useDeepCompareEffect(() => {
        const { content, error } = hydrate({ ...serialized, ...options } as HydrateProps);
        if (!error && !isNil(content)) setContent(content);
    }, [serialized, options]);
    useMount(() => {
        // 确保页面完全加载
        if (typeof window !== 'undefined') {
            // 获取当前URL的hash
            const hash = decodeURIComponent(window.location.hash);
            if (hash) {
                // 延迟执行以确保DOM已完全渲染
                setTimeout(() => {
                    const element = document.querySelector(hash);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        }
    });
    useCodeWindow(contentRef, content);
    if (isNil(serialized) || 'error' in serialized) return null;
    return (
        !isNil(content) && (
            <div className={$styles.container}>
                <div className={$styles.article} ref={contentRef}>
                    {content}
                </div>
                {toc && <Toc serialized={serialized} isMobile={isMobile} />}
            </div>
        )
    );
};
