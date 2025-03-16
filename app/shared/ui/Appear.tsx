import { type FC, memo, type PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

const Appear: FC<PropsWithChildren> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};

export default memo(Appear);
