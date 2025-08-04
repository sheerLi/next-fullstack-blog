import type { FC } from 'react';

import StateDemo from './_components/state';
import { ZustandDemo } from './_components/zustand/index';
import $styles from './page.module.css';

const DemoPage: FC = () => (
    <div className={$styles.demo}>
        <StateDemo />
        {/* <ZustandDemo /> */}
    </div>
);

export default DemoPage;
