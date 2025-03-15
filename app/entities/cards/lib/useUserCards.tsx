import { convertDto, useDataBase } from 'app/shared';
import { useCardsStore } from '../slice';
import { UserCardDto, type TFullUserCard } from '../types';
import { useEffect, useMemo } from 'react';
import { useUsers } from 'app/entities/users';

export const useUserCards = (load: boolean = false) => {
  const { setUserCards, createUserCards, userCards } = useCardsStore();
  const { user } = useUsers();

  const { onGetSelect, onCreateData, onUpdateData } = useDataBase<TFullUserCard>('user-cards', {
    update: setUserCards,
    create: createUserCards,
  });

  const canSkip = useMemo(() => userCards.length > 0, [userCards.length]);

  const onGetUserCards = async () => {
    if (canSkip || !user?.uid) return;
    const response = await onGetSelect(convertDto(UserCardDto)).eq('author_id', user?.uid);

    if (response.error) throw new Error(response.error?.message);
    setUserCards(response.data as unknown as TFullUserCard[]);
  };

  const onGetUserCard = async (uid: string): Promise<TFullUserCard> => {
    const cardInState = userCards.find((c) => c.uid === uid);
    if (cardInState) return cardInState;

    const response = await onGetSelect(convertDto(UserCardDto)).eq('uid', uid).single();

    if (response.error) throw new Error(response.error?.message);
    return response.data as unknown as TFullUserCard;
  };

  useEffect(() => {
    if (load && user?.uid) onGetUserCards();
  }, [load, user?.uid]);

  return {
    userCards,
    setUserCards,
    onGetUserCard,
    onGetUserCards,
    onCreateUserCard: onCreateData,
    onUpdateUserCard: onUpdateData,
  };
};
