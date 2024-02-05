import { FormControl, InputLabel, MenuItem, Select as MuiSelect } from '@mui/material';

import { ValidationsWrapper } from '@shared/components/validations_wrapper';
import { InputWrapper } from '@shared/styled_components/styledInputWrapper';

export const Select = ({
  formSelectors,
  fieldParams,
  disabled = false,
  options,
  testidLabel,
  testidSelect,
}) => {
  const value = formSelectors.useFormDataValue(fieldParams.name);
  const setValue = formSelectors.useSetFormDataValue(fieldParams.name);
  const validations = formSelectors.useFormValueValidation(fieldParams.name);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <InputWrapper>
      <ValidationsWrapper validationMsgs={validations}>
        <FormControl fullWidth>
          {fieldParams.label && (
            <InputLabel
              data-testid={testidLabel}
              shrink={true}
              htmlFor={fieldParams.name}
              sx={{
                background: 'white',
              }}>
              {fieldParams.label}
            </InputLabel>
          )}

          <MuiSelect
            data-testid={testidSelect}
            id={fieldParams.name}
            variant={'outlined'}
            labelId={fieldParams.name}
            disabled={disabled}
            value={value}
            fullWidth
            onChange={onChange}
            error={!!validations.length}>
            {options.map((option) => {
              return (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              );
            })}
          </MuiSelect>
        </FormControl>
      </ValidationsWrapper>
    </InputWrapper>
  );
};
