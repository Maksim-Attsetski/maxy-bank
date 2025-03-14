import { useParams } from 'react-router';
import type { Route } from '../+types/home';
import { useUserDocuments, useUsers } from 'app/entities/users';
import { useEffect, useMemo, useState } from 'react';
import { Formik } from 'formik';
import { Button, Card, decode, encode, Input, supabase } from 'app/shared';
import { ProfileUserInfo } from 'app/widgets';

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
      <br />
      <ProfileUserInfo />
      <div className="py-3" />
      {isAuthor &&
        (userDocument ? (
          <div>
            <Card withScale={false}>
              <p>№ {userDocument.identification_number}</p>
              <p>Номер {userDocument.passport_number}</p>
              <p>С {userDocument.issued_at}</p>
              <p>До {userDocument.expire_at}</p>
              <p>Выдан: {userDocument.issued_by}</p>
            </Card>
            <div className="py-3" />
            <Card withScale={false}>
              <p>Адрес</p>
              {Object.values(userDocument.address_live).map((item, inx) => (
                <p key={inx}>{item}</p>
              ))}
            </Card>
            <br />
          </div>
        ) : (
          <Formik
            initialValues={document}
            onSubmit={(values, { setSubmitting }) => {
              onSubmit(values);
              setSubmitting(false);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <Input
                  name="passport_number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.passport_number}
                />
                <Input
                  name="identification_number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.identification_number}
                />
                <Input
                  name="issued_by"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.issued_by}
                />
                <Input
                  name="issued_at"
                  type="datetime-local"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.issued_at}
                />
                <Input
                  name="expire_at"
                  type="datetime-local"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.expire_at}
                />
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Отправить
                </Button>
              </form>
            )}
          </Formik>
        ))}
    </div>
  );
}
