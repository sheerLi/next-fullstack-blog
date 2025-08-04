'use client';
import type { FC, PropsWithChildren } from 'react';

import { isNil } from 'lodash';
import { useEffect, useRef } from 'react';

import type { ThemeOptions, ThemeStoreType } from './types';

import { ThemeContext } from './constants';
import { useSystemTheme, useThemeStore } from './hooks';
import { createThemeStore } from './store';

const ThemeSubscribe: FC<PropsWithChildren> = ({ children }) => {
    const store = useThemeStore();
    const systemTheme = useSystemTheme();
    let unSub: () => void;
    useEffect(() => {
        unSub = store.subscribe(
            (state) => state.mode,
            (mode) => {
                const html = document.getElementsByTagName('html');
                if (html.length) {
                    html[0].classList.remove('light');
                    html[0].classList.remove('dark');
                    if (mode === 'system') {
                        html[0].classList.add(systemTheme);
                    } else {
                        html[0].classList.add(mode);
                    }
                }
            },
            {
                fireImmediately: true,
            },
        );
        return () => {
            if (!isNil(unSub)) {
                unSub();
            }
        };
    }, [systemTheme]);
    return <>{children}</>;
};

const Theme: FC<PropsWithChildren<Partial<ThemeOptions>>> = ({ children, ...props }) => {
    const storeRef = useRef<ThemeStoreType>(null);
    if (!storeRef.current) {
        storeRef.current = createThemeStore(props);
    }
    return (
        <ThemeContext value={storeRef.current}>
            <ThemeSubscribe>{children}</ThemeSubscribe>
        </ThemeContext>
    );
};
export default Theme;
