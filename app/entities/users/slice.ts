import { create } from 'zustand';
import type { IUser, IUserDocument } from './types';

interface IState {
  user: IUser | null;
  userDocument: IUserDocument | null;

  updateUser: (data: Partial<IUser> | null) => void;
  updateUserDocument: (data: Partial<IUserDocument> | null) => void;
}

export const useUsersStore = create<IState>((set) => ({
  user: null,
  userDocument: null,

  updateUser: (newUser) =>
    set((state) => {
      return {
        user: newUser ? ({ ...state?.user, ...newUser } as IUser) : null,
      };
    }),
  updateUserDocument: (newDoc) =>
    set((state) => {
      return {
        userDocument: newDoc ? ({ ...state?.userDocument, ...newDoc } as IUserDocument) : null,
      };
    }),
}));
