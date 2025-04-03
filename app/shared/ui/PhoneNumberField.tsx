import { type FC, memo, type ReactNode } from 'react';

import { Grid, TextField } from '@mui/material';
import { useController, type UseControllerProps } from 'react-hook-form';

import SuccessMark from './SuccessMark';
import InfoPopover from './InfoPopover';

interface IProps extends UseControllerProps {
  info?: ReactNode;
  bg?: 'box' | 'default' | 'paper';
  label?: string;
}

const PhoneNumberField: FC<IProps> = (props) => {
  const isOptional = props.rules?.required === false;
  const {
    field,
    fieldState: { error, invalid },
  } = useController({ ...props, rules: { ...props.rules, pattern: /[0-9]*/ } });

  return (
    // <ReactInputMask
    //   {...field}
    //   value={field.value as string}
    //   mask="+7(999)999-99-99"
    //   disabled={props?.disabled}
    // >
    // </ReactInputMask>
    <TextField
      error={invalid}
      helperText={error?.message}
      type="text"
      disabled={props?.disabled}
      label={(props?.label ?? 'Номер телефона') + (isOptional ? '' : '*')}
      variant="outlined"
      sx={{ width: '100%' }}
      slotProps={{
        input: {
          sx: { backgroundColor: `background.${props?.bg ?? 'box'}` },
          endAdornment: (
            <Grid flexWrap="nowrap" alignItems="center" justifyContent="end" container>
              <SuccessMark isSuccess={!invalid && !!field.value} />
              {props?.info && <InfoPopover info={props?.info} />}
            </Grid>
          ),
        },
      }}
    />
  );
};

export default memo(PhoneNumberField);
