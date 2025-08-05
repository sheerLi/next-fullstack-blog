'use client';
import type { FC } from 'react';

import { Button } from 'antd';
import { useEffect, useState } from 'react';

import $styles from './style.module.css';

const EffectDemo: FC = () => {
    const [ghost, setGhost] = useState<boolean>(false);
    const [width, setWidth] = useState(0);
    const [red, setRed] = useState<boolean>(false);
    const toggleGhostBtn = () => setGhost(!ghost);
    const resizeHandle = () => setWidth(window.innerWidth);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            console.log('浏览器宽度改变');
            window.addEventListener('resize', resizeHandle);
        }

        return () => {
            window.removeEventListener('resize', resizeHandle);
        };
    }, [width]);

    useEffect(() => {
        (async () => {
            await new Promise((resolve) => setTimeout(() => resolve(true), 1000));
            setRed(ghost);
        })();
        console.log('切换幽灵按钮');
    }, [ghost]);

    useEffect(() => {
        console.log('只在第一次或重新渲染组件时触发');
    }, []);
    return (
        <div className={$styles.container}>
            <h2 className="text-center">useEffect Demo</h2>
            <p className="py-5 text-center">{ghost ? 'ghost' : '普通'}按钮</p>
            <div className="flex flex-col justify-center">
                <Button type="primary" onClick={toggleGhostBtn} ghost={ghost} danger={red}>
                    切换按钮样式
                </Button>
                <p className="pt-5 text-center">宽度为: {width}</p>
            </div>
        </div>
    );
};
export default EffectDemo;
