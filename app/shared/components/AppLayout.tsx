import React, { useEffect, type FC } from 'react';

import { Outlet } from 'react-router';

import Footer from './Footer';
import Header from './Header';
import { supabase } from '../utils';

const AppLayout: FC = () => {
  useEffect(() => {
    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   console.log('by getSession', session);
    // });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('by onAuthStateChange', _event, session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
