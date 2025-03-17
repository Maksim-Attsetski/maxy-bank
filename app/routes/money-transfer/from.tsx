import { useParams } from 'react-router';
import type { Route } from '../+types/home';
import { useUserCards, type TFullUserCard } from 'app/entities/cards';
import { useMemo, useState } from 'react';
import { Button, Empty, Input } from 'app/shared';
import { useBankAccount } from 'app/entities/bank-accounts';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Перевод денежных средств в Maxy Bank' },
    { name: 'description', content: 'Перевести кому угодно без комиссии Maxy Bank' },
  ];
}

export default function MoneyTransferFrom() {
  const paramsId = useParams()?.uid;

  const { userCards, setUserCards } = useUserCards(true);

  const { onGetBankAccountBy, onUpdateBankAccounts } = useBankAccount();

  const [receiver, setReceiver] = useState<string>('');
  const [sum, setSum] = useState<string>('0');

  const card = useMemo(
    () => paramsId && userCards.find((c) => c?.uid === paramsId),
    [paramsId, userCards]
  );

  const onSendMoney = async () => {
    const receiverBankAcc = await onGetBankAccountBy('number', receiver);

    if (!receiverBankAcc) throw new Error('Несуществующий номер счета');

    if (!card || (card?.bank_account_id?.balance ?? 0) < +sum) return;

    // my
    await setUserCards(
      userCards?.map((c) => {
        if (c.uid === card?.uid) {
          return {
            ...c,
            bank_account_id: {
              ...c?.bank_account_id,
              balance: (c?.bank_account_id?.balance ?? 0) - +sum,
            },
            uid: c?.uid,
          };
        }
        return c;
      }) as TFullUserCard[]
    );
    await onUpdateBankAccounts({
      balance: (card?.bank_account_id?.balance ?? 0) - +sum,
      uid: card?.bank_account_id?.uid,
    });
    // receiver
    await onUpdateBankAccounts({
      balance: receiverBankAcc.balance + +sum,
      uid: receiverBankAcc?.uid,
    });
  };

  return (
    <div className="container">
      <h2>Денежный перевод</h2>
      <br />
      {card ? (
        <>
          <h2>Со счета {card?.bank_account_id?.number}</h2>
          <br />
          <h4>Баланс {card?.bank_account_id?.balance}</h4>
          <br />
          <hr />
          <h2>На счет {receiver}</h2>
          <br />
          <Input value={receiver} onChangeText={setReceiver} />
          <Input value={sum} onChangeText={setSum} />
          <Button onClick={onSendMoney}>Отправить</Button>
        </>
      ) : (
        <>
          <Empty title="Карта не найдена" />
        </>
      )}
    </div>
  );
}
