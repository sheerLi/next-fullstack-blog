'use client';
import type { FC, PropsWithChildren } from 'react';

import { px2remTransformer, StyleProvider } from '@ant-design/cssinjs';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { App as AntdApp, ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import '@ant-design/v5-patch-for-react-19';

import { LayoutStore } from './_components/zustand';
import $styles from './layout.module.css';

const px2rem = px2remTransformer();
const DemoLayout: FC<PropsWithChildren> = ({ children }) => (
    <LayoutStore>
        <AntdRegistry>
            <ConfigProvider
                locale={zhCN}
                theme={{
                    algorithm: theme.defaultAlgorithm,
                    // 启用css变量
                    cssVar: true,
                    hashed: false,
                    token: {},
                }}
            >
                <AntdApp>
                    <StyleProvider transformers={[px2rem]}>
                        <div className={$styles.layout}>{children}</div>
                    </StyleProvider>
                </AntdApp>
            </ConfigProvider>
        </AntdRegistry>
    </LayoutStore>
);
export default DemoLayout;
