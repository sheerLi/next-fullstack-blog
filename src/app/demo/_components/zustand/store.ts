import type { DeepPartial } from 'utility-types';

import { isNil } from 'lodash';
import { createStore } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { deepMerge } from '@/libs/utils';

import type { LayoutOptions, LayoutState } from './type';

export const createLayoutStore = (options: DeepPartial<LayoutOptions>) =>
    createStore<LayoutState>()(
        subscribeWithSelector(
            immer(
                devtools(
                    persist(
                        (set) => ({
                            ...deepMerge<LayoutOptions, DeepPartial<LayoutOptions>>(
                                {
                                    mode: 'side',
                                    theme: {
                                        header: 'light',
                                        sidebar: 'dark',
                                    },
                                },
                                options,
                                'replace',
                            ),
                            changeMode: (value) => set(() => ({ mode: value })),
                            changeTheme: (theme) =>
                                set((state) => {
                                    if (!isNil(theme.sidebar)) {
                                        state.theme.sidebar = theme.sidebar;
                                        state.theme.header =
                                            state.theme.sidebar === 'dark' ? 'light' : 'dark';
                                    } else if (!isNil(theme.header)) {
                                        state.theme.header = theme.header;
                                        state.theme.sidebar =
                                            state.theme.header === 'dark' ? 'light' : 'dark';
                                    }
                                }),
                        }),
                        { name: 'zustand-demo' },
                    ),
                    { name: 'zustand-demo' },
                ),
            ),
        ),
    );

// const useLayoutStore = createLayoutStore();
// useLayoutStore.subscribe(
//     (state) => state.theme,
//     (value) => {
//         console.log(value);
//     },
//     {
//         equalityFn: shallow,
//         fireImmediately: true,
//     },
// );
// export { useLayoutStore };
