import React, { type FC } from 'react';
import { Button } from '../ui';
import { Link } from 'react-router';
import { authRoutes, routes } from '../const';

const Header: FC = () => {
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
        <div className="flex gap-2">
          <Button to={authRoutes.signup} variant="primary">
            Регистрация
          </Button>
          <Button to={authRoutes.login}>Войти</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
