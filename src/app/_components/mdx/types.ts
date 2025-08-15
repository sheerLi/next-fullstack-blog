import type { HydrateProps, SerializeResult } from 'next-mdx-remote-client';
import type { MDXRemoteProps } from 'next-mdx-remote-client/rsc';
import type { TocItem } from 'remark-flexible-toc';
import type { Compatible } from 'vfile';

/**
 * mdx作用域
 */
interface Scope {
    /**
     * toc目录数据
     */
    toc?: TocItem[];
}

/**
 * mdx序列化配置
 */
export type MdxSerializeOptions = Omit<MDXRemoteProps, 'source'>;

/**
 * mdx水合配置
 */
export type MdxHydrateOptions = Omit<HydrateProps, 'compiledSource'> & {
    /**
     * 是否显示toc目录
     */
    toc?: boolean;
};

/**
 * mdx水合组件props
 */
export interface MdxHydrateProps extends MdxHydrateOptions {
    serialized: SerializeResult<Record<string, unknown>, Scope>;
}

/**
 * mdx渲染器组件props
 */
export interface MdxRenderProps {
    source: Compatible;
    options?: MdxSerializeOptions;
    hydrate?: MdxHydrateOptions;
}
