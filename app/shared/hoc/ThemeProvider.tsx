import {
  createTheme,
  ThemeProvider as MaterialProvider,
  type Components,
  type CssVarsTheme,
  type PaletteOptions,
  type Theme,
} from '@mui/material';
import { useMemo, type FC, type PropsWithChildren } from 'react';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { ru } from 'date-fns/locale';
import { ruRU } from '@mui/x-date-pickers/locales';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { useTheme } from '../hooks';

const getPalette = (theme: 'light' | 'dark'): PaletteOptions =>
  theme === 'light'
    ? {
        text: {
          primary: '#333',
        },
        primary: {
          main: '#5e5cf9',
        },
        background: {
          default: '#eee',
          paper: '#fff',
        },
      }
    : {
        text: {
          primary: '#e9e9e9',
        },
        primary: {
          main: '#7b66e8',
        },
        background: {
          default: '#333',
          paper: '#11111140',
        },
      };

const componentsTheme: Components<Omit<Theme, 'components' | 'palette'> & CssVarsTheme> = {
  MuiCard: { styleOverrides: { root: { borderRadius: 8, padding: '12px' } } },
  MuiTypography: { defaultProps: { color: 'text.primary' } },
  MuiInputBase: { styleOverrides: { root: { borderRadius: 8 }, input: { padding: '12px 14px' } } },
  MuiOutlinedInput: {
    styleOverrides: { root: { borderRadius: 8 }, input: { padding: '12px 14px' } },
  },
};

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme(true);

  const themeData = useMemo(
    () =>
      createTheme(
        {
          palette: getPalette(theme),
          components: componentsTheme,
        },
        ruRU
      ),
    [theme]
  );

  return (
    <MaterialProvider theme={themeData}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={ru}
        localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
      >
        {children}
      </LocalizationProvider>
    </MaterialProvider>
  );
};

export default ThemeProvider;
