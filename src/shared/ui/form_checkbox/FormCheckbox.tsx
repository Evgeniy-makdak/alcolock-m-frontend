import { Checkbox, FormControlLabel } from '@mui/material';

import { MySelectDisplayProps } from '@shared/types/utility';

interface FormCheckboxProps {
  disabled: boolean;
  formSelectors: {
    useFormDataValue: (name: string) => (collback: () => void) => string | boolean;
    useSetFormDataValue: (name: string) => (state: boolean) => void;
  };
  fieldParams: { name: string; label: string };
  className: string;
  testid?: string;
}

export const FormCheckbox = ({
  formSelectors,
  fieldParams,
  disabled = false,
  testid,
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
        control={
          <Checkbox
            data-testid={testid}
            id={testid}
            checked={!!value}
            onChange={onChange}
            disabled={disabled}
            inputProps={
              {
                'data-testid': testid,
              } as MySelectDisplayProps
            }
          />
        }
        label={fieldParams?.label ?? ''}
      />
    </div>
  );
};
