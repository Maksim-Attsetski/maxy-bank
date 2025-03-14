import { useDataBase } from 'app/shared';
import { useCardsStore } from '../slice';
import type { ICard } from '../types';
import { useMemo } from 'react';

export const useUserCards = () => {
  const { setUserCards, userCards } = useCardsStore();
  const { onGetData } = useDataBase<ICard>('user-cards', { set: setUserCards });

  const canSkip = useMemo(() => userCards.length > 0, [userCards.length]);

  return {
    userCards,
    setUserCards,
    onGetCards: canSkip ? async () => {} : onGetData,
  };
};
