import type { ICard } from 'app/entities/cards';
import { supabase } from 'app/shared';
import { useState, useEffect } from 'react';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Карты в Maxy Bank' },
    { name: 'description', content: 'Все доступные карты в Maxy Bank' },
  ];
}

export default function Cards() {
  const [cards, setCards] = useState<ICard[]>([]);

  useEffect(() => {
    getCardList();
  }, []);

  async function getCardList() {
    let { data: cards, error } = await supabase.from('cards').select('*');

    console.log(cards);

    setCards(cards as unknown as ICard[]);
  }

  return (
    <div className="container">
      <h3>Карты нашего банка</h3>
      <ul>
        {cards.map((card) => (
          <li key={card.name}>
            <h5>{card.name}</h5>
            <p>{card.description}</p>
            <p>
              Начни пользоваться за {card.price} р. (обслуживание - {card.service_fee})
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
