import 'styled-components';

import theme from '@/styles/theme';

export type Theme = typeof theme;
export type ThemeMode = 'light' | 'dark';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    mode: ThemeMode;
  }
}
