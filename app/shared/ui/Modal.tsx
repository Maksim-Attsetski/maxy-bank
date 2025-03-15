import React, {
  type Dispatch,
  type FC,
  memo,
  type PropsWithChildren,
  type SetStateAction,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Card from './Card';

interface IProps extends PropsWithChildren {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Modal: FC<IProps> = ({ open, setOpen, children }) => {
  return (
    <AnimatePresence>
      {open && (
        <div
          style={{ backgroundColor: 'rgba(0 0 0 / 0.5)' }}
          className="fixed inset-0 z-50"
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-1/2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Card withScale={false} onClick={(e) => e.stopPropagation()}>
              {children}
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default memo(Modal);
