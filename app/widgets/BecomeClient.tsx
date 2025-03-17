import { useAuth } from 'app/entities/auth';
import { authRoutes, Button, Card } from 'app/shared';
import React, { type FC, memo } from 'react';

const BecomeClient: FC = () => {
  const { isAuth } = useAuth();
  return (
    isAuth && (
      <Card withScale={false}>
        <h3>Стань клиентом всего за 10 минут без посещения офиса</h3>
        <br />
        <Button variant="primary" to={authRoutes.signup}>
          Стать клиентом
        </Button>
      </Card>
    )
  );
};

export default BecomeClient;
