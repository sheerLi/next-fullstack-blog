import type { FC } from 'react';

import { ZustandDemo } from './_components/zustand/index';
import $styles from './page.module.css';

const DemoPage: FC = () => (
    <div className={$styles.demo}>
        <ZustandDemo />
    </div>
);

export default DemoPage;
