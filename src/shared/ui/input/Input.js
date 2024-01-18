import { useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';

import ValidationsWrapper from '../../components/validations_wrapper/ValidationsWrapper';
import { mapFieldError } from '../../utils/field_error_mapper';
import style from './Input.module.scss';

const Input = ({ formSelectors, fieldParams, disabled = false, withChange, fieldsErrors = [] }) => {
  const value = formSelectors.useFormDataValue(fieldParams.name) ?? '';
  const setValue = formSelectors.useSetFormDataValue(fieldParams.name);

  const validations = [
    ...(formSelectors.useFormValueValidation(fieldParams.name) ?? []),
    ...mapFieldError(fieldsErrors, fieldParams.name),
  ];
  const [showPassword, setShowPassword] = useState(false);

  const valueFormatter = (value) => {
    if (fieldParams.type === 'number') {
      return !value && isNaN(+value) ? value : +value;
    } else {
      return value;
    }
  };
  const onChange = (e) => {
    if (disabled) return;
    const { value } = e.target;
    setValue(value.length ? valueFormatter(value) : null);

    if (withChange) {
      withChange();
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={style.input}>
      <div className={style.field}>
        <ValidationsWrapper validationMsgs={validations}>
          {fieldParams.type === 'password' ? (
            <TextField
              label={fieldParams.label ?? null}
              id={fieldParams.name}
              aria-label={'start top'}
              value={value}
              onChange={onChange}
              type={showPassword ? 'text' : 'password'}
              placeholder={fieldParams.placeholder ?? ''}
              autoComplete="off"
              variant="outlined"
              fullWidth
              disabled={disabled}
              error={!!validations.length}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          ) : (
            <TextField
              label={fieldParams.label ?? null}
              aria-label={'start top'}
              id={fieldParams.name}
              value={value}
              onChange={onChange}
              type={fieldParams.type ?? 'text'}
              placeholder={fieldParams.placeholder ?? ''}
              autoComplete="off"
              disabled={disabled}
              fullWidth
              error={!!validations.length}
            />
          )}
        </ValidationsWrapper>
      </div>
    </div>
  );
};

export default Input;
