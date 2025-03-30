import { type FC, useEffect } from 'react';
import { Outlet } from 'react-router';

import { useAuth } from './entities/auth';
import { supabase } from './shared/utils';
import { ThemeProvider } from './shared/hoc';

const App: FC = () => {
  const { onAuth } = useAuth();

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

  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  );
};

export default App;
