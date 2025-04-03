import { type Dispatch, type FC, memo, type SetStateAction, useState } from 'react';
import type { TFullUserCard } from '../types';
import { Button, Input, Modal } from '@mui/material';

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  card: TFullUserCard;
  onSave: (v: string) => Promise<void>;
}

const ChangeNameModal: FC<IProps> = ({ card, open, setOpen, onSave }) => {
  const [name, setName] = useState(card?.name);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <>
        <h3>Изменить название</h3>
        <br />
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <br />
        <Button
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
