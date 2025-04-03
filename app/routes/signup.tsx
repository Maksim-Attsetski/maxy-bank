import { authRoutes } from 'app/shared';
import type { Route } from './+types/home';

import { supabase } from 'app/shared/utils';
import type { IUser } from 'app/entities/users';

import {
  Button,
  Typography,
  Grid,
  Divider,
  TextField,
  Link as MuiLink,
  Input,
} from '@mui/material';

import loginSvg from 'app/assets/login.svg';
import { Link } from 'react-router';
import DatePicker from 'app/shared/ui/DatePicker';
import { useForm } from 'react-hook-form';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Регистрация | Maxy Bank' },
    { name: 'description', content: 'Регистрация в Maxy Bank' },
  ];
}

interface IForm {
  email: string;
  password: string;
  birthed_at: number | string;
  first_name: string;
  gender: 'MALE' | 'FEMALE';
  last_name: string;
  middle_name?: string;
}

const defaultForm = {
  birthed_at: Date.now(),
  email: 'test123@gmail.com',
  first_name: 'Туст',
  last_name: 'Туст',
  middle_name: '',
  gender: 'MALE',
  password: 'test12334T',
} as IForm;

export default function Signup() {
  const { control } = useForm();

  const onSubmit = async (values: IForm) => {
    try {
      console.log('submit');
      const res = await supabase.auth.signUp(values);
      console.log('res', res);

      if (res?.error) {
        throw new Error(res?.error?.message);
      }

      if (res?.data?.user) {
        const newUser = {
          avatar: null,
          birthed_at: values.birthed_at,
          email: values.email,
          first_name: values.first_name,
          gender: values.gender,
          last_name: values.last_name,
          middle_name: values.middle_name,
          uid: res?.data?.user?.id,
        } as IUser;
        const userData = await supabase.from('users').insert(newUser).select().single();
        if (userData.data) {
          console.log(userData.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="layout">
      <Typography variant="h2">Регистрация</Typography>
      <br />
      <Grid container spacing={2} justifyContent={'space-between'}>
        {/* <Form initialValues={{ email: '', password: '' }} onFinish={onSubmit} name="login-form"> */}
        <Grid size={6}>
          <form name="login-form">
            <Grid container flexDirection={'column'} gap={2}>
              <TextField sx={{ width: '100%' }} type="email" placeholder="E-mail" />
              <TextField sx={{ width: '100%' }} type="password" placeholder="Пароль" />
              <TextField sx={{ width: '100%' }} placeholder="Имя" />
              <TextField sx={{ width: '100%' }} placeholder="Фамилия" />
              <TextField sx={{ width: '100%' }} placeholder="Отчество" />
              <Input type="date" />
              <DatePicker controller={{ name: 'birth_at', control }} label="Дата рождения" />
              {/* <Input name="first_name" placeholder="Имя" />
      <Input name="last_name" placeholder="Фамилия" />
      <Input name="middle_name" placeholder="Отчество" />
      <Input type="date" name="birthed_at" placeholder="Дата рождения" /> */}
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
