import { use } from 'react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

import type { LayoutState } from './type';

import { LayoutContext } from './constants';

/**
 * 使用状态池的hook
 * @param selector 选择器
 * @returns 选择器的结果
 */
export const useLayoutContext = <T>(selector: (state: LayoutState) => T) => {
    const store = use(LayoutContext);
    if (!store) {
        throw new Error('Missing LayoutContext.Provider in the tree');
    }

    return useStore(store, useShallow(selector));
};
