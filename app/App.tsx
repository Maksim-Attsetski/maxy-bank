import React, { type FC, memo, useEffect } from 'react';
import { Outlet } from 'react-router';

import { useAuth } from './entities/auth';
import { supabase } from './shared/utils';

const App: FC = () => {
  const { onAuth, isAuth } = useAuth();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('by onAuthStateChange', _event, session);
      console.log(session?.user);

      onAuth(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return <Outlet />;
};

export default App;
