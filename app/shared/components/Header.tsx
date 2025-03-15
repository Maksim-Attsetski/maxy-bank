import React, { type FC } from 'react';
import { Link } from 'react-router';

import { FaRegUser } from 'react-icons/fa';

import { authRoutes, routes } from '../const';
import { Button, Flex } from '../ui';

import { useAuth } from 'app/entities/auth';
import { useUsers } from 'app/entities/users';

const Header: FC = () => {
  const { isAuth, onLogout } = useAuth();
  const { user } = useUsers();

  return (
    <header className="container py-3">
      <Flex className="justify-between">
        <div>
          <h4>Maxy Bank</h4>
        </div>
        <Flex>
          <Link to={routes.cards}>Карты</Link>
          <Link to={routes.deposits}>Вклады</Link>
          <Link to={routes.currency_exchange}>Курсы валют</Link>
        </Flex>
        {isAuth ? (
          <Flex>
            <Flex>
              <p className="font-medium text-lg">{user?.first_name}</p>
              <Button variant="primary" to={routes.profile} className="py-2 px-2 rounded-full">
                <FaRegUser />
              </Button>
            </Flex>
            <Button onClick={onLogout} to="/">
              Выйти
            </Button>
          </Flex>
        ) : (
          <div className="flex gap-2">
            <Button to={authRoutes.signup} variant="primary">
              Регистрация
            </Button>
            <Button to={authRoutes.login}>Войти</Button>
          </div>
        )}
      </Flex>
    </header>
  );
};

export default Header;
