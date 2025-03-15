import { useNavigate } from 'react-router';

import { useCards } from 'app/entities/cards';
import { Button, Card } from 'app/shared';
import type { Route } from './+types/add_card';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Добавить карту в Maxy Bank' },
    { name: 'description', content: 'Инициализация новых карт в Maxy Bank' },
  ];
}

export default function AddNewCard() {
  const { cards } = useCards(true);
  const navigate = useNavigate();

  return (
    <div className="container">
      <Button to={-1}>Назад</Button>
      <br />
      <br />
      <h3>Выберите карту для оформления</h3>
      <br />
      <div className="flex flex-col gap-3">
        {cards?.map((card) => (
          <Card onClick={() => navigate(card?.uid)} key={card?.uid}>
            <h5>{card?.name}</h5>
          </Card>
        ))}
      </div>
    </div>
  );
}
