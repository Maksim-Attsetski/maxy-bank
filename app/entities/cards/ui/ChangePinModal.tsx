import React, { type Dispatch, type FC, memo, type SetStateAction, useState } from 'react';

import { Button, Input, Modal } from 'app/shared';
import type { TFullUserCard } from '../types';

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  card: TFullUserCard;
  onSave: (v: string) => Promise<void>;
}

const ChangeNameModal: FC<IProps> = ({ card, open, setOpen, onSave }) => {
  const [pin, setPin] = useState('' + card?.pin);

  return (
    <Modal open={open} setOpen={setOpen}>
      <>
        <h3>Изменить pin код</h3>
        <br />
        <Input value={pin} onChangeText={setPin} />
        <br />
        <br />
        <Button
          variant="primary"
          onClick={() => {
            onSave(pin);
            setOpen(false);
          }}
        >
          Сохранить
        </Button>
      </>
    </Modal>
  );
};

export default memo(ChangeNameModal);
