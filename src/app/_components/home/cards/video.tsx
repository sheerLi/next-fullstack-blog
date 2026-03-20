'use client';
import type { FC } from 'react';

import Play from '@ricons/fluent/Play20Filled';
import { useCallback, useState } from 'react';

import { VideoModal } from '../../modal/video';
import { cn } from '../../shadcn/utils';
import $styles from './video.module.css';

export interface HomeVideoCardType {
    image: string;
    video: string;
}
type Props = HomeVideoCardType;
export const HomeVideoCard: FC<Props> = ({ image, video }) => {
    const [open, setOpen] = useState(false);
    const openModal = useCallback(() => setOpen(true), []);
    return (
        <>
            <div className={cn(`relative flex h-80 w-full items-center justify-center`)}>
                <div
                    className={$styles.main}
                    style={{
                        backgroundImage: image,
                    }}
                >
                    <button onClick={openModal} type="button" className={$styles.openBtn}>
                        <Play className="size-8! text-white" />
                    </button>
                </div>
            </div>
            <VideoModal video={{ url: video }} open={open} setOpen={setOpen} />
        </>
    );
};
