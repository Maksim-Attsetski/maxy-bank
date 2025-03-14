import { useCards, type ICard } from 'app/entities/cards';
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
  const { cards, onGetCards } = useCards();

  useEffect(() => {
    onGetCards();
  }, []);

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
