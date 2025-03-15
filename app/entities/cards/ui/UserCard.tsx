import React, { type FC, memo } from 'react';

import type { TFullUserCard } from '../types';
import { Card, cardsImagesUrl, CardUtils } from 'app/shared';
import { useNavigate } from 'react-router';

interface IProps {
  card: TFullUserCard;
}

const UserCard: FC<IProps> = ({ card }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(card?.uid)}>
      <h5 className="text-center">{card.name}</h5>
      <img
        className="w-60 h-30 rounded-2xl"
        src={cardsImagesUrl + card?.card_bg + '.jpg'}
        alt="bg"
      />
      <p className="text-right px-3">{CardUtils.maskLastDigits(card.card_number)}</p>
    </div>
  );
};

export default memo(UserCard);
