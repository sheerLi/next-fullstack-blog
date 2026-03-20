import type { HomeListCardType } from './cards/list';
import type { HomeVideoCardType } from './cards/video';
import type { HomeWelcomeCardType } from './cards/welcome';
import type { HomeTimelineType } from './timeline';

export interface HomePageConfig {
    // 顶部欢迎块
    welcome?: HomeWelcomeCardType;
    // 顶部介绍视频
    video?: HomeVideoCardType;
    // 中间区域的文字列表块
    list?: HomeListCardType;
    // 中间区域打字机文字
    typed?: string[];
    // 底部时间线
    timeline?: HomeTimelineType[];
}
