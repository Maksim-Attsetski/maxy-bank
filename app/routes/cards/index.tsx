import { useNavigate } from 'react-router';

import { BankCard, useCards, useCardsRequests, UserCard, useUserCards } from 'app/entities/cards';
import { Card, CardWithAction, Flex, routes } from 'app/shared';

import type { Route } from '../+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Карты в Maxy Bank' },
    { name: 'description', content: 'Все доступные карты в Maxy Bank' },
  ];
}

export default function Cards() {
  const navigate = useNavigate();

  const { cards } = useCards(true);
  const { userCards } = useUserCards(true);
  const { cardsRequests, onDeleteCardRequest } = useCardsRequests(true);

  return (
    <div className="container">
      {cardsRequests.length > 0 && (
        <>
          <h3>Ваши запросы на карты</h3>
          <br />
          <Flex className="gap-5">
            {cardsRequests.map((req) => (
              <CardWithAction
                key={req.id}
                action={<div onClick={() => onDeleteCardRequest(req.id, 'id')}>🗑️</div>}
              >
                <h3>{req.card_id?.name}</h3>
                <p>{req.status}</p>
              </CardWithAction>
            ))}
            <Card className="w-max my-auto" onClick={() => navigate('/' + routes.add_card)}>
              <p>Оформить карту</p>
              <h2 className="text-center">+</h2>
            </Card>
          </Flex>
        </>
      )}
      <br />
      {userCards.length > 0 ? (
        <>
          <h3>Ваши карты</h3>
          <br />
          <Flex className="gap-5">
            {userCards.map((card) => (
              <UserCard card={card} key={card.name} />
            ))}
            <Card className="w-max my-auto" onClick={() => navigate('/' + routes.add_card)}>
              <p>Оформить карту</p>
              <h2 className="text-center">+</h2>
            </Card>
          </Flex>
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
      <Flex className="gap-5 flex-wrap">
        {cards.map((card) => (
          <div key={card.name} className="flex-1/3">
            <BankCard card={card} />
          </div>
        ))}
      </Flex>
    </div>
  );
}
