import { useMemo, type FC } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

import { FaRegUser } from 'react-icons/fa';

import { authRoutes, routes } from '../const';

import { useAuth } from 'app/entities/auth';
import { useUsers } from 'app/entities/users';
import { useTheme } from '../hooks';
import { Button, Col, Layout, Menu, Row } from 'antd';
import type { ItemType, MenuItemType } from 'antd/es/menu/interface';

const headerLinks = [
  { label: 'Карты', to: routes.cards },
  { label: 'Вклады', to: routes.deposits },
  { label: 'Курсы валют', to: routes.currency_exchange },
];

type TLink = ItemType<MenuItemType>;

const Header: FC = () => {
  const { isAuth, onLogout } = useAuth();
  const { user } = useUsers();
  const { theme, onToggleTheme } = useTheme();

  const navigate = useNavigate();
  let location = useLocation();

  const items: TLink[] = useMemo(
    () =>
      headerLinks.map(
        ({ label, to }) => ({ key: to, label, onClick: () => navigate(to) }) as TLink
      ),
    []
  );

  const activeLink = useMemo(
    () => headerLinks.find((link) => location.pathname.includes(link?.to as string)),
    [items]
  );

  return (
    <Layout.Header>
      <Row justify={'space-between'}>
        <Link to={'/'}>Maxy Bank</Link>
        <Row style={{ height: 'fit-content' }} align={'middle'}>
          <Menu
            theme={'dark'}
            mode="horizontal"
            defaultSelectedKeys={[activeLink?.to ?? '']}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Row>
        <Row align={'middle'} gutter={20}>
          <Col>
            {isAuth ? (
              <>
                <Row>
                  <p className="font-medium text-lg">{user?.first_name}</p>
                  <Button className="py-2 px-2 rounded-full">
                    <Link to={routes.profile}></Link>
                    <FaRegUser />
                  </Button>
                </Row>
                <Button onClick={onLogout}>Выйти</Button>
              </>
            ) : (
              <>
                <Button type="primary" onClick={() => navigate(authRoutes.login)}>
                  Войти
                </Button>
              </>
            )}
          </Col>
          <Col>
            <Button onClick={() => onToggleTheme()}>{theme}</Button>
          </Col>
        </Row>
      </Row>
    </Layout.Header>
  );
};

export default Header;
