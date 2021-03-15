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

import { ThemeMode } from '@/styles/styled';
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
    setCurrentTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);

      return newTheme;
    });
  }, []);

  const value = React.useMemo(
    () => ({
      theme: { ...theme, mode: currentTheme },
      currentTheme,
      toggleTheme,
    }),
    [currentTheme, toggleTheme],
  );

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as ThemeMode;
    setCurrentTheme(oldTheme => storedTheme ?? oldTheme);
  }, []);

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider
        theme={{
          ...theme,
          mode: currentTheme,
        }}
      >
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
