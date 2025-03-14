import { useParams } from 'react-router';
import type { Route } from '../+types/home';
import { useUsers } from 'app/entities/users';
import { useMemo } from 'react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Личный кабинет | Maxy Bank' },
    { name: 'description', content: 'Личный кабинет | Maxy Bank' },
  ];
}

export default function Profile() {
  const paramsId = useParams()?.uid;

  const { user } = useUsers();

  const isAuthor = useMemo(() => user?.id === paramsId, [user?.id, paramsId]);

  return (
    <div className="container">
      <h3>Профиль</h3>
      <br />
      <p>{JSON.stringify(paramsId)}</p>
      <div>
        <p>
          {user?.last_name} {user?.first_name} {user?.middle_name}
        </p>
        <br />
        <p>{user?.gender}</p>
        <p>{user?.birthed_at}</p>
      </div>
    </div>
  );
}
