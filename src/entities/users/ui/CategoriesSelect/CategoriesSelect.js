import AppConstants from '@app/lib/app_constants';
import styled from '@emotion/styled';
import { Checkbox } from '@mui/material';
import ValidationsWrapper from '@shared/components/validations_wrapper/ValidationsWrapper';

import style from './CategoriesSelect.module.scss';

const CustomCheckbox = styled(Checkbox)({
  '&.MuiCheckbox-root': {
    color: '#00000099',
  },
  '&.Mui-checked': {
    color: '#00000099',
  },
  '&.Mui-disabled': {
    color: '#00000061',
  },
});

const CategoriesSelect = ({ formSelectors, fieldParams, disabled }) => {
  const values = formSelectors.useFormDataValue(fieldParams.name) ?? [];
  const setValue = formSelectors.useSetFormDataValue(fieldParams.name);
  const validations = formSelectors.useFormValueValidation(fieldParams.name);

  const onChange = (value) => {
    if (disabled) return;
    let newValues = [...values];

    if (values.includes(value)) {
      newValues = newValues.filter((item) => item !== value);
    } else {
      newValues.push(value);
    }

    setValue(newValues.length ? newValues : null);
  };

  return (
    <div className={style.categoriesSelect}>
      <span
        style={{
          color: validations.length ? 'red' : 'rgba(0, 0, 0, 0.6)',
        }}>
        {fieldParams.label}
      </span>

      <ValidationsWrapper validationMsgs={validations}>
        <div className={style.wrapper}>
          {AppConstants.categoryTypesList.map((category) => {
            return (
              <div
                key={category.value}
                className={`${style.checkbox} ${disabled ? style.disabled : ''}`}>
                <CustomCheckbox
                  checked={values.includes(category.value)}
                  onClick={() => onChange(category.value)}
                  disabled={disabled}
                />
                <span>{category.label}</span>
              </div>
            );
          })}
        </div>
      </ValidationsWrapper>
    </div>
  );
};

export default CategoriesSelect;
