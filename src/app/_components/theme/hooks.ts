'use client';

import { theme } from 'antd';
import { debounce } from 'lodash';
import { use, useCallback, useEffect, useMemo, useState } from 'react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

import type { ThemeMode } from './constants';
import type { ThemeState } from './types';

import { ThemeContext } from './constants';
import { getSystemTheme } from './utils';

/**
 * 获取整个状态池对象
 */
export function useThemeStore() {
    const store = use(ThemeContext);
    if (!store) {
        throw new Error('Missing Theme Component in the tree');
    }
    return store;
}

/**
 * 获取主题状态
 * @param selector
 */
export function useThemeState<T>(selector: (state: ThemeState) => T): T {
    const store = useThemeStore();
    return useStore(store, useShallow(selector));
}

/**
 * 获取主题模式状态
 */
export function useTheme() {
    return useThemeState((state) => ({ mode: state.mode, compact: state.compact }));
}

/**
 * 获取主题操作函数
 */
export function useThemeActions() {
    const dispatch = useThemeState((state) => state.dispatch);
    return {
        changeMode: useCallback(
            debounce((v: `${ThemeMode}`) => dispatch({ type: 'change_mode', value: v }), 100, {}),
            [],
        ),
        toggleMode: useCallback(() => dispatch({ type: 'toggle_mode' }), []),
        changeCompact: useCallback(
            (v: boolean) => dispatch({ type: 'change_compact', value: v }),
            [],
        ),
        toggleCompact: useCallback(() => dispatch({ type: 'toggle_compact' }), []),
    };
}

/**
 * 获取系统主题颜色
 */
export function useSystemTheme() {
    const [isDarkTheme, setIsDarkTheme] = useState(() => getSystemTheme());
    useEffect(() => {
        const setSystemDark = () => setIsDarkTheme(getSystemTheme());
        window.addEventListener('change', setSystemDark);
        return () => {
            window.removeEventListener('change', setSystemDark);
        };
    }, []);

    return isDarkTheme ? 'dark' : 'light';
}

/**
 * 获取 Antd 主题配置算法
 */
export const useAntdAlgorithm = () => {
    const { mode, compact } = useTheme();
    const systemTheme = useSystemTheme();
    return useMemo(() => {
        const result = [compact ? theme.compactAlgorithm : theme.defaultAlgorithm];
        if (mode === 'dark' || (mode === 'system' && systemTheme === 'dark'))
            result.push(theme.darkAlgorithm);
        return result;
    }, [systemTheme, mode, compact]);
};
