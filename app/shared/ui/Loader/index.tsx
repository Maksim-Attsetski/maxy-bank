import { type FC, type PropsWithChildren } from 'react';

import { Grid, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

import Card from '../Card';

interface IProps extends PropsWithChildren {
  loading?: boolean;
}

const Loader: FC<IProps> = ({ children, loading = false }) => {
  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 0, y: -150 }}
          exit={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ duration: 0.45, type: 'spring', bounce: 0.4 }}
          style={{
            outline: 'none',
            position: 'fixed',
            top: 0,
            left: '50%',
            zIndex: 99999,
            translateX: '-50%',
          }}
        >
          <Grid sx={{ outline: 'none' }} container justifyContent="center" alignItems="center">
            <Card>{children ?? <Typography>Загрузка...</Typography>}</Card>
          </Grid>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
