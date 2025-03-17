import { BankCard, useCards, useCardsRequests, UserCard, useUserCards } from 'app/entities/cards';
import { Appear, CardApply, CardWithAction, Empty, Flex } from 'app/shared';

import type { Route } from '../+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Карты в Maxy Bank' },
    { name: 'description', content: 'Все доступные карты в Maxy Bank' },
  ];
}

export default function Cards() {
  const { cards } = useCards(true);
  const { userCards } = useUserCards(true);
  const { cardsRequests, onDeleteCardRequest } = useCardsRequests(true);

  return (
    <div className="container">
      {cardsRequests.length > 0 && (
        <>
          <Appear>
            <h3>Ваши запросы на карты</h3>
          </Appear>
          <br />
          <Flex className="gap-5">
            {cardsRequests.map((req) => (
              <CardWithAction
                key={req.id}
                action={
                  req.status === 'PENDING' && (
                    <div onClick={() => onDeleteCardRequest(req.id, 'id')}>🗑️</div>
                  )
                }
              >
                <h3>{req.card_id?.name}</h3>
                <p>{req.status}</p>
              </CardWithAction>
            ))}
            <CardApply />
          </Flex>
        </>
      )}
      <br />
      {userCards.length > 0 ? (
        <>
          <Appear>
            <h3>Ваши карты</h3>
          </Appear>
          <br />
          <Flex className="gap-5">
            {userCards.map((card) => (
              <UserCard card={card} key={card.name} />
            ))}
            <CardApply />
          </Flex>
        </>
      ) : (
        <Empty title="У вас нет карт">
          <CardApply />
        </Empty>
      )}
      <br />
      <Appear>
        <h3>Карты нашего банка</h3>
      </Appear>

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
