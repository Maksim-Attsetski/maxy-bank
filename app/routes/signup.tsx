import { Button, Input } from 'app/shared';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Регистрация | Maxy Bank' },
    { name: 'description', content: 'Регистрация в Maxy Bank' },
  ];
}

export default function Signup() {
  return (
    <div className="layout">
      <div className="container">
        <h2>Регистрация</h2>
        <br />
        <Button to={'/'}>Назад</Button>
      </div>
    </div>
  );
}
