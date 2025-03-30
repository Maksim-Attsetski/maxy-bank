import { type FC } from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router';

const Footer: FC = () => {
  return (
    <footer>
      <Typography>Maxy Bank</Typography>
      <Typography>Инфо о сайте</Typography>
      <Link to={'/about'}>О нас</Link>
      <Link to={'/support'}>Поддержка</Link>
    </footer>
  );
};

export default Footer;
