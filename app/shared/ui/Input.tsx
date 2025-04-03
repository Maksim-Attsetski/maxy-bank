import { type FC, memo, type ReactNode } from 'react';
import { Grid, TextField, type TextFieldProps } from '@mui/material';
import { useController, type UseControllerProps, useFormContext } from 'react-hook-form';

import InfoPopover from './InfoPopover';

interface IProps extends UseControllerProps {
  slotProps?: TextFieldProps['slotProps'];
  info?: ReactNode;
  bg?: 'box' | 'default' | 'paper';
  label?: string;
}

const CommonTextField: FC<IProps> = ({ slotProps, info, label, ...props }) => {
  const isOptional = props.rules?.required === false;
  const {
    field,
    fieldState: { error, invalid },
  } = useController(props);
  const formContext = useFormContext();

  if (isOptional && field.value === '' && formContext && invalid) {
    formContext.clearErrors(field.name);
  }

  return (
    <TextField
      error={invalid}
      helperText={error?.message}
      {...field}
      sx={{ width: '100%' }}
      slotProps={{
        ...slotProps,
        input: info
          ? {
              ...slotProps?.input,
              sx: { backgroundColor: `background.${props?.bg ?? 'box'}` },
              endAdornment: info && (
                <Grid container alignItems="center" justifyContent="end">
                  <InfoPopover info={info} />
                </Grid>
              ),
            }
          : undefined,
      }}
      label={label + (isOptional ? '' : '*')}
      variant="outlined"
    />
  );
};

export default memo(CommonTextField);
