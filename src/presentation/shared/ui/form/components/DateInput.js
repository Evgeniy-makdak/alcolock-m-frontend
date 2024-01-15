import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ruRU } from '@mui/x-date-pickers/locales';

import ValidationsWrapper from './ValidationsWrapper';

const DateInput = ({ formSelectors, fieldParams, disabled = false, maxDate = null }) => {
  const value = formSelectors.useFormDataValue(fieldParams.name);
  const setValue = formSelectors.useSetFormDataValue(fieldParams.name);
  const validations = formSelectors.useFormValueValidation(fieldParams.name);
  const onChange = (e) => {
    if (disabled) return;
    const formattedDate = e?.format('YYYY-MM-DD');

    if (!formattedDate || formattedDate === 'Invalid Date') {
      setValue(null);
    } else {
      setValue(formattedDate);
    }
  };

  const dateValueFormatter = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const dateObject = new Date(year, month - 1, day);

    return dayjs(dateObject);
  };

  return (
    <div className={'input'}>
      <div className="input__field">
        <ValidationsWrapper validationMsgs={validations}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={'ru'}
            localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}>
            <DatePicker
              maxDate={maxDate}
              id={fieldParams.name}
              label={fieldParams.label ?? null}
              value={value ? dateValueFormatter(value) : null}
              onChange={onChange}
              disabled={disabled}
              sx={{
                width: '100%',
              }}
              fullWidth={true}
              format="DD.MM.YYYY"
              error={!!validations.length}
            />
          </LocalizationProvider>
        </ValidationsWrapper>
      </div>
    </div>
  );
};

export default DateInput;
