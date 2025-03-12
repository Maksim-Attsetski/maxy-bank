import { Button, Input } from '~/shared';
import type { Route } from './+types/home';
import { Formik } from 'formik';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Регистрация | Maxy Bank' },
    { name: 'description', content: 'Регистрация в Maxy Bank' },
  ];
}

export default function Signup() {
  return (
    <div className="container">
      <h2>Регистрация</h2>
      <br />
      <Button to={'/'}>Назад</Button>
    </div>
  );
}
