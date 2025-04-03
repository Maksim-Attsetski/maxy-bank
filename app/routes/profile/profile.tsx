import { Link, useParams } from 'react-router';
import type { Route } from '../+types/home';
import { useUserDocuments, useUsers } from 'app/entities/users';
import { useEffect, useMemo } from 'react';
import { encode, supabase } from 'app/shared';
import { ProfileUserInfo } from 'app/widgets';
import { Button, Card, Input, Typography } from '@mui/material';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Личный кабинет | Maxy Bank' },
    { name: 'description', content: 'Личный кабинет | Maxy Bank' },
  ];
}

const address = {
  country: 'Беларусь',
  region: 'Минская область',
  city: 'Минск',
  district: 'Ленинский район',
  street: 'ул. Карла Маркса',
  house: '12А',
  building: 'корп. 3',
  apartment: '45',
  postal_code: '220030',
};

const document = {
  passport_number: 'MP3334455',
  issued_by: 'Лучший район',
  identification_number: '8494434A344PB6',
  issued_at: Date.now(),
  expire_at: Date.now(),
  address_reg: address,
  address_live: address,
};

type TDocument = typeof document;

export default function Profile() {
  const paramsId = useParams()?.uid as string | undefined;

  const { user } = useUsers();
  const { userDocument, onGetUserDoc } = useUserDocuments();

  const isAuthor = useMemo(() => (paramsId ? user?.uid === paramsId : true), [user?.uid, paramsId]);

  useEffect(() => {
    onGetUserDoc();
  }, [user?.uid]);

  const onSubmit = async (values: TDocument) => {
    try {
      console.log('onSubmit', values);

      const identification_number = await encode(values.identification_number);
      const passport_number = await encode(values.passport_number);

      console.log('coded identification_number', identification_number);
      console.log('coded passport_number', passport_number);

      const newDocument = {
        ...values,
        identification_number,
        passport_number,
        user_id: user?.uid,
      } as TDocument;

      const response = await supabase.from('user-docs').insert([newDocument]).select().single();

      if (response.error) {
        console.error('error msg', response.error?.message);
        throw new Error(response.error?.message);
      }

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <Button LinkComponent={Link} to={'../'}>
        Назад
      </Button>
      <br />
      <br />
      <ProfileUserInfo />
      <br />
      {isAuthor &&
        (userDocument ? (
          <div>
            <Card>
              <Typography>№ {userDocument.identification_number}</Typography>
              <Typography>Номер {userDocument.passport_number}</Typography>
              <Typography>С {userDocument.issued_at}</Typography>
              <Typography>До {userDocument.expire_at}</Typography>
              <Typography>Выдан: {userDocument.issued_by}</Typography>
            </Card>
            <br />
            <Card>
              <Typography>Адрес</Typography>
              {Object.values(userDocument.address_live).map((item, inx) => (
                <Typography key={inx}>{item}</Typography>
              ))}
            </Card>
            <br />
          </div>
        ) : (
          <form>
            <Input name="passport_number" />
            <Input name="identification_number" />
            <Input name="issued_by" />
            <Input name="issued_at" type="datetime-local" />
            <Input name="expire_at" type="datetime-local" />
            <Button>Отправить</Button>
          </form>
        ))}
    </div>
  );
}
