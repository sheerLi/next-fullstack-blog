import type { FC } from 'react';

import { Switch } from 'antd';

import { useTheme, useThemeActions } from './hooks';

/**
 * Antd主题选择器
 */
export const AntdThemeSetting: FC = () => {
    const { mode, compact } = useTheme();
    const { toggleMode, toggleCompact } = useThemeActions();
    return (
        <>
            <Switch
                checkedChildren="🌛"
                unCheckedChildren="☀️"
                onChange={toggleMode}
                checked={mode === 'dark'}
                defaultChecked={mode === 'dark'}
            />
            <Switch
                checkedChildren="紧凑"
                unCheckedChildren="正常"
                onChange={toggleCompact}
                checked={compact}
                defaultChecked={compact}
            />
        </>
    );
};
