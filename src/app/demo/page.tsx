import type { FC } from 'react';

// import { CallbackDemo } from './_components/callback';
// import ContextDemo from './_components/context';
// import CustomDemo from './_components/custom';
// import ReducerDemo from './_components/reducer';
// import EffectDemo from './_components/effect';
// import MemoDemo from './_components/memo';
// import RefDemo from './_components/ref';
// import StateDemo from './_components/state';
// import { ZustandDemo } from './_components/zustand/index';
import ThemeDemo from '../_components/theme/demo';
import $styles from './page.module.css';

const DemoPage: FC = () => (
    <div className={$styles.demo}>
        {/* <StateDemo />
        <EffectDemo />
        <RefDemo />
        <MemoDemo />
        <CallbackDemo /> */}
        {/* <ContextDemo />
        <ReducerDemo />
        <CustomDemo /> */}
        {/* <ZustandDemo /> */}
        <ThemeDemo />
    </div>
);

export default DemoPage;
