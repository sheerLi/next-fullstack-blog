import type { ThemeActions, ThemeMode } from './constants';
import type { createThemeStore } from './store';

/**
 * 状态类型
 */
export interface ThemeOptions {
    mode: `${ThemeMode}`;
    compact: boolean;
}

/**
 * Redux dispatch
 */
export type ThemeDispatchs =
    | { type: `${ThemeActions.CHANGE_MODE}`; value: `${ThemeMode}` }
    | { type: `${ThemeActions.TOOGLE_MODE}` }
    | { type: `${ThemeActions.CHANGE_COMPACT}`; value: boolean }
    | { type: `${ThemeActions.TOOGLE_COMPACT}` };

/**
 * 状态参数
 */
export type ThemeState = ThemeOptions & {
    dispatch: (action: ThemeDispatchs) => ThemeDispatchs;
};

/**
 * 状态池类型
 */
export type ThemeStoreType = ReturnType<typeof createThemeStore>;
