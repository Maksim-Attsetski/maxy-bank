import React, { type FC } from 'react';
import { Link } from 'react-router';

import { authRoutes, routes } from '../const';
import { Button } from '../ui';

import { useAuth } from 'app/entities/auth';
import { useUsers } from 'app/entities/users';

const Header: FC = () => {
  const { isAuth, onLogout } = useAuth();
  const { user } = useUsers();

  return (
    <header className="container py-3">
      <div className="flex justify-between items-center gap-2">
        <div>
          <h4>Maxy Bank</h4>
        </div>
        <div className="flex gap-2">
          <Link to={routes.cards}>Карты</Link>
          <Link to={routes.deposits}>Вклады</Link>
          <Link to={routes.currency_exchange}>Курсы валют</Link>
        </div>
        {isAuth ? (
          <div className="flex gap-2 items-center">
            <div className="flex gap-2">
              <p>{user?.first_name}</p>
              <p>{user?.last_name}</p>
            </div>
            <Button onClick={onLogout} to="/">
              Выйти
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button to={authRoutes.signup} variant="primary">
              Регистрация
            </Button>
            <Button to={authRoutes.login}>Войти</Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
