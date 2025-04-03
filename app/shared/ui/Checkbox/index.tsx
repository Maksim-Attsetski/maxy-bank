import { type FC, memo, type ReactNode } from 'react';
import { FormControlLabel, Checkbox as MuiCheckbox, Typography } from '@mui/material';
import { useController, type UseControllerProps } from 'react-hook-form';

import s from './Checkbox.module.scss';

interface IProps extends UseControllerProps {
  value: boolean;
  label: ReactNode;
  fontSize?: 'small' | 'medium';
  onChange?: (checked: boolean) => void;
  checked?: boolean;
}

const Checkbox: FC<IProps> = ({
  fontSize = 'small',
  checked,
  onChange,
  label,
  value,
  ...props
}) => {
  const controller = useController(props);

  return (
    <>
      <FormControlLabel
        {...controller?.field}
        className={s.checkbox}
        control={
          <MuiCheckbox
            value={value}
            checked={checked ?? Boolean(controller.field.value)}
            onChange={(_, checked) => {
              controller?.field.onChange(checked);
              onChange?.(checked);
            }}
          />
        }
        label={
          <Typography textAlign="left" fontSize={fontSize === 'small' ? 14 : 16}>
            {label}
          </Typography>
        }
      />
      {controller?.fieldState?.error && (
        <span className={s.error}>{controller?.fieldState?.error?.message}</span>
      )}
    </>
  );
};

export default memo(Checkbox);
