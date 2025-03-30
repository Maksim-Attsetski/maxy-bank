import { type Dispatch, type FC, memo, type SetStateAction, useState } from 'react';

import { Button, Input, Modal } from '@mui/material';
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
    <Modal open={open} onClose={() => setOpen(false)}>
      <>
        <h3>Изменить pin код</h3>
        <br />
        <Input value={pin} onChange={(e) => setPin(e.target.value)} />
        <br />
        <br />
        <Button
          variant="contained"
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
