import { motion, type HTMLMotionProps } from 'framer-motion';
import React, { type FC, memo } from 'react';
import { cls } from '../utils';

interface IProps extends HTMLMotionProps<'div'> {
  withScale?: boolean;
}

const card = 'p-5 rounded-lg shadow-xl bg-white';
const scale = ' cursor-pointer';
const common = ` cursor-default`;

const Card: FC<IProps> = ({ withScale = true, ...props }) => {
  return (
    <motion.div
      {...props}
      className={cls(card, withScale ? scale : common, props?.className ?? '')}
      whileHover={withScale ? { scale: 1.05 } : undefined}
    />
  );
};

export default memo(Card);
