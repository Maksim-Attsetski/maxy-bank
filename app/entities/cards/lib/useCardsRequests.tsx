import { useEffect } from 'react';

import { convertDto, useDataBase } from 'app/shared';

import { useCardsStore } from '../slice';
import { CardRequestDto, type ICardRequest, type TFullCardRequest } from '../types';
import { useUsers } from 'app/entities/users';

export const useCardsRequests = (load: boolean = false) => {
  const { cardsRequests, setCardsRequests, createCardRequest } = useCardsStore();
  const { user } = useUsers();
  const { onGetSelect, onCreateData } = useDataBase<ICardRequest | TFullCardRequest>(
    'cards-requests',
    { create: createCardRequest },
    CardRequestDto
  );

  const onGetCardsRequests = async () => {
    if (cardsRequests.length > 0 || !user?.uid) return;
    const response = await onGetSelect(convertDto(CardRequestDto)).eq('user_id', user?.uid);

    if (response.error) throw new Error(response.error?.message);
    setCardsRequests(response.data as unknown as TFullCardRequest[]);
  };

  useEffect(() => {
    if (load) onGetCardsRequests();
  }, [load, user?.uid]);

  return {
    cardsRequests,
    setCardsRequests,
    onGetCardsRequests,
    onCreateCardRequest: onCreateData,
  };
};
