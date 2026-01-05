'use client';
import type { FC } from 'react';

import type { ErrorBoundaryProps } from './_components/errors/boundary';

import $styles from './(pages)/layout.module.css';
import { ErrorBoundary } from './_components/errors/boundary';
import { Header } from './_components/layout/header';
import Theme from './_components/theme';

const AppError: FC<ErrorBoundaryProps> = (props) => (
    <Theme>
        <div className={$styles.layout}>
            <Header />
            <ErrorBoundary {...props} />
        </div>
    </Theme>
);
export default AppError;
