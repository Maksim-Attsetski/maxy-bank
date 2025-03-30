import {
  type FC,
  memo,
  type MouseEventHandler,
  type PropsWithChildren,
  useCallback,
  useState,
} from 'react';

import { useAuth } from 'app/entities/auth';
import { authRoutes } from '../const';
import { Button, Modal, Grid, Typography } from '@mui/material';
import { Link } from 'react-router';

const AuthModal: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuth } = useAuth();

  const onCheckIsAuth: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    if (isAuth) return;
    setIsOpen(true);
  }, [isAuth]);

  return (
    <div onClick={onCheckIsAuth}>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <>
          <Typography variant="h4">Чтобы продолжить</Typography>
          <Typography variant="h4">Вам необходимо авторизоваться</Typography>
          <br />
          <Grid className="ml-auto">
            <Button onClick={() => setIsOpen(false)}>Закрыть</Button>
            <Button>
              <Link to={'/' + authRoutes.signup}>Перейти</Link>
            </Button>
          </Grid>
        </>
      </Modal>
      <div style={{ pointerEvents: isAuth ? 'all' : 'none' }}>{children}</div>
    </div>
  );
};

export default memo(AuthModal);
