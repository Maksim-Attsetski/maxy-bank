import { Link, useParams } from 'react-router';
import type { Route } from '../+types/home';
import { useUserDocuments, useUsers } from 'app/entities/users';
import { useEffect, useMemo } from 'react';
import { encode, supabase } from 'app/shared';
import { ProfileUserInfo } from 'app/widgets';
import { Button, Card, Form, Input } from 'antd';

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
  const paramsId = useParams()?.uid;

  const { user } = useUsers();
  const { userDocument, onGetUserDoc } = useUserDocuments();

  const isAuthor = useMemo(() => user?.uid === paramsId, [user?.uid, paramsId]);

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
      <Link to={'../'}>Назад</Link>
      <br />
      <br />
      <ProfileUserInfo />
      <div className="py-3" />
      {isAuthor &&
        (userDocument ? (
          <div>
            <Card>
              <p>№ {userDocument.identification_number}</p>
              <p>Номер {userDocument.passport_number}</p>
              <p>С {userDocument.issued_at}</p>
              <p>До {userDocument.expire_at}</p>
              <p>Выдан: {userDocument.issued_by}</p>
            </Card>
            <div className="py-3" />
            <Card>
              <p>Адрес</p>
              {Object.values(userDocument.address_live).map((item, inx) => (
                <p key={inx}>{item}</p>
              ))}
            </Card>
            <br />
          </div>
        ) : (
          <Form className="flex flex-col gap-2">
            <Input name="passport_number" />
            <Input name="identification_number" />
            <Input name="issued_by" />
            <Input name="issued_at" type="datetime-local" />
            <Input name="expire_at" type="datetime-local" />
            <Button>Отправить</Button>
          </Form>
        ))}
    </div>
  );
}
