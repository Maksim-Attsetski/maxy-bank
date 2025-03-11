import React, { type FC } from 'react';

import { Outlet } from 'react-router';

import Footer from './Footer';
import Header from './Header';

const AppLayout: FC = () => {
  return (
    <div className="layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
