import { create } from 'zustand';
import type { IUser } from './types';

interface IState {
  user: IUser | null;

  updateUser: (data: Partial<IUser> | null) => void;
}

export const useUsersStore = create<IState>((set) => ({
  user: null,

  updateUser: (newUser) =>
    set((state) => {
      return {
        user: newUser ? ({ ...state?.user, ...newUser } as IUser) : null,
      };
    }),
}));
