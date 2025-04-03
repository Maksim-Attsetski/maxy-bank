import { type FC, memo, type ReactNode } from 'react';
import { type SxProps, type Theme, ToggleButton, Typography } from '@mui/material';
import type { FieldError } from 'react-hook-form';

import s from './Toggle.module.scss';
import { useTheme } from 'app/shared/hooks';

type TValue = number | string;

interface IOption {
  value: TValue;
  label: ReactNode;
}

interface IProps {
  value: TValue;
  setValue: (value: TValue) => void;
  options: IOption[];
  sx?: SxProps<Theme>;
  error?: FieldError;
}

const Toggle: FC<IProps> = ({ options: initValues, setValue, value, sx, error }) => {
  const isLight = useTheme().theme === 'light';

  return (
    <div>
      {initValues.map((item) => (
        <ToggleButton
          key={item.value}
          sx={sx}
          defaultValue={value ?? initValues[0]?.value}
          selected={item.value === value}
          classes={{ selected: isLight ? s.selected : '' }}
          onClick={() => setValue(item.value)}
          value={item.value}
        >
          {item.label}
        </ToggleButton>
      ))}
      <Typography color="error" fontSize={12}>
        {error?.message}
      </Typography>
    </div>
  );
};

export default memo(Toggle);
