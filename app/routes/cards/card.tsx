import { useUserCards, type TFullUserCard } from 'app/entities/cards';
import { Button, Card, cardsImagesUrl, CardUtils } from 'app/shared';
import { useState, useEffect } from 'react';
import type { Route } from '../+types/home';
import { useParams } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Карты в Maxy Bank' },
    { name: 'description', content: 'Все доступные карты в Maxy Bank' },
  ];
}

export default function CardItem() {
  const paramsId = useParams()?.uid;
  const [cardItem, setCardItem] = useState<TFullUserCard | null>(null);

  const { onGetUserCard, onUpdateUserCard } = useUserCards();

  const onUnblockCard = async () => {
    if (cardItem?.uid) {
      const newCard = { blocked_at: null, uid: cardItem.uid };
      await onUpdateUserCard(newCard);
      setCardItem((prev) => (prev ? { ...prev, ...newCard } : prev));
    }
  };
  const onBlockCard = async () => {
    if (cardItem?.uid) {
      const newCard = {
        blocked_at: new Date()?.toDateString(),
        uid: cardItem.uid,
      } as TFullUserCard;
      await onUpdateUserCard(newCard);
      setCardItem((prev) => (prev ? { ...prev, ...newCard } : prev));
    }
  };

  useEffect(() => {
    (async () => {
      if (!paramsId) return;

      const newCard = await onGetUserCard(paramsId);
      setCardItem(newCard);
    })();
  }, [paramsId]);

  return (
    <div className="container">
      <Button to={-1}>Назад</Button>
      <br />
      <br />
      {cardItem ? (
        <Card withScale={false}>
          <div className="flex justify-self-center gap-3">
            <h3 className="text-center">{cardItem.name}</h3>
            <p>(до {cardItem.expire_at})</p>
          </div>
          <div className="flex gap-2 justify-between">
            <div>
              <div className="relative">
                <img
                  className="w-56 md:w-sm lg:w-lg rounded-2xl"
                  src={cardsImagesUrl + cardItem?.card_bg + '.jpg'}
                  alt="bg"
                />
                <Card className="absolute bottom-3 left-3 py-2">
                  <p>{CardUtils.maskLastDigits(cardItem.card_number)}</p>
                </Card>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-end">
              {cardItem.bank_account_id ? (
                <>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto rem
                    accusantium ratione? Unde nam quidem suscipit mollitia sit alias adipisci.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto rem
                    accusantium ratione? Unde nam quidem suscipit mollitia sit alias adipisci.
                  </p>
                </>
              ) : (
                <Button variant="primary">Оформить счёт</Button>
              )}
              <Button>Сменить pin код</Button>
              <Button>Сменить имя</Button>
              {cardItem?.blocked_at ? (
                <Button variant="primary" onClick={onUnblockCard}>
                  Разблокировать
                </Button>
              ) : (
                <Button onClick={onBlockCard}>Заблокировать</Button>
              )}
            </div>
          </div>
        </Card>
      ) : (
        <>
          <p>Нет карты с id {paramsId}</p>
        </>
      )}
    </div>
  );
}
