import { Button, type ButtonBaseProps } from '@mui/material';
import type { FC } from 'react';
import { Link } from 'react-router';

const BackButton: FC<ButtonBaseProps> = (props) => {
  return (
    <Button {...props} LinkComponent={Link} to={-1}>
      Назад
    </Button>
  );
};

export default BackButton;
