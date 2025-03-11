import React, { type FC } from 'react';
import { Button } from '../ui';

const Header: FC = () => {
  return (
    <header className="container py-3">
      <div className="flex justify-between items-center gap-2">
        <h3>Header</h3>
        <h3>Header</h3>
        <div className="flex gap-2">
          <Button variant="primary">Регистрация</Button>
          <Button>Войти</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
