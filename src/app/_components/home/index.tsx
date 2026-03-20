import type { FC } from 'react';

import { Suspense } from 'react';

import { homeConfig } from '@/config/home';

import { HomeBackground } from './background';
import { HomeListCard } from './cards/list';
import { HomeVideoCard } from './cards/video';
import { HomeWelcomeCard } from './cards/welcome';
import { HomeBlock, HomeContainer } from './container';
import { HomeSeketon } from './skeleton';
import $styles from './style.module.css';
import { HomeTimeline } from './timeline';
const { welcome, video, list, typed, timeline } = homeConfig;
export const Home: FC = () => (
    <>
        <HomeBackground />
        <Suspense fallback={<HomeSeketon />}>
            <div className={$styles.home}>
                {(welcome || video) && (
                    <HomeContainer>
                        {welcome && (
                            <HomeBlock>
                                <HomeWelcomeCard {...welcome} />
                            </HomeBlock>
                        )}
                        {video && (
                            <HomeBlock>
                                <div className="flex h-auto w-full">
                                    <HomeVideoCard {...video} />
                                </div>
                            </HomeBlock>
                        )}
                    </HomeContainer>
                )}
                {typed && (
                    <HomeContainer className="items-center justify-center space-y-2 md:flex-col">
                        <div className="flex w-full items-center justify-center font-lxgw text-xl">
                            typed text
                        </div>
                    </HomeContainer>
                )}
                {list && (
                    <HomeContainer>
                        <HomeBlock className="lg:px-5">
                            <div className="h-full w-full">
                                <HomeListCard {...list.first} />
                            </div>
                        </HomeBlock>
                        <HomeBlock className="lg:px-5">
                            <div className="h-full w-full">
                                <HomeListCard {...list.second} />
                            </div>
                        </HomeBlock>
                    </HomeContainer>
                )}
                {timeline && (
                    <HomeContainer>
                        <div className="h-full w-full">
                            <HomeTimeline data={timeline} />
                        </div>
                    </HomeContainer>
                )}
            </div>
        </Suspense>
    </>
);
