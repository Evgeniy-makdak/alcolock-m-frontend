import { Checkbox, FormControlLabel } from '@mui/material';

interface FormCheckboxProps {
  disabled: boolean;
  formSelectors: {
    useFormDataValue: (name: string) => (collback: () => void) => string | boolean;
    useSetFormDataValue: (name: string) => (state: boolean) => void;
  };
  fieldParams: { name: string; label: string };
  className: string;
}

export const FormCheckbox = ({
  formSelectors,
  fieldParams,
  disabled = false,
}: FormCheckboxProps) => {
  const value = formSelectors.useFormDataValue(fieldParams.name) ?? false;
  const setValue = formSelectors.useSetFormDataValue(fieldParams.name);

  const onChange = (e: any, newValue: boolean) => {
    if (disabled) return;
    setValue(newValue);
  };

  return (
    <div>
      <FormControlLabel
        control={<Checkbox checked={!!value} onChange={onChange} disabled={disabled} />}
        label={fieldParams?.label ?? ''}
      />
    </div>
  );
};
