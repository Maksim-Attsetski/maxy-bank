import { type FC } from 'react';
import { useNavigate } from 'react-router';

import { routes } from '../const';
import { AuthModal } from '../modals';
import { Card } from 'antd';

const CardApply: FC = () => {
  const navigate = useNavigate();
  return (
    <AuthModal>
      <Card className="w-max my-auto" onClick={() => navigate('/' + routes.add_card)}>
        <p>Оформить карту</p>
        <h2 className="text-center">+</h2>
      </Card>
    </AuthModal>
  );
};

export default CardApply;
