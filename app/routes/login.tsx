import { authRoutes } from 'app/shared';
import type { Route } from './+types/home';
import { supabase } from 'app/shared/utils';

import loginSvg from 'app/assets/login.svg';
import { NavLink } from 'react-router';

import { Form, Input, Button, Row } from 'antd';

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
  const onSubmit = async (values: IForm) => {
    try {
      console.log('submit');
      const res = await supabase.auth.signInWithPassword(values);
      console.log('res', res);

      if (res?.error) {
        throw new Error(res?.error?.message);
      }

      if (res?.data?.user) {
        const userData = await supabase
          .from('users')
          .select('*')
          .eq('uid', res.data?.user?.id)
          .single();
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
        <h2>Авторизация</h2>
        <br />
        <Row className="justify-between flex-col sm:flex-row">
          <Form
            initialValues={{ email: '', password: '' }}
            // onSubmit={onSubmit}
          >
                <Input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Пароль"
                />
                <Button className="flex-1/2">
                  Назад
                </Button>
                <Button
                  className="flex-1/2"
                >
                  Продолжить
                </Button>
                {/* </Flex> */}
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
