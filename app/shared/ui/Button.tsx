import React, {
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type FC,
  memo,
  type PropsWithChildren,
  useMemo,
} from 'react';
import { cls } from '../utils';

interface IProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const commonCls =
  'rounded-xl border-[1px] border-solid py-2 px-5 shadow-lg hover:scale-105 transition-all active:scale-90';
const primaryCls = 'border-transparent bg-primary text-text';
const secondaryCls = 'border-primary';

const Button: FC<IProps> = (btnProps) => {
  const className: string = useMemo(
    () =>
      cls(
        commonCls,
        btnProps?.variant === 'primary' ? primaryCls : secondaryCls,
        btnProps?.className ?? ''
      ),
    [btnProps?.variant]
  );
  return <button {...btnProps} className={className} />;
};

export default memo(Button);
