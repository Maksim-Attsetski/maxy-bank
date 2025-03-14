import type { User } from '@supabase/supabase-js';
import { create } from 'zustand';

interface IState {
  isAuth: boolean;

  setIsAuth: (data?: boolean) => void;
}

export const useAuthStore = create<IState>((set) => ({
  isAuth: false,

  setIsAuth: (value) => set((state) => ({ isAuth: value ?? !state.isAuth })),
}));
