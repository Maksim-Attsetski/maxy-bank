import {
  ChangeNameModal,
  ChangePinModal,
  useUserCards,
  type TFullUserCard,
} from 'app/entities/cards';
import { BackButton, cardsImagesUrl, CardUtils, routes } from 'app/shared';
import { useState, useEffect } from 'react';
import type { Route } from '../+types/home';
import { Link, useParams } from 'react-router';
import { Button, Card, Grid, Typography } from '@mui/material';

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
      <BackButton />
      <br />
      <br />
      {cardItem ? (
        <>
          <Card>
            <Grid justifySelf={'center'}>
              <Typography textAlign={'center'}>{cardItem.name}</Typography>
              <Typography>(до {cardItem.expire_at})</Typography>
            </Grid>
            <Grid justifyContent={'space-between'}>
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
              <Grid direction={'column'} alignItems={'end'}>
                <Typography variant="h5">
                  Владелец: {cardItem?.author_id?.first_name} {cardItem?.author_id?.last_name}
                </Typography>
                {cardItem.bank_account_id ? (
                  <>
                    <Typography>Номер счета {cardItem.bank_account_id?.number}</Typography>
                    <Typography>Баланс {cardItem.bank_account_id?.balance}</Typography>
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
              </Grid>
            </Grid>
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
