import React, { type FC, memo } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

import { cls } from '../utils';

export interface ICardProps extends HTMLMotionProps<'div'> {
  withScale?: boolean;
  withoutBg?: boolean;
}

const card = 'p-5 rounded-lg bg-bg-paper shadow-lg';
const scale = ' cursor-pointer';
const common = ` cursor-default`;

const Card: FC<ICardProps> = ({ withScale = true, withoutBg = false, ...props }) => {
  return (
    <motion.div
      {...props}
      style={{
        boxShadow: withScale
          ? 'rgba(72, 72, 72, 0.2) 0px 10px 20px 0px'
          : 'rgba(72, 72, 72, 0.2) 0px 0px 15px -4px, rgba(72, 72, 72, 0.2) 0px 10px 20px 0px',
      }}
      className={cls(withScale ? scale : common, props?.className ?? '', withoutBg ? '' : card)}
      whileHover={withScale ? { scale: 1.05 } : undefined}
    />
  );
};

export default memo(Card);
