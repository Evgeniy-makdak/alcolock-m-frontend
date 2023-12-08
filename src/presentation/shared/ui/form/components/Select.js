import ValidationsWrapper from "./ValidationsWrapper";
import {FormControl, InputLabel, MenuItem, Select as MuiSelect} from "@mui/material";

const Select = (
  {
    formSelectors,
    fieldParams,
    disabled = false,
    options
  }) => {
  const value = formSelectors.useFormDataValue(fieldParams.name)
  const setValue = formSelectors.useSetFormDataValue(fieldParams.name)
  const validations = formSelectors.useFormValueValidation(fieldParams.name)

  const onChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <div className={'input'}>
      <div className="input__field">
        <ValidationsWrapper validationMsgs={validations}>
          <FormControl
            fullWidth
          >
            {fieldParams.label &&
              <InputLabel
                shrink={true}
                htmlFor={fieldParams.name}
                sx={{
                  background: 'white'
                }}
              >
                {fieldParams.label}
              </InputLabel>
            }

            <MuiSelect
              id={fieldParams.name}
              variant={'outlined'}
              labelId={fieldParams.name}
              disabled={disabled}
              value={value}
              fullWidth
              onChange={onChange}
              error={!!validations.length}
            >
              {options.map(option => {
                return (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </MenuItem>
                )
              })}

            </MuiSelect>
          </FormControl>

        </ValidationsWrapper>
      </div>
    </div>
  )
}

export default Select