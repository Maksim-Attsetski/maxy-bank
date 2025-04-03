import { type FC, memo } from 'react';

import { FormControl, Typography } from '@mui/material';
import {
  LocalizationProvider,
  DatePicker as MuiDatePicker,
  type DatePickerProps,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { ruRU } from '@mui/x-date-pickers/locales';
import { ru } from 'date-fns/locale/ru';
import { useController, type UseControllerProps } from 'react-hook-form';

import s from './DatePicker.module.scss';

interface IProps {
  controller: UseControllerProps;
  picker?: DatePickerProps<Date>;
  label?: string;
}

const DatePicker: FC<IProps> = ({ controller, label, picker }) => {
  const isOptional = controller.rules?.required === false;
  const {
    field,
    fieldState: { error },
  } = useController(controller);

  return (
    <FormControl className={s.datepicker}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={ru}
        localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
      >
        <MuiDatePicker
          name={field.name}
          value={field.value}
          onChange={field.onChange}
          disabled={field.disabled}
          ref={field.ref}
          label={label + (isOptional ? '' : '*')}
          sx={
            error
              ? {
                  '&  fieldSet, label': {
                    borderColor: 'var(--error-color) !important',
                    color: 'var(--error-color) !important',
                    borderRadius: '8px',
                  },
                }
              : { borderRadius: '8px' }
          }
          {...picker}
        />
        <Typography variant="caption" color="error.main" marginLeft="14px" marginTop="3px">
          {error?.message}
        </Typography>
      </LocalizationProvider>
    </FormControl>
  );
};

export default memo(DatePicker);
