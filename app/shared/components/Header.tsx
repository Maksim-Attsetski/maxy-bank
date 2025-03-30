import { useMemo, type FC } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

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

  const activeLink = useMemo(
    () => headerLinks.find(({ to }) => location.pathname.includes(to)),
    [location.pathname]
  );

  return (
    <header style={{ padding: '12px 20px' }}>
      <Grid container justifyContent={'space-between'}>
        <Typography color="primary" variant="h5">
          <Link to={'/'}>Maxy Bank</Link>
        </Typography>
        <Grid container alignItems={'center'} gap={2}>
          {headerLinks.map((link) => (
            <Typography
              key={link.to}
              color={activeLink?.to === link.to ? 'primary' : 'textPrimary'}
            >
              <Link to={link.to}>{link.label}</Link>
            </Typography>
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
