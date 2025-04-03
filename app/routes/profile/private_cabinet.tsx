import { routes } from 'app/shared';
import type { Route } from '../+types/home';
import { useUsers } from 'app/entities/users';
import { useNavigate } from 'react-router';
import { Button } from '@mui/material';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Личный кабинет | Maxy Bank' },
    { name: 'description', content: 'Личный кабинет | Maxy Bank' },
  ];
}

export default function PrivateCabinet() {
  const navigate = useNavigate();
  const { user } = useUsers();
  return (
    <div className="container">
      <Button onClick={() => navigate(-1)}>Назад</Button>
      <br />
      <Button onClick={() => navigate(`/${routes.profile}/${user?.uid}`)}>
        Перейти в личный кабинет
      </Button>
    </div>
  );
}
