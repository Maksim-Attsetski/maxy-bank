import { useDataBase } from 'app/shared';
import { useCardsStore } from '../slice';
import type { ICard } from '../types';

export const useCards = () => {
  const { cards, setCards } = useCardsStore();
  const { onGetData } = useDataBase<ICard>('cards', { set: setCards });

  return {
    cards,
    setCards,
    onGetCards: onGetData,
  };
};
