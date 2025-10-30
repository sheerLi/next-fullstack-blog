import type { FC } from 'react';

import type { MdxRenderProps } from './types';

import { MdxHydrate } from './hydrate';
import { serializeMdx } from './utils';

/**
 * 动态mdx渲染组件
 * @param props
 */
export const MdxRender: FC<MdxRenderProps> = async (props) => {
    const { source, options, header, hydrate } = props;
    const result = await serializeMdx(source, options ?? {});
    return <MdxHydrate {...(hydrate ?? {})} serialized={result} header={header} />;
};
