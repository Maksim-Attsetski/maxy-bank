import { type FC } from 'react';

import { Outlet } from 'react-router';
import { Box, Divider } from '@mui/material';

import Footer from '../components/Footer';
import Header from '../components/Header';

const AppLayout: FC = () => {
  return (
    <Box sx={{ bgcolor: 'background.default' }} className="layout">
      <Header />
      <main style={{ padding: '12px 24px', minHeight: '100%' }}>
        <Outlet />
      </main>
      <Divider style={{ margin: 0 }} />
      <Footer />
    </Box>
  );
};

export default AppLayout;
