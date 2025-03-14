import {
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type FC,
  memo,
  type MouseEventHandler,
  useMemo,
} from 'react';
import { cls } from '../utils';
import { useNavigate } from 'react-router';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface IProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: 'primary' | 'secondary';
  to?: string | number;
}

const commonCls =
  'rounded-xl border-[1px] border-solid py-1 px-5 font-medium shadow-lg w-max transition-all hover:bg-primary hover:text-text';
const primaryCls = 'border-transparent bg-primary text-text';
const secondaryCls = 'border-primary';

const Button: FC<IProps> = ({ variant, to, ...btnProps }) => {
  const navigate = useNavigate();

  const className: string = useMemo(
    () =>
      cls(commonCls, variant === 'primary' ? primaryCls : secondaryCls, btnProps?.className ?? ''),
    [variant]
  );

  const onButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    btnProps?.onClick?.(event);
    to && navigate(to as string);
  };

  return (
    <motion.button
      {...btnProps}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      className={className}
      onClick={onButtonClick}
    >
      {btnProps?.children}
    </motion.button>
  );
};

export default memo(Button);
