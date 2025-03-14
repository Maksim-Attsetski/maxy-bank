import { BankCard, useCards, type ICard } from 'app/entities/cards';
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
      <br />
      <div className="flex gap-5">
        {cards.map((card) => (
          <BankCard card={card} key={card.name} />
        ))}
      </div>
    </div>
  );
}
