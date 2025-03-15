import { create } from 'zustand';
import type { ICard, TFullUserCard } from './types';

interface IState {
  cards: ICard[];
  userCards: TFullUserCard[];

  setCards: (data: ICard[]) => void;
  setUserCards: (data: TFullUserCard[]) => void;
  createUserCards: (data: TFullUserCard) => void;
}

export const useCardsStore = create<IState>((set) => ({
  cards: [],
  userCards: [],

  setCards: (cards) => set({ cards: [...cards] }),
  setUserCards: (cards) => set({ userCards: [...cards] }),
  createUserCards: (card) => set((state) => ({ userCards: [...state.userCards, card] })),
}));
