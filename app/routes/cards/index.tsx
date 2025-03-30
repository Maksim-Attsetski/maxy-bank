import { BankCard, useCards, useCardsRequests, UserCard, useUserCards } from 'app/entities/cards';
import { Appear, CardApply, Empty } from 'app/shared';

import type { Route } from '../+types/home';
import { Card, Grid, Typography } from '@mui/material';

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
            <Typography variant="h3">Ваши запросы на карты</Typography>
          </Appear>
          <br />
          <Grid>
            {cardsRequests.map((req) => (
              <Card
                key={req.id}
                // action={
                //   req.status === 'PENDING' && (
                //     <div onClick={() => onDeleteCardRequest(req.id, 'id')}>🗑️</div>
                //   )
                // }
              >
                <>
                  <Typography variant="h3">{req.card_id?.name}</Typography>
                  <Typography>{req.status}</Typography>
                </>
              </Card>
            ))}
            <CardApply />
          </Grid>
        </>
      )}
      <br />
      {userCards.length > 0 ? (
        <>
          <Appear>
            <h3>Ваши карты</h3>
          </Appear>
          <br />
          <Grid gap={3}>
            {userCards.map((card) => (
              <UserCard card={card} key={card.name} />
            ))}
            <CardApply />
          </Grid>
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
      <Grid flexWrap={'wrap'} gap={3}>
        {cards.map((card) => (
          <div key={card.name} className="flex-1/3">
            <BankCard card={card} />
          </div>
        ))}
      </Grid>
    </div>
  );
}
