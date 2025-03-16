import { type FC, memo, type PropsWithChildren, type ReactNode, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Flex from './Flex';

interface IProps extends PropsWithChildren {
  childrenKey: string;
  title: string | ReactNode;
}

const Accordion: FC<IProps> = ({ children, childrenKey, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Flex
        className="w-full cursor-pointer justify-between"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h3>{title}</h3>
        <div className="border-primary border-2 border-solid rounded-full p-3">
          {isOpen ? '➖' : '➕'}
        </div>
      </Flex>
      <AnimatePresence initial={false} mode="popLayout">
        {isOpen && (
          <>
            <motion.div
              animate="animate"
              initial="initial"
              exit="initial"
              variants={{
                initial: { marginTop: 0, marginBottom: 0 },
                animate: { marginTop: 16, marginBottom: 16 },
              }}
            />
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0, zIndex: -100 }}
              transition={{ duration: 0.3 }}
              key={childrenKey}
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(Accordion);
