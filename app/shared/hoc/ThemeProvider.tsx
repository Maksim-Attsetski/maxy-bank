import { ConfigProvider, theme as antTheme } from 'antd';
import { useEffect, useState, type FC, type PropsWithChildren } from 'react';
import { useTheme } from '../hooks';
import type { AliasToken } from 'antd/es/theme/internal';

const defaultData: Record<'light' | 'dark', Partial<AliasToken>> = {
  light: {
    borderRadius: 8,
    colorPrimary: '#5e5cf9',
    colorBgLayout: '#eee',
    colorBgBase: '#fff',
    colorText: '#333',
  },
  dark: {
    borderRadius: 8,
    colorPrimary: '#7b66e8',
    colorBgLayout: '#333',
    colorBgBase: '#111',
    colorText: '#eee',
  },
};

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme(true);

  const [data, setData] = useState<Partial<AliasToken>>(defaultData[theme]);

  useEffect(() => {
    setData(defaultData[theme]);
  }, [theme]);

  return (
    <ConfigProvider
      theme={{
        token: { ...data },
        hashed: true,
        components: {
          Card: { colorBorder: defaultData[theme].colorBorder },
          Input: { colorBorder: defaultData[theme].colorBorder },
        },
        algorithm: [antTheme.darkAlgorithm, antTheme.compactAlgorithm],
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
