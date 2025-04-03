import { authRoutes } from 'app/shared';
import type { Route } from './+types/home';
import { supabase } from 'app/shared/utils';

import loginSvg from 'app/assets/login.svg';
import { Link } from 'react-router';

import { Button, Typography, Grid, Divider, TextField, Link as MuiLink } from '@mui/material';
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
      <Grid container spacing={2} justifyContent={'space-between'}>
        {/* <Form initialValues={{ email: '', password: '' }} onFinish={onSubmit} name="login-form"> */}
        <Grid size={6}>
          <form name="login-form">
            <Grid container flexDirection={'column'} gap={2}>
              <TextField sx={{ width: '100%' }} type="email" placeholder="E-mail" />
              <TextField sx={{ width: '100%' }} type="password" placeholder="Пароль" />
              <Grid container justifyContent={'space-between'}>
                <Grid size={3}>
                  <Button sx={{ width: '100%' }} LinkComponent={Link} to={'../'}>
                    Назад
                  </Button>
                </Grid>
                <Grid size={7}>
                  <Button sx={{ width: '100%' }} variant="contained" type="submit">
                    Продолжить
                  </Button>
                </Grid>
              </Grid>
              <Divider />
              <Typography textAlign={'center'}>
                Нет аккаунта?
                <MuiLink component={Link} style={{ marginLeft: 3 }} to={'/' + authRoutes.signup}>
                  Перейти
                </MuiLink>
              </Typography>
            </Grid>
          </form>
        </Grid>
        <Grid size={4}>
          <img alt="login" src={loginSvg} />
        </Grid>
      </Grid>
    </div>
  );
}
