import type { User } from '@supabase/supabase-js';
import { create } from 'zustand';

interface IState {
  isAuth: boolean;
  user: User | null;

  updateUser: (data: Partial<User> | null) => void;
}

export const useAuthStore = create<IState>((set) => ({
  user: null,
  isAuth: false,

  updateUser: (newUser) =>
    set((state) => {
      return { user: newUser ? ({ ...state?.user, ...newUser } as User) : null, isAuth: !!newUser };
    }),
}));
