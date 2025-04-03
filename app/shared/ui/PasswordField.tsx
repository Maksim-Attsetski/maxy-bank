import { type FC, memo, type ReactNode, useState } from 'react';
// import { VisibilityOff, Visibility } from '@mui/icons-material';
import { TextField, IconButton, Typography, Grid } from '@mui/material';
import { useController, type UseControllerProps } from 'react-hook-form';

import InfoPopover from './InfoPopover';

interface IProps extends UseControllerProps {
  info?: ReactNode;
  bg?: 'box' | 'default' | 'paper';
  label?: string;
}

const defaultInfo = (
  <>
    <Typography>Пароль должен содержать не менее 8 символов</Typography>
    <Typography>латинского алфавита, включая верхний и нижний регистр,</Typography>
    <Typography>минимум одну цифру и специальный символ</Typography>
  </>
);

const PasswordField: FC<IProps> = ({ info = defaultInfo, bg = 'box', label, ...props }) => {
  const [isShow, setIsShow] = useState(false);
  const {
    field,
    fieldState: { error, invalid },
  } = useController(props);

  const toggleVisibility = () => {
    setIsShow(!isShow);
  };

  return (
    <TextField
      {...field}
      error={invalid}
      sx={{ width: '100%' }}
      helperText={error?.message}
      label={label ?? 'Пароль'}
      type={isShow ? 'text' : 'password'}
      variant="outlined"
      slotProps={{
        input: {
          sx: { backgroundColor: `background.${bg}` },
          endAdornment: (
            <Grid flexWrap="nowrap" container alignItems="center" justifyContent="end">
              <IconButton
                onClick={toggleVisibility}
                role="switch"
                aria-label={isShow ? 'Спрятать пароль' : 'Отобразить пароль'}
                aria-checked={isShow}
              >
                {/* {isShow ? <VisibilityOff /> : <Visibility />} */}
                visible
              </IconButton>
              {info && <InfoPopover info={info} />}
            </Grid>
          ),
        },
      }}
    />
  );
};

export default memo(PasswordField);
