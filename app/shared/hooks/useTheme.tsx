export type TTheme = 'light' | 'dark';

import { useEffect } from 'react';
import { create } from 'zustand';

interface IState {
  theme: TTheme;

  setTheme: (data?: TTheme) => void;
  setDefaultTheme: () => void;
}

export const useThemeStore = create<IState>((set) => ({
  theme: 'light',

  setTheme: (value) =>
    set((state) => {
      const newValue = (value ?? state.theme === 'light') ? 'dark' : 'light';

      localStorage.setItem('theme', newValue);
      return { theme: newValue };
    }),
  setDefaultTheme: () => set(() => ({ theme: localStorage.getItem('theme') as TTheme })),
}));

export const useTheme = (check?: boolean) => {
  const { theme, setTheme, setDefaultTheme } = useThemeStore();

  function onToggleTheme() {
    setTheme();
  }

  useEffect(() => {
    if (check) setDefaultTheme();
  }, [check]);

  return { theme, onToggleTheme };
};
