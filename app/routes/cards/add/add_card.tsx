import {
  ChangeNameModal,
  ChangePinModal,
  useCards,
  useUserCards,
  type TFullUserCard,
} from 'app/entities/cards';
import { Button, Card, cardsImagesUrl, CardUtils, Input, Modal } from 'app/shared';
import { useState, useEffect, useMemo } from 'react';
import type { Route } from '../../+types/home';
import { useNavigate, useParams } from 'react-router';
import { Formik } from 'formik';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Добавить карту в Maxy Bank' },
    { name: 'description', content: 'Инициализация новых карт в Maxy Bank' },
  ];
}

export default function CardItem() {
  const paramsId = useParams()?.uid;

  const { onCreateUserCard } = useUserCards();
  const { cards } = useCards(true);

  const cardForAdd = useMemo(() => cards.find((c) => c.uid === paramsId), [cards, paramsId]);

  return (
    <div className="container">
      <Button to={-1}>Назад</Button>
      <br />
      <br />
      <h3>Оформить карту {cardForAdd?.name}</h3>
      <Formik
        initialValues={{
          name: '',
        }}
        onSubmit={() => {}}
      >
        {({ handleChange, handleSubmit, handleReset, errors, touched, isSubmitting }) => (
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Input name="name" onChange={handleChange} />
            {errors.name && touched.name && errors.name}
            <Button onClick={handleReset}>Сброс</Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Продолжить
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
