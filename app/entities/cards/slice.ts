import { create } from 'zustand';
import type { ICard, TFullCardRequest, TFullUserCard } from './types';

interface IState {
  cards: ICard[];
  userCards: TFullUserCard[];
  cardsRequests: TFullCardRequest[];

  setCards: (data: ICard[]) => void;
  setUserCards: (data: TFullUserCard[]) => void;
  setCardsRequests: (data: TFullCardRequest[]) => void;
  createCardRequest: (data: TFullCardRequest) => void;
  createUserCards: (data: TFullUserCard) => void;
}

export const useCardsStore = create<IState>((set) => ({
  cards: [],
  userCards: [],
  cardsRequests: [],

  setCards: (cards) => set({ cards: [...cards] }),
  setUserCards: (cards) => set({ userCards: [...cards] }),
  setCardsRequests: (req) => set({ cardsRequests: [...req] }),
  createCardRequest: (req) => set((state) => ({ cardsRequests: [...state.cardsRequests, req] })),
  createUserCards: (card) => set((state) => ({ userCards: [...state.userCards, card] })),
}));
