'use client';
import type { FC, PropsWithChildren } from 'react';
import type { DeepPartial } from 'utility-types';

import { Layout as AntdLayout, Menu as AntdMenu, Select, Switch, theme } from 'antd';
import {
    Content as AntdContent,
    Footer as AntdFooter,
    Header as AntdHeader,
} from 'antd/es/layout/layout';
import { default as AntdSider } from 'antd/es/layout/Sider';
import { clsx } from 'clsx';
import { isNil } from 'lodash';
import { useCallback, useRef } from 'react';
import { useShallow } from 'zustand/shallow';

import type { LayoutOptions, LayoutStoreType } from './type';

import $styles from '../style.module.css';
import { LayoutContext } from './constants';
import { useLayoutContext } from './hooks';
import { createLayoutStore } from './store';
import { LayoutMode } from './type';

/**
 * 状态池包装器，用于包装状态池，并提供状态池的上下文
 * @param props 初始化参数
 * @param children 子组件
 */
export const LayoutStore: FC<PropsWithChildren<DeepPartial<LayoutOptions>>> = ({
    children,
    ...props
}) => {
    const storeRef = useRef<LayoutStoreType>(null);
    if (isNil(storeRef.current)) {
        storeRef.current = createLayoutStore(props);
    }
    return <LayoutContext value={storeRef.current}>{children}</LayoutContext>;
};

/**
 * 生成一些菜单数据
 */
const items = Array.from({ length: 15 })
    .fill(null)
    .map((_, index) => ({
        key: index + 1,
        label: `nav ${index + 1}`,
    }));

/**
 * 菜单组件
 */
const Menu: FC = () => {
    const mode = useLayoutContext((state) => state.mode);
    const layoutTheme = useLayoutContext((state) => state.theme);
    return (
        <AntdMenu
            // 当顶栏菜单时，菜单颜色跟随header，否则跟随sidebar
            theme={mode === 'top' ? layoutTheme.header : layoutTheme.sidebar}
            mode={mode === 'top' ? 'horizontal' : 'inline'}
            defaultSelectedKeys={['2']}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
        />
    );
};

/**
 * 侧边栏组件
 */
const Sider: FC = () => {
    const mode = useLayoutContext((state) => state.mode);
    const layoutTheme = useLayoutContext((state) => state.theme);
    const {
        // colorBgContainer 就是白色
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <AntdSider style={{ background: layoutTheme.sidebar === 'dark' ? '' : colorBgContainer }}>
            {mode === 'side' && (
                <div className="mx-auto my-7 h-10 w-3/4 bg-slate-500" />
            )}
            <Menu />
        </AntdSider>
    );
};

const Header: FC = () => {
    const layoutTheme = useLayoutContext((state) => state.theme);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const mode = useLayoutContext((state) => state.mode);
    return (
        <AntdHeader
            style={{ background: layoutTheme.header === 'dark' ? '' : colorBgContainer }}
            className="flex items-center px-0"
        >
            {mode !== 'side' && <div className="mx-3 h-10 w-44 bg-slate-500" />}
            {mode === 'top' && <Menu />}
        </AntdHeader>
    );
};

/**
 * 内容组件
 */
const Content: FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <AntdLayout className="p-6">
            <AntdContent
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                Content
            </AntdContent>
        </AntdLayout>
    );
};

/**
 * 底部组件
 */
const Footer: FC = () => (
    <AntdFooter style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </AntdFooter>
);

/**
 * 布局模式控制组件
 */
const ModeCtrol: FC = () => {
    const mode = useLayoutContext((state) => state.mode);

    const changeMode = useLayoutContext((state) => state.changeMode);
    return (
        <Select defaultValue={mode} style={{ width: 300 }} onChange={changeMode}>
            <Select.Option value={LayoutMode.SIDE}>左栏菜单【LOGO在边栏】</Select.Option>
            <Select.Option value={LayoutMode.CONTENT}>左栏菜单【LOGO在顶栏】</Select.Option>
            <Select.Option value={LayoutMode.TOP}>顶栏菜单</Select.Option>
        </Select>
    );
};

/**
 * 顶栏和侧边栏控制组件
 */
const ThemeCtrol: FC = () => {
    const { header, sidebar } = useLayoutContext(useShallow((state) => ({ ...state.theme })));
    const changeTheme = useLayoutContext((state) => state.changeTheme);
    const changeSidebarTheme = useCallback(
        (value: boolean) => changeTheme({ sidebar: value ? 'dark' : 'light' }),
        [],
    );
    const changeHeaderTheme = useCallback(
        (value: boolean) => changeTheme({ header: value ? 'dark' : 'light' }),
        [],
    );
    return (
        <>
            <div>
                <span>切换侧边栏主题：</span>
                <Switch
                    checkedChildren="🌛"
                    unCheckedChildren="☀️"
                    onChange={changeSidebarTheme}
                    checked={sidebar === 'dark'}
                    defaultChecked={sidebar === 'dark'}
                />
            </div>
            <div>
                <span>切换顶栏主题：</span>
                <Switch
                    checkedChildren="🌛"
                    unCheckedChildren="☀️"
                    onChange={changeHeaderTheme}
                    checked={header === 'dark'}
                    defaultChecked={header === 'dark'}
                />
            </div>
        </>
    );
};

/**
 * 布局组件
 */
export const ZustandDemo: FC = () => {
    const mode = useLayoutContext((state) => state.mode);

    return (
        <div className="flex flex-auto flex-col items-center justify-center">
            <div className={clsx($styles.container, 'flex w-[100rem] justify-between')}>
                <ModeCtrol />
                <ThemeCtrol />
            </div>
            <div className={clsx($styles.container, 'w-[100rem]')}>
                <AntdLayout>
                    {mode !== 'side' && <Header />}
                    {mode === 'side' && <Sider />}
                    <AntdLayout>
                        {mode === 'side' && <Header />}
                        {mode === 'content' && <Sider />}
                        {mode !== 'content' && <Content />}
                        {mode !== 'content' && <Footer />}
                        {mode === 'content' && (
                            <AntdLayout>
                                <Content />
                                <Footer />
                            </AntdLayout>
                        )}
                    </AntdLayout>
                </AntdLayout>
            </div>
        </div>
    );
};
