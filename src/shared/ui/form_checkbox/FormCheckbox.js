import { Checkbox, FormControlLabel } from '@mui/material';

const FormCheckbox = ({ formSelectors, fieldParams, disabled = false }) => {
  const value = formSelectors.useFormDataValue(fieldParams.name) ?? false;
  const setValue = formSelectors.useSetFormDataValue(fieldParams.name);

  const onChange = (e, newValue) => {
    if (disabled) return;
    setValue(newValue);
  };

  return (
    <div>
      <FormControlLabel
        control={<Checkbox checked={value} onChange={onChange} disabled={disabled} />}
        label={fieldParams.label ?? ''}
      />
    </div>
  );
};

export default FormCheckbox;
