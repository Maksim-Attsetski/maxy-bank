import { create } from 'zustand';

import type { IBankAccount } from './types';

interface IState {
  bankAccounts: IBankAccount[];

  setBankAccounts: (data: IBankAccount[]) => void;
}

export const useBankAccountStore = create<IState>((set) => ({
  bankAccounts: [],

  setBankAccounts: (acc) => set({ bankAccounts: [...acc] }),
}));
