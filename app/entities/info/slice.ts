import { create } from 'zustand';
import type { IFaq } from './types';

interface IState {
  faq: IFaq[];

  setFaq: (data: IFaq[]) => void;
}

export const useInfoStore = create<IState>((set) => ({
  faq: [],

  setFaq: (faq) => set({ faq: [...faq] }),
}));
