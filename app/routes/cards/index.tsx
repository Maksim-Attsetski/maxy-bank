import { useEffect } from 'react';

import { BankCard, useCards, UserCard, useUserCards } from 'app/entities/cards';
import { Card, routes } from 'app/shared';

import type { Route } from '../+types/home';
import { useNavigate } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Карты в Maxy Bank' },
    { name: 'description', content: 'Все доступные карты в Maxy Bank' },
  ];
}

export default function Cards() {
  const navigate = useNavigate();

  const { cards, onGetCards } = useCards();
  const { userCards } = useUserCards(true);

  useEffect(() => {
    onGetCards();
  }, []);

  return (
    <div className="container">
      {userCards.length > 0 ? (
        <>
          <h3>Ваши карты</h3>
          <br />
          <div className="flex gap-5">
            {userCards.map((card) => (
              <UserCard card={card} key={card.name} />
            ))}
            <Card className="w-max my-auto" onClick={() => navigate('/' + routes.add_card)}>
              <p>Оформить карту</p>
              <h2 className="text-center">+</h2>
            </Card>
          </div>
        </>
      ) : (
        <>
          <h3>У вас нет карт</h3>
          <br />
          <Card className="w-max" onClick={() => navigate('/' + routes.add_card)}>
            <p>Оформить карту</p>
            <h2 className="text-center">+</h2>
          </Card>
        </>
      )}
      <br />
      <h3>Карты нашего банка</h3>
      <br />
      <div className="flex gap-5">
        {cards.map((card) => (
          <BankCard card={card} key={card.name} />
        ))}
      </div>
    </div>
  );
}
