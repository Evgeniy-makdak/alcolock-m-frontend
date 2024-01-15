import InputMask from 'react-input-mask';

import { TextField } from '@mui/material';

import ValidationsWrapper from './ValidationsWrapper';

const PhoneInput = ({ formSelectors, fieldParams, disabled = false }) => {
  const value = formSelectors.useFormDataValue(fieldParams.name) ?? '';
  const setValue = formSelectors.useSetFormDataValue(fieldParams.name);
  const validations = formSelectors.useFormValueValidation(fieldParams.name);

  const onChange = (e) => {
    if (disabled) return;
    const { value } = e.target;
    const formattedValue = value.replace(/\s+|_/g, '');
    setValue(formattedValue === '+7' ? null : formattedValue);
  };

  return (
    <div className={'input'}>
      <div className="input__field">
        <ValidationsWrapper validationMsgs={validations}>
          <InputMask mask="+7 999 999 99 99" value={value} onChange={onChange}>
            {(inputProps) => (
              <TextField
                {...inputProps}
                type="tel"
                label={fieldParams.label ?? null}
                id={fieldParams.name}
                aria-label={'start top'}
                fullWidth
                name={fieldParams.name}
              />
            )}
          </InputMask>
        </ValidationsWrapper>
      </div>
    </div>
  );
};

export default PhoneInput;
