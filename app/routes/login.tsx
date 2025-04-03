import { authRoutes, Input, supabase } from 'app/shared';
import type { Route } from './+types/home';
import { Link, useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';

import loginSvg from 'app/assets/login.svg';

import { Button, Typography, Grid, Divider, Link as MuiLink } from '@mui/material';
import { useUsers } from 'app/entities/users';
import { useForm } from 'react-hook-form';
import { loginSchema, type TLoginForm } from 'app/entities/auth';
import type { SyntheticEvent } from 'react';

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

export default function Login() {
  const { onGetUser } = useUsers();
  const navigate = useNavigate();

  const { control, getValues, trigger } = useForm<TLoginForm>({
    mode: 'all',
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const isFormValid = await trigger();

      if (!isFormValid) return;

      console.log('submit', isFormValid);
      const values = getValues();
      const res = await supabase.auth.signInWithPassword(values);
      console.log('res', res);

      if (res?.error) {
        throw new Error(res?.error?.message);
      }

      if (res?.data?.user) {
        await onGetUser(res.data?.user?.id);
        navigate(-1);
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
        <Grid size={6}>
          <form onSubmit={onSubmit}>
            <Grid container flexDirection={'column'} gap={2}>
              <Input label="Email" name="email" control={control} />
              <Input label="Пароль" name="password" control={control} />
              <Grid container justifyContent={'space-between'}>
                <Grid size={3}>
                  <Button sx={{ width: '100%' }} onClick={() => navigate('../')}>
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
