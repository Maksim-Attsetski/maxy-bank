import type { User } from '@supabase/supabase-js';
import { useAuthStore } from '../slice';
import { supabase } from '~/shared/utils';

export const useAuth = () => {
  const { isAuth, updateUser, user } = useAuthStore();

  const onAuth = (data: User | null) => {
    updateUser(data);
  };

  const onLogout = async () => {
    try {
      const err = await supabase.auth.signOut();

      if (err.error) throw new Error(err?.error?.message);
      onAuth(null);
    } catch (error) {
      console.error(error);
    }
  };

  return { isAuth, user, onAuth, onLogout };
};
