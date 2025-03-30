import { authRoutes } from 'app/shared';
import type { Route } from './+types/home';
import { supabase } from 'app/shared/utils';

import loginSvg from 'app/assets/login.svg';
import { NavLink } from 'react-router';

import { Form, Input, Button, Row, Typography, Image, Col } from 'antd';
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
      <Typography.Title>Авторизация</Typography.Title>
      <br />
      <Row justify={'space-between'}>
        <Col span={8}>
          <Form initialValues={{ email: '', password: '' }} onFinish={onSubmit} name="login-form">
            <Form.Item layout="vertical" label="Email" name="vertical" rules={[{ required: true }]}>
              <Input type="email" placeholder="E-mail" />
            </Form.Item>
            <Form.Item
              layout="vertical"
              label="Пароль"
              name="password"
              rules={[{ required: true }]}
            >
              <Input variant="outlined" type="password" placeholder="Пароль" />
            </Form.Item>
            <Button>Назад</Button>
            <Button variant="filled" style={{ backgroundColor: 'colorPrimary' }}>
              Продолжить
            </Button>
            <hr className="mt-2 w-3/4 mx-auto" />
            <Typography>
              Нет аккаунта?
              <NavLink to={'/' + authRoutes.signup}>Перейти</NavLink>
            </Typography>
          </Form>
        </Col>

        <Col span={8}>
          <Image alt="login" preview={false} src={loginSvg} />
        </Col>
      </Row>
    </div>
  );
}
