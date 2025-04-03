import { BankCard, useCards, useCardsRequests, UserCard, useUserCards } from 'app/entities/cards';
import { Appear, BackButton, CardApply, Empty } from 'app/shared';

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
      <BackButton />
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
            <Typography variant="h4">Ваши карты</Typography>
          </Appear>
          <br />
          <Grid container gap={3}>
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
        <Typography variant="h4">Карты нашего банка</Typography>
      </Appear>

      <br />
      <Grid flexWrap={'wrap'} container gap={3}>
        {cards.map((card) => (
          <Grid key={card.name} columns={{ xs: 1, sm: 2, md: 3 }}>
            <BankCard card={card} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
