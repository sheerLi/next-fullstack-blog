import { createContext } from 'react';

import type { LayoutStoreType } from './type';

export const LayoutContext = createContext<LayoutStoreType | null>(null);
