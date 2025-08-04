import type { FC } from 'react';

import { ArrowBigRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/app/_components/shadcn/ui/button';

import $styles from './page.module.css';

const App: FC = () => (
    <main className="tw:page-item">
        <div className={$styles.block}>
            欢迎来到3R教室，这是<span>Nextjs课程的开始</span>
            <Button asChild>
                <Link href="https://3rcd.com" target="_blank">
                    <ArrowBigRight />
                    查看官网
                </Link>
            </Button>
        </div>
    </main>
);
export default App;
