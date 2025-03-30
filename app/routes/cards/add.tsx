import { useState } from 'react';

import { useCards, useCardsRequests, type ICard, type ICardRequest } from 'app/entities/cards';
import { useUsers } from 'app/entities/users';

import type { Route } from './+types/add';
import { useAuth } from 'app/entities/auth';
import { AuthModal } from 'app/shared/modals';
import { Button, Card, Input, Modal } from '@mui/material';
import { Link } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Добавить карту в Maxy Bank' },
    { name: 'description', content: 'Инициализация новых карт в Maxy Bank' },
  ];
}

export default function AddNewCard() {
  const { cards } = useCards(true);
  const { user } = useUsers();
  const { isAuth } = useAuth();
  const { onCreateCardRequest } = useCardsRequests(true);

  const [selectedCard, setSelectedCard] = useState<ICard | null>(null);
  const [description, setDescription] = useState<string>('');

  const [requestModalOpen, setRequestModalOpen] = useState(false);

  const onMakeNewRequest = async () => {
    if (!selectedCard?.id || !user?.uid) return;

    await onCreateCardRequest({
      card_id: selectedCard?.uid,
      description,
      user_id: user?.uid,
    } as ICardRequest);
    setRequestModalOpen(false);
  };

  return (
    <div className="container">
      <Modal open={requestModalOpen}>
        <>
          <h2>Вы уверены?</h2>
          <br />
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Описание"
          />
          <br />
          <Button onClick={onMakeNewRequest}>Отправить</Button>
        </>
      </Modal>
      <Link to={'../'}>Назад</Link>
      <br />
      <br />
      <h3>Выберите карту для оформления</h3>
      <br />
      <AuthModal>
        <>
          {cards?.map((card) => (
            <Card
              onClick={() => {
                setSelectedCard(card);
                setRequestModalOpen(true);
              }}
              key={card?.uid}
            >
              <h5>{card?.name}</h5>
            </Card>
          ))}
        </>
      </AuthModal>
    </div>
  );
}
