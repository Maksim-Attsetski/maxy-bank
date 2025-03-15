import {
  type FC,
  memo,
  type MouseEventHandler,
  type PropsWithChildren,
  useCallback,
  useState,
} from 'react';

import { useAuth } from 'app/entities/auth';
import { Button, Flex, Modal } from '../ui';
import { authRoutes } from '../const';

const AuthModal: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuth } = useAuth();

  const onCheckIsAuth: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    if (isAuth) return;
    setIsOpen(true);
  }, [isAuth]);

  return (
    <div onClick={onCheckIsAuth}>
      <Modal open={isOpen} setOpen={setIsOpen}>
        <h4>Чтобы продолжить</h4>
        <h4>Вам необходимо авторизоваться</h4>
        <br />
        <Flex className="ml-auto">
          <Button onClick={() => setIsOpen(false)}>Закрыть</Button>
          <Button variant="primary" to={authRoutes.signup}>
            Перейти
          </Button>
        </Flex>
      </Modal>
      <div className={isAuth ? '' : 'pointer-events-none'}>{children}</div>
    </div>
  );
};

export default memo(AuthModal);
