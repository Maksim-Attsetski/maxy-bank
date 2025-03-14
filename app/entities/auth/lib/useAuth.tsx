import type {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
  User,
} from '@supabase/supabase-js';
import { useAuthStore } from '../slice';
import { supabase } from 'app/shared/utils';
import { useUsers, type IUser } from 'app/entities/users';

export const useAuth = () => {
  const { isAuth, setIsAuth } = useAuthStore();
  const { onGetUser, onCreateUser, user } = useUsers();

  const onAuth = async (data: User | null) => {
    setIsAuth(!!data);

    if (data && !user) {
      await onGetUser(data?.id);
    }
  };

  const onLogin = async (credentials: SignInWithPasswordCredentials) => {
    try {
      const response = await supabase.auth.signInWithPassword(credentials);

      if (response.error) throw new Error(response?.error?.message);

      onAuth(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const onSignup = async (values: Partial<IUser>, credentials: SignUpWithPasswordCredentials) => {
    try {
      const response = await supabase.auth.signUp(credentials);

      if (response.error) throw new Error(response?.error?.message);

      await onCreateUser({ ...values } as IUser);
      setIsAuth(true);
    } catch (error) {
      console.error(error);
    }
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

  return { isAuth, onAuth, onLogin, onSignup, onLogout };
};
