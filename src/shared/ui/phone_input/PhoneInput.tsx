import type { FC } from 'react';
import InputMask from 'react-input-mask';

import { TextField, type TextFieldProps } from '@mui/material';

type PhoneInputProps = {
  setValue: (value: string | null) => void;
  disabled?: boolean;
  testid?: string;
  value?: string;
  TextFieldProps?: TextFieldProps;
};

export const PhoneInput: FC<PhoneInputProps> = ({
  disabled = false,
  testid,
  setValue,
  value,
  TextFieldProps,
}) => {
  const onChange = (value: string) => {
    if (disabled) return;
    const formattedValue = value.replace(/\s+|_/g, '');
    setValue(formattedValue === '+7' ? null : formattedValue);
  };

  return (
    <InputMask mask="+7 999 999 99 99" value={value} onChange={(e) => onChange(e?.target?.value)}>
      <TextField
        {...TextFieldProps}
        data-testid={testid}
        type="tel"
        aria-label={'start top'}
        fullWidth
      />
    </InputMask>
  );
};
