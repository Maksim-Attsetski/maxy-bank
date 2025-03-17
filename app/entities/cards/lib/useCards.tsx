import { useEffect } from 'react';

import { useDataBase } from 'app/shared';

import { useCardsStore } from '../slice';
import type { ICard } from '../types';

export const useCards = (load: boolean = false) => {
  const { cards, setCards } = useCardsStore();
  const { onGetData } = useDataBase<ICard>('cards', { set: setCards });

  const onGetCards = async () => {
    if (cards.length > 0) return;
    await onGetData();
  };

  useEffect(() => {
    if (load) onGetCards();
  }, [load]);

  return {
    cards,
    setCards,
    onGetCards,
  };
};
