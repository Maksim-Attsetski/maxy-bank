import { type FC } from 'react';
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router';

const AuthLayout: FC = () => {
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  return (
    <Layout.Content
      style={{
        padding: '0 24px',
        backgroundColor: colorBgLayout,
      }}
    >
      <Outlet />
    </Layout.Content>
  );
};

export default AuthLayout;
