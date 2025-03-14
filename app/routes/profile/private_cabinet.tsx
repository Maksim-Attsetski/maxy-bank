import { Button, routes } from 'app/shared';
import type { Route } from '../+types/home';
import { useUsers } from 'app/entities/users';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Личный кабинет | Maxy Bank' },
    { name: 'description', content: 'Личный кабинет | Maxy Bank' },
  ];
}

export default function PrivateCabinet() {
  const { user } = useUsers();
  return (
    <div className="container">
      <Button to={-1}>Назад</Button>
      <br />
      <Button to={`/${routes.profile}/${user?.uid}`}>Перейти в личный кабинет</Button>
    </div>
  );
}
