import { type FC, memo } from 'react';
import { Box, type BoxProps } from '@mui/material';
import { motion } from 'framer-motion';

import './Card.css';

interface IProps extends BoxProps<typeof motion.div> {
  withScale?: boolean;
}

const Card: FC<IProps> = ({ withScale = true, sx = {}, ...props }) => {
  return (
    <Box
      {...props}
      component={motion.div}
      sx={{ ...sx, backgroundColor: 'background.paper' }}
      whileHover={withScale ? { scale: 1.05 } : undefined}
      className={`ui-Card-i card ${withScale ? '' : 'common'} ${props?.className ?? ''}`}
    />
  );
};

export default memo(Card);
