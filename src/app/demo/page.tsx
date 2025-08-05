import type { FC } from 'react';

import { CallbackDemo } from './_components/callback';
import EffectDemo from './_components/effect';
import MemoDemo from './_components/memo';
import RefDemo from './_components/ref';
import StateDemo from './_components/state';
// import { ZustandDemo } from './_components/zustand/index';
import $styles from './page.module.css';

const DemoPage: FC = () => (
    <div className={$styles.demo}>
        <StateDemo />
        <EffectDemo />
        <RefDemo />
        <MemoDemo />
        <CallbackDemo />
        {/* <ZustandDemo /> */}
    </div>
);

export default DemoPage;
