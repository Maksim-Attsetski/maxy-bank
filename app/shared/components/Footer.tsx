import React, { type FC } from 'react';
import { Link } from 'react-router';

const Footer: FC = () => {
  return (
    <footer>
      <p>Maxy Bank</p>
      <p>Инфо о сайте</p>
      <Link to={'/about'}>О нас</Link>
      <Link to={'/support'}>Поддержка</Link>
    </footer>
  );
};

export default Footer;
