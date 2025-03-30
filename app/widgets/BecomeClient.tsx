import { type FC } from 'react';

import { Button, Card } from '@mui/material';
import { Link } from 'react-router';

import { useAuth } from 'app/entities/auth';
import { authRoutes } from 'app/shared';

const BecomeClient: FC = () => {
  const { isAuth } = useAuth();
  return (
    !isAuth && (
      <Card>
        <h3>Стань клиентом всего за 10 минут без посещения офиса</h3>
        <br />
        <Button variant="contained">
          <Link to={authRoutes.signup}>Стать клиентом</Link>
        </Button>
      </Card>
    )
  );
};

export default BecomeClient;
