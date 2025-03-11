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

interface IProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  to?: string;
}

const commonCls =
  'rounded-xl border-[1px] border-solid py-2 px-5 shadow-lg hover:scale-105 transition-all active:scale-90';
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
    to && navigate(to);
  };

  return (
    <button {...btnProps} className={className} onClick={onButtonClick}>
      {btnProps?.children}
    </button>
  );
};

export default memo(Button);
