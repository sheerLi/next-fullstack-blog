import type { FC } from 'react';

import { isNil } from 'lodash';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Tools } from '@/app/_components/home/tool';

import type { IPaginateQueryProps } from '../_components/paginate/types';

import { cn } from '../_components/shadcn/utils';
import { queryPostPaginate } from '../actions/post';
import $styles from './page.module.css';

const HomePage: FC<{ searchParams: Promise<IPaginateQueryProps> }> = async ({ searchParams }) => {
    const { page: currentPage, limit = 8 } = await searchParams;
    const page = isNil(currentPage) || Number(currentPage) < 1 ? 1 : Number(currentPage);
    const { items } = await queryPostPaginate({ page, limit });
    return (
        <div className="page-item">
            <Tools className="page-container" />
            <div className={cn('page-container', $styles.list)}>
                {items.map((item) => (
                    <div
                        className={$styles.item}
                        // 传入css变量的封面图用于鼠标移动到此处后会出现不同颜色的光晕效果
                        style={{ '--bg-img': `url(${item.thumb})` } as any}
                        key={item.id}
                    >
                        <Link className={$styles.thumb} href={`/posts/${item.id}`}>
                            <Image
                                src={item.thumb}
                                alt={item.title}
                                fill
                                priority
                                sizes="100%"
                                unoptimized
                            />
                        </Link>
                        <div className={$styles.content}>
                            <div className={$styles.title}>
                                <Link href={`/posts/${item.id}`}>
                                    <h2 className="ellips animate-decoration animate-decoration-lg">
                                        {item.title}
                                    </h2>
                                </Link>
                            </div>
                            <div className={$styles.summary}>
                                {isNil(item.summary) ? item.body.substring(0, 99) : item.summary}
                            </div>
                            <div className={$styles.footer}>
                                <div className={$styles.meta}>
                                    <span>
                                        <Calendar />
                                    </span>
                                    <time className="ellips">2024年8月10日</time>
                                </div>
                                {/* 文章操作按钮 */}
                            </div>
                        </div>
                    </div>
                ))}
                {/* 分页组件 */}
            </div>
        </div>
    );
};
export default HomePage;
