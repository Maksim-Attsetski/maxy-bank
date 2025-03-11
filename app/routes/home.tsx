import type { Route } from './+types/home';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

import { CardDto, type TFullCard } from '~/entities/cards';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Maxy Bank' }, { name: 'description', content: 'Добро пожаловать в Maxy Bank' }];
}

const supabaseUrl = import.meta.env.VITE_SBURL;
const supabaseKey = import.meta.env.VITE_SBKEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const createUrl = (dto: {}): string => {
  let res = '';

  for (const k in dto) {
    if (Object.prototype.hasOwnProperty.call(dto, k)) {
      const key = k as keyof typeof dto;
      if (typeof dto[key] === 'object') {
        res += key + '(' + Object.keys(dto[key]).join(',') + ')';
        continue;
      }
      res += key + ', ';
    }
  }

  return res;
};

export default function Home() {
  const [cards, setCards] = useState<TFullCard[]>([]);

  useEffect(() => {
    getInstruments();
  }, []);

  async function getInstruments() {
    let { data: cards, error } = await supabase.from('cards').select(createUrl(CardDto));

    console.log(cards);

    setCards(cards as unknown as TFullCard[]);
  }

  return (
    <ul>
      {cards.map((instrument) => (
        <li key={instrument.name}>{instrument.name}</li>
      ))}
    </ul>
  );
}
