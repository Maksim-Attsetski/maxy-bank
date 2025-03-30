import { type FC } from 'react';
import { useNavigate } from 'react-router';
import { Card, Typography } from '@mui/material';

import { routes } from '../const';
import { AuthModal } from '../modals';

const CardApply: FC = () => {
  const navigate = useNavigate();
  return (
    <AuthModal>
      <Card className="w-max my-auto" onClick={() => navigate('/' + routes.add_card)}>
        <Typography>Оформить карту</Typography>
        <Typography variant="h2" className="text-center">
          +
        </Typography>
      </Card>
    </AuthModal>
  );
};

export default CardApply;
