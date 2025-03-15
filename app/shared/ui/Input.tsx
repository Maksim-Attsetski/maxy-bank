import {
  type DetailedHTMLProps,
  type Dispatch,
  type FC,
  type InputHTMLAttributes,
  memo,
  type SetStateAction,
  useMemo,
} from 'react';

import { cls } from '../utils';

interface IProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  variant?: 'primary' | 'secondary';
  onChangeText?: Dispatch<SetStateAction<string>>;
}

const commonCls = 'rounded-xl border-[1px] border-solid py-2 px-5 shadow-lg';
const primaryCls = 'border-transparent bg-primary text-text';
const secondaryCls = 'border-primary';

const Input: FC<IProps> = ({ variant, onChangeText, onChange, ...inputProps }) => {
  const className: string = useMemo(
    () =>
      cls(
        commonCls,
        variant === 'primary' ? primaryCls : secondaryCls,
        inputProps?.className ?? ''
      ),
    [variant]
  );

  return (
    <input
      {...inputProps}
      className={className}
      onChange={(e) => (onChange ? onChange(e) : onChangeText?.(e.target.value))}
    />
  );
};

export default memo(Input);
