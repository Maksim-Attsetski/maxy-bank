import { type FC } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';

import { FaRegUser } from 'react-icons/fa';

import { authRoutes, routes } from '../const';

import { useAuth } from 'app/entities/auth';
import { useUsers } from 'app/entities/users';
import { useTheme } from '../hooks';
import { Button, Grid, Typography } from '@mui/material';

const headerLinks = [
  { label: 'Карты', to: routes.cards },
  { label: 'Вклады', to: routes.deposits },
  { label: 'Курсы валют', to: routes.currency_exchange },
];

const Header: FC = () => {
  const { isAuth, onLogout } = useAuth();
  const { user } = useUsers();
  const { theme, onToggleTheme } = useTheme();

  const navigate = useNavigate();
  let location = useLocation();

  return (
    <header>
      <Grid container justifyContent={'space-between'}>
        <Link to={'/'}>Maxy Bank</Link>
        <Grid container style={{ height: 'fit-content' }} alignItems={'center'}>
          {headerLinks.map((link) => (
            <NavLink to={link.to} key={link.to}>
              {link.label}
            </NavLink>
          ))}
        </Grid>
        <Grid container gap={2} alignItems={'center'}>
          {isAuth ? (
            <>
              <Grid container>
                <Typography fontWeight={500} fontSize={18}>
                  {user?.first_name}
                </Typography>
                <Button>
                  <Link to={routes.profile}></Link>
                  <FaRegUser />
                </Button>
              </Grid>
              <Button onClick={onLogout}>Выйти</Button>
            </>
          ) : (
            <>
              <Button onClick={() => navigate(authRoutes.login)}>Войти</Button>
            </>
          )}
          <Button onClick={() => onToggleTheme()}>{theme}</Button>
        </Grid>
      </Grid>
    </header>
  );
};

export default Header;
