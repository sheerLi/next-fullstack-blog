'use client';

import type { MouseEventHandler } from 'react';

import { Undo2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { cn } from '@/app/_components/shadcn/utils';

import { Button } from '../shadcn/ui/button';

export const BackButton = () => {
    const router = useRouter();
    const [historyLength, setHistoryLength] = useState(0);
    const goBack: MouseEventHandler<HTMLButtonElement> = useCallback(
        (e) => {
            e.preventDefault();
            if (historyLength > 1) {
                router.back();
            }
        },
        [historyLength],
    );

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setHistoryLength(window.history.length);
        }
    }, []);
    return (
        <Button
            variant="outline"
            className={cn('rounded-sm', {
                'pointer-events-none opacity-50': historyLength <= 1,
            })}
            disabled={historyLength <= 1}
            aria-disabled={historyLength <= 1}
            onClick={goBack}
        >
            <Undo2 />
            返回
        </Button>
    );
};
