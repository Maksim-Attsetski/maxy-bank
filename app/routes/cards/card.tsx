import {
  ChangeNameModal,
  ChangePinModal,
  useUserCards,
  type TFullUserCard,
} from 'app/entities/cards';
import { cardsImagesUrl, CardUtils, routes } from 'app/shared';
import { useState, useEffect } from 'react';
import type { Route } from '../+types/home';
import { Link, useParams } from 'react-router';
import { Button, Card, Col, Row } from 'antd';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Карты в Maxy Bank' },
    { name: 'description', content: 'Все доступные карты в Maxy Bank' },
  ];
}

export default function CardItem() {
  const paramsId = useParams()?.uid;
  const [cardItem, setCardItem] = useState<TFullUserCard | null>(null);

  const [changeNameModal, setChangeNameModal] = useState(false);
  const [changePincodeModal, setChangePincodeModal] = useState(false);

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
  const onSaveCardName = async (name: string) => {
    if (cardItem?.uid) {
      const newCard = { name, uid: cardItem.uid } as TFullUserCard;
      await onUpdateUserCard(newCard);
      setCardItem((prev) => (prev ? { ...prev, ...newCard } : prev));
    }
  };

  const onSaveCardPin = async (pin: string) => {
    if (cardItem?.uid) {
      const newCard = { pin: +pin, uid: cardItem.uid } as TFullUserCard;
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
      {cardItem && (
        <>
          <ChangeNameModal
            onSave={onSaveCardName}
            card={cardItem}
            open={changeNameModal}
            setOpen={setChangeNameModal}
          />
          <ChangePinModal
            onSave={onSaveCardPin}
            card={cardItem}
            open={changePincodeModal}
            setOpen={setChangePincodeModal}
          />
        </>
      )}
      <Link to={'../'}>Назад</Link>
      <br />
      <br />
      {cardItem ? (
        <>
          <Card>
            <Row className="justify-self-center">
              <h3 className="text-center">{cardItem.name}</h3>
              <p>(до {cardItem.expire_at})</p>
            </Row>
            <Row className="justify-between">
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
              <Col className="flex-col items-end">
                <h5>
                  Владелец: {cardItem?.author_id?.first_name} {cardItem?.author_id?.last_name}
                </h5>
                {cardItem.bank_account_id ? (
                  <>
                    <p>Номер счета {cardItem.bank_account_id?.number}</p>
                    <p>Баланс {cardItem.bank_account_id?.balance}</p>
                  </>
                ) : (
                  <Button
                    title={cardItem?.blocked_at ? 'Карта заблокирована' : ''}
                    disabled={!!cardItem?.blocked_at}
                  >
                    Оформить счёт
                  </Button>
                )}
                <Button onClick={() => setChangePincodeModal(true)}>Сменить pin код</Button>
                <Button onClick={() => setChangeNameModal(true)}>Сменить имя</Button>
                {cardItem?.blocked_at ? (
                  <Button onClick={onUnblockCard}>Разблокировать</Button>
                ) : (
                  <Button onClick={onBlockCard}>Заблокировать</Button>
                )}
              </Col>
            </Row>
          </Card>
          {cardItem?.bank_account_id && (
            <>
              <br />
              <Card>
                <Link to={'/' + routes.money_transfer + '/' + cardItem?.uid}>Перевести</Link>
              </Card>
            </>
          )}
        </>
      ) : (
        <>
          <p>Нет карты с id {paramsId}</p>
        </>
      )}
    </div>
  );
}
