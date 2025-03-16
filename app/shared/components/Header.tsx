import React, { type FC } from 'react';
import { Link, NavLink } from 'react-router';

import { FaRegUser } from 'react-icons/fa';

import { authRoutes, routes } from '../const';
import { Button, Flex } from '../ui';

import { useAuth } from 'app/entities/auth';
import { useUsers } from 'app/entities/users';

const headerLinks = [
  { text: 'Карты', to: routes.cards },
  { text: 'Вклады', to: routes.deposits },
  { text: 'Курсы валют', to: routes.currency_exchange },
];

const Header: FC = () => {
  const { isAuth, onLogout } = useAuth();
  const { user } = useUsers();

  return (
    <header className="container py-3">
      <Flex className="justify-between">
        <Link to={'/'}>
          <h4>Maxy Bank</h4>
        </Link>
        <Flex>
          {headerLinks.map(({ text, to }) => (
            <NavLink
              key={to}
              className={({ isActive }) => (isActive ? 'text-primary' : '')}
              to={to}
            >
              {text}
            </NavLink>
          ))}
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
