import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  DefaultTheme,
  ThemeProvider as StyledThemeProvider,
} from 'styled-components';

import { ThemeMode } from '@/@types/styled';
import GlobalStyles from '@/styles/global';
import theme from '@/styles/theme';

export type ThemeContextState = {
  theme: DefaultTheme;
  currentTheme: ThemeMode;
  toggleTheme(): void;
};

export const ThemeContext = createContext<ThemeContextState>(
  {} as ThemeContextState,
);

export const ThemeProvider: React.FC = ({ children }): JSX.Element => {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('light');

  const toggleTheme = useCallback(() => {
    setCurrentTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const value = React.useMemo(
    () => ({
      currentTheme,
      toggleTheme,
      theme: {
        ...theme,
        mode: currentTheme,
        color: theme.colors[currentTheme],
      },
    }),
    [currentTheme, toggleTheme],
  );

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as ThemeMode;

    if (storedTheme) {
      setCurrentTheme(storedTheme);

      return;
    }

    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      // eslint-disable-next-line no-console
      console.log('using the operating system theme dark');

      setCurrentTheme('dark');

      return;
    }

    setCurrentTheme('light');
  }, []);

  useEffect(() => {
    if (!window.matchMedia) {
      return;
    }

    const matchMediaThemeDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    );

    const handleChangeThemeInSystem = (event: MediaQueryListEvent) => {
      setCurrentTheme(event.matches ? 'dark' : 'light');
    };

    matchMediaThemeDark.addEventListener('change', handleChangeThemeInSystem);

    return () => {
      matchMediaThemeDark?.removeEventListener(
        'change',
        handleChangeThemeInSystem,
      );
    };
  }, []);

  useEffect(() => {
    document.body.dataset.theme = currentTheme;
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  return (
    <StyledThemeProvider theme={value.theme}>
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
      <GlobalStyles />
    </StyledThemeProvider>
  );
};

export const useTheme = () => useContext(ThemeContext);
