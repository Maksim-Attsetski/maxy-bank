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
import { Button, Modal, Row } from 'antd';
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
        <h4>Чтобы продолжить</h4>
        <h4>Вам необходимо авторизоваться</h4>
        <br />
        <Row className="ml-auto">
          <Button onClick={() => setIsOpen(false)}>Закрыть</Button>
          <Button>
            <Link to={'/' + authRoutes.signup}>Перейти</Link>
          </Button>
        </Row>
      </Modal>
      <div className={isAuth ? '' : 'pointer-events-none'}>{children}</div>
    </div>
  );
};

export default memo(AuthModal);
