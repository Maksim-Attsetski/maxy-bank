import { Button, Input } from 'app/shared';
import type { Route } from './+types/home';
import { Formik } from 'formik';
import { supabase } from 'app/shared/utils';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Авторизация | Maxy Bank' },
    { name: 'description', content: 'Авторизация в Maxy Bank' },
  ];
}

interface IAuthData {
  email: string;
  password: string;
}

export default function Login() {
  const onSubmit = async (values: IAuthData) => {
    try {
      console.log('submit');
      const res = await supabase.auth.signInWithPassword(values);
      console.log('res', res);

      if (res?.error) {
        throw new Error(res?.error?.message);
      }

      if (res?.data?.user) {
        const { user, session } = res.data;

        const userData = await supabase.from('users').select('*').eq('uid', user?.id).single();
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
        <h2>Авторизация</h2>
        <br />
        <Button to={'/'}>Назад</Button>
        <br />
        <br />
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={(values) => {
            const errors: { email?: string } = {};
            if (!values.email) {
              errors.email = 'Обязательно к заполнению';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Введите валидный адрес';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="E-mail"
              />
              <p>{errors.email && touched.email && errors.email}</p>
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Пароль"
              />
              <p>{errors.password && touched.password && errors.password}</p>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Продолжить
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
