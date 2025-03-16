import React, { type FC, memo } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

import { cls } from '../utils';

export interface ICardProps extends HTMLMotionProps<'div'> {
  withScale?: boolean;
  withoutBg?: boolean;
}

const card = 'p-5 rounded-lg bg-white shadow-xl';
const scale = ' cursor-pointer';
const common = ` cursor-default`;

const Card: FC<ICardProps> = ({ withScale = true, withoutBg = false, ...props }) => {
  return (
    <motion.div
      {...props}
      className={cls(withScale ? scale : common, props?.className ?? '', withoutBg ? '' : card)}
      whileHover={withScale ? { scale: 1.05 } : undefined}
    />
  );
};

export default memo(Card);
