import { useEffect, useState } from 'react';

export type TTheme = 'light' | 'dark';

export const useTheme = (check?: boolean) => {
  const [theme, setTheme] = useState<TTheme>('light');

  function onSetTheme(themeName: TTheme) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('theme', themeName);
    setTheme(themeName);
  }

  function onToggleTheme() {
    onSetTheme(theme === 'dark' ? 'light' : 'dark');
  }

  function onCheckTheme() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      onSetTheme(theme as TTheme);
      return;
    }

    const prefersLightTheme = window.matchMedia('(prefers-color-scheme: light)');
    if (prefersLightTheme.matches) {
      onSetTheme('light');
      return;
    }

    onSetTheme('dark');
  }

  useEffect(() => {
    if (check) onCheckTheme();
  }, [check]);

  return { theme, onToggleTheme };
};
