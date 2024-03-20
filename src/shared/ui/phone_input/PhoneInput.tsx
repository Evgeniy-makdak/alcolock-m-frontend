/* eslint-disable @typescript-eslint/no-unused-vars */
import { type FC } from 'react';
import PhoneInput, { type DefaultInputComponentProps } from 'react-phone-number-input';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import ru from 'react-phone-number-input/locale/ru.json';
import 'react-phone-number-input/style.css';

import { MenuItem, Select, type SelectChangeEvent, type TextFieldProps } from '@mui/material';

import style from './PhoneInput.module.scss';

type CountrySelect = {
  value?: SelectChangeEvent<string>;
  onChange: (value: SelectChangeEvent<string>) => void;
  labels: string;
};

const CountrySelect: FC<CountrySelect> = ({ value, onChange, labels, ...rest }) => {
  return (
    <Select value={value as unknown as string} onChange={onChange} autoWidth label="Age">
      {getCountries().map((country) => (
        <MenuItem key={country} value={country}>
          {labels[country as unknown as number]} +{getCountryCallingCode(country)}
        </MenuItem>
      ))}
    </Select>
  );
};

type PhoneInputProps = {
  setValue: (value: string | null) => void;
  testid?: string;
  value?: string;
  TextFieldProps?: TextFieldProps;
  error?: string;
} & DefaultInputComponentProps;

export const PhoneInputSet: FC<PhoneInputProps> = ({ setValue, value, error }) => {
  return (
    <div>
      <PhoneInput
        international
        countryCallingCodeEditable={false}
        withCountryCallingCode
        useNationalFormatForDefaultCountryValue
        limitMaxLength
        labels={ru}
        placeholder="Введите номер телефона"
        value={value}
        defaultCountry="RU"
        onChange={setValue}
        className={style.input}
      />
      {error && <span className={style.error}>{error}</span>}
    </div>
  );
};
