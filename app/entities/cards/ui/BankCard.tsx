import React, { type FC, memo } from 'react';

import type { ICard } from '../types';
import { Card } from 'app/shared';

interface IProps {
  card: ICard;
}

const BankCard: FC<IProps> = ({ card }) => {
  return (
    <Card>
      <h5>{card.name}</h5>
      <p>{card.description}</p>
      <p>
        Начни пользоваться за {card.price} р. (обслуживание - {card.service_fee})
      </p>
    </Card>
  );
};

export default memo(BankCard);
