import { type FC } from 'react';
import { Outlet } from 'react-router';

const AuthLayout: FC = () => {
  return (
    <main style={{ padding: '0 24px' }}>
      <Outlet />
    </main>
  );
};

export default AuthLayout;
