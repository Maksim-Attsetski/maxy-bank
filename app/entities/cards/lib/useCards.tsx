import { useDataBase } from 'app/shared';
import { useCardsStore } from '../slice';
import type { ICard } from '../types';
import { useMemo } from 'react';

export const useCards = () => {
  const { cards, setCards } = useCardsStore();
  const { onGetData } = useDataBase<ICard>('cards', { set: setCards });

  const canSkip = useMemo(() => cards.length > 0, [cards.length]);

  return {
    cards,
    setCards,
    onGetCards: canSkip ? async () => {} : onGetData,
  };
};
