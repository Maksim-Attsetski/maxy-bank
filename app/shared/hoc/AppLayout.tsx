import { type FC } from 'react';

import { Outlet } from 'react-router';

import Footer from '../components/Footer';
import Header from '../components/Header';
import { Divider, Layout, theme } from 'antd';

const AppLayout: FC = () => {
  const {
    token: { colorBgBase },
  } = theme.useToken();

  return (
    <div className="layout">
      <Header />
      <Layout.Content
        style={{
          padding: '12px 24px',
          background: colorBgBase,
          minHeight: '100%',
        }}
      >
        <Outlet />
      </Layout.Content>
      <Divider style={{ margin: 0 }} />
      <Footer />
    </div>
  );
};

export default AppLayout;
