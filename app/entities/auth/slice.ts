import { create } from 'zustand';

interface IState {
  isAuth: boolean;
  user: {} | null;

  updateUser: (data: Partial<{}>) => void;
}

export const useAuthStore = create<IState>((set) => ({
  user: null,
  isAuth: false,

  updateUser: (newUser) => set((state) => {
    return { user: newUser ? {...state?.user, ...newUser} : null, isAuth: !!newUser }
  }),
}))