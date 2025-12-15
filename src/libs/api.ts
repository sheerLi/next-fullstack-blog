import { hc } from 'hono/client';

import type { AppType } from '@/server/main';

import { appConfig } from '@/config/app';

const honoApi = hc<AppType>(appConfig.baseUrl);

const fetchApi = async <F extends (c: ReturnType<typeof hc<AppType>>) => Promise<any>>(run: F) => {
    const result = await run(honoApi);
    return result;
};

export { fetchApi, honoApi };
