import { Layout, theme } from 'antd';
import { type FC } from 'react';
import { Link } from 'react-router';

const Footer: FC = () => {
  const {
    token: { colorText, colorBgBase },
  } = theme.useToken();
  return (
    <Layout.Footer style={{ backgroundColor: colorBgBase, color: colorText }}>
      <p>Maxy Bank</p>
      <p>Инфо о сайте</p>
      <Link className="text-text" to={'/about'}>
        О нас
      </Link>
      <Link className="text-text" to={'/support'}>
        Поддержка
      </Link>
    </Layout.Footer>
  );
};

export default Footer;
