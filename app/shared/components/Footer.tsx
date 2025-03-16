import React, { type FC } from 'react';
import { Link } from 'react-router';

const Footer: FC = () => {
  return (
    <footer>
      <p>Maxy Bank</p>
      <p>Инфо о сайте</p>
      <Link className="text-text" to={'/about'}>
        О нас
      </Link>
      <Link className="text-text" to={'/support'}>
        Поддержка
      </Link>
    </footer>
  );
};

export default Footer;
