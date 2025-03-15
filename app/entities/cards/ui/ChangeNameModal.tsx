import { Button, Input, Modal } from 'app/shared';
import React, { type Dispatch, type FC, memo, type SetStateAction, useState } from 'react';
import type { TFullUserCard } from '../types';

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  card: TFullUserCard;
  onSave: (v: string) => Promise<void>;
}

const ChangeNameModal: FC<IProps> = ({ card, open, setOpen, onSave }) => {
  const [name, setName] = useState(card?.name);

  return (
    <Modal open={open} setOpen={setOpen}>
      <>
        <h3>Изменить название</h3>
        <br />
        <Input value={name} onChangeText={setName} />
        <br />
        <br />
        <Button
          variant="primary"
          onClick={() => () => {
            onSave(name);
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
