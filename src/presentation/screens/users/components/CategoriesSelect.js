import ValidationsWrapper from "../../../shared/ui/form/components/ValidationsWrapper";
import AppConstants from "../../../../internal/app_constants";
import {Checkbox} from "@mui/material";
import styled from '@emotion/styled'
import './CategoriesSelect.sass'

const CustomCheckbox = styled(Checkbox)({
  '&.MuiCheckbox-root': {
    color: '#00000099',
  },
  '&.Mui-checked': {
    color: '#00000099',
  },
  '&.Mui-disabled': {
    color: '#00000061'
  }
})

const CategoriesSelect = (
  {
    formSelectors,
    fieldParams,
    disabled
  }) => {
  const values = formSelectors.useFormDataValue(fieldParams.name) ?? []
  const setValue = formSelectors.useSetFormDataValue(fieldParams.name)
  const validations = formSelectors.useFormValueValidation(fieldParams.name)

  const onChange = (value) => {
    if (disabled) return
    let newValues = [...values]

    if (values.includes(value)) {
      newValues = newValues.filter(item => item !== value)
    } else {
      newValues.push(value)
    }

    setValue(newValues.length ? newValues : null)
  }

  return (
    <div className={'categories-select'}>
      <span style={{
        color: !!validations.length ? 'red' : 'rgba(0, 0, 0, 0.6)'
      }}>
        {fieldParams.label}
      </span>

      <ValidationsWrapper validationMsgs={validations}>
        <div className={'categories-select__wrapper'}>
          {AppConstants.categoryTypesList.map(category => {
            return (
              <div
                key={category.value}
                className={`categories-select__checkbox ${disabled ? 'disabled' : ''}`}
              >
                <CustomCheckbox
                  checked={values.includes(category.value)}
                  onClick={() => onChange(category.value)}
                  disabled={disabled}
                />

                <span>{category.label}</span>
              </div>
            )
          })}
        </div>
      </ValidationsWrapper>
    </div>
  )
}

export default CategoriesSelect
