import type { FC, JSX } from 'react';

import {
    Timeline,
    TimelineContent,
    TimelineDot,
    TimelineHeading,
    TimelineItem,
    TimelineLine,
} from '../shadcn/ui/timeline';

export interface HomeTimelineType {
    title: string | JSX.Element;
    content: string | JSX.Element;
}

interface Props {
    data: HomeTimelineType[];
}

export const HomeTimeline: FC<Props> = ({ data }) => (
    <Timeline positions="center">
        {data.map((item, index) => (
            <TimelineItem status="done" key={index.toFixed()}>
                <TimelineHeading
                    side={index % 2 === 0 ? 'left' : 'right'}
                    Wrapper={({ children, className }) => (
                        <div className={className}>{children}</div>
                    )}
                >
                    {item.title}
                </TimelineHeading>
                <TimelineContent
                    side={index % 2 === 0 ? 'right' : 'left'}
                    Wrapper={({ children, className }) => (
                        <div className={className}>{children}</div>
                    )}
                >
                    {item.content}
                </TimelineContent>
                <TimelineDot
                    status="done"
                    Wrapper={({ children, className }) => (
                        <div className={className}>{children}</div>
                    )}
                />
                <TimelineLine
                    done
                    Wrapper={({ children, className }) => (
                        <div className={className}>{children}</div>
                    )}
                />
            </TimelineItem>
        ))}
    </Timeline>
);
