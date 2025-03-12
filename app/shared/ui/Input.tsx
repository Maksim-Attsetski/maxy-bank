import { type DetailedHTMLProps, type FC, type InputHTMLAttributes, memo, useMemo } from 'react';

import { cls } from '../utils';

interface IProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  variant?: 'primary' | 'secondary';
}

const commonCls = 'rounded-xl border-[1px] border-solid py-2 px-5 shadow-lg';
const primaryCls = 'border-transparent bg-primary text-text';
const secondaryCls = 'border-primary';

const Input: FC<IProps> = ({ variant, ...inputProps }) => {
  const className: string = useMemo(
    () =>
      cls(
        commonCls,
        variant === 'primary' ? primaryCls : secondaryCls,
        inputProps?.className ?? ''
      ),
    [variant]
  );

  return <input {...inputProps} className={className} />;
};

export default memo(Input);
