import { authRoutes } from 'app/shared';
import { NavLink } from 'react-router';
import type { Route } from './+types/home';

import { supabase } from 'app/shared/utils';
import type { IUser } from 'app/entities/users';

import { Form, Input, Button, Row } from 'antd';

import loginSvg from 'app/assets/login.svg';

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
      <div className="container">
        <br />
        <h2>Регистрация</h2>
        <br />
        <Row className="justify-between flex-col sm:flex-row">
          {/* errors.email = isEmailValid(values.email);
              errors.first_name = isNameValid(values.first_name);
              errors.last_name = isNameValid(values.last_name); */}

          {/* isExist<IForm | FormikErrors<IForm>>(
                ['password', 'birthed_at', 'gender'],
                values,
                errors
              ); */}
          <Form>
            <Input type="email" name="email" placeholder="E-mail" />
            <Input type="password" name="password" placeholder="Пароль" />
            <Input name="first_name" placeholder="Имя" />
            <Input name="last_name" placeholder="Фамилия" />
            <Input name="middle_name" placeholder="Отчество" />
            <Input type="date" name="birthed_at" placeholder="Дата рождения" />
            {/* <Toggle
              placeholder="Пол"
              options={[
                { label: 'Мужской', value: 'MALE' },
                { label: 'Женский', value: 'FEMALE' },
              ]}
              name="gender"
            /> */}
            <Row>
              <Button className="flex-1/4" >
                Назад
              </Button>
              <Button className="flex-1/2" >
                Продолжить
              </Button>
            </Row>
            <hr className="mt-2 w-3/4 mx-auto" />
            <p className="text-center text-lg">
              Нет аккаунта?
              <NavLink className="text-primary ml-0.5" to={'/' + authRoutes.signup}>
                Перейти
              </NavLink>
            </p>
          </Form>

          <img className="w-1/2 sm:w-1/3" src={loginSvg} />
        </Row>
      </div>
    </div>
  );
}
