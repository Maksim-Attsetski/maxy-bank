import { authRoutes } from 'app/shared';
import type { Route } from './+types/home';
import { supabase } from 'app/shared/utils';

import loginSvg from 'app/assets/login.svg';
import { NavLink } from 'react-router';

import { Input, Button, Typography, Grid } from '@mui/material';
import { useUsers } from 'app/entities/users';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Авторизация | Maxy Bank' },
    { name: 'description', content: 'Авторизация в Maxy Bank' },
  ];
}

interface IForm {
  email: string;
  password: string;
}

// const validateForm = (values: IForm): FormikErrors<IForm> => {
//   const errors: IForm = { email: '', password: '' };
//   if (!values.email) {
//     errors.email = 'Обязательно к заполнению';
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
//     errors.email = 'Введите валидный адрес';
//   }

//   if (!values.password) {
//     errors.password = 'Обязательно к заполнению';
//   }
//   return errors;
// };

export default function Login() {
  const { onGetUser } = useUsers();
  const onSubmit = async (values: IForm) => {
    try {
      console.log('submit');
      const res = await supabase.auth.signInWithPassword(values);
      console.log('res', res);

      if (res?.error) {
        throw new Error(res?.error?.message);
      }

      if (res?.data?.user) {
        await onGetUser(res.data?.user?.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="layout">
      <Typography variant="h2">Авторизация</Typography>
      <br />
      <Grid container justifyContent={'space-between'}>
        {/* <Form initialValues={{ email: '', password: '' }} onFinish={onSubmit} name="login-form"> */}
        <form name="login-form">
          <Input type="email" placeholder="E-mail" />
          <Input type="password" placeholder="Пароль" />
          <Button>Назад</Button>
          <Button style={{ backgroundColor: 'colorPrimary' }}>Продолжить</Button>
          <hr className="mt-2 w-3/4 mx-auto" />
          <Typography>
            Нет аккаунта?
            <NavLink to={'/' + authRoutes.signup}>Перейти</NavLink>
          </Typography>
        </form>

        <img alt="login" src={loginSvg} />
      </Grid>
    </div>
  );
}
