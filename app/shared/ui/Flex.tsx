import React, { type DetailedHTMLProps, type FC, type HTMLAttributes, memo } from 'react';
import { cls } from '../utils';

const Flex: FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({
  ...props
}) => {
  return (
    <div
      {...props}
      className={cls('flex flex-nowrap gap-3 items-center ', props?.className ?? '')}
    />
  );
};

export default memo(Flex);
