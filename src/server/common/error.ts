import { isNil, isObject } from 'lodash';

/**
 * 异常响应生成
 * @param title
 * @param error
 * @param code
 */
export const createErrorResult = (title: string, error?: any, code?: number) => {
    let message = title;
    if (!isNil(error)) {
        message =
            error instanceof Error || (isObject(error) && 'message' in error)
                ? `${title}:${error.message}`
                : `${title}:${error.toString()}`;
    }
    return {
        code,
        message,
    };
};
