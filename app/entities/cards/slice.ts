import { create } from 'zustand';
import type { ICard } from './types';

interface IState {
  cards: ICard[];

  setCards: (data: ICard[]) => void;
}

export const useCardsStore = create<IState>((set) => ({
  cards: [],

  setCards: (cards) => set({ cards: [...cards] }),
}));
