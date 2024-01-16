import FormStateBuilder from '@shared/lib/form_state_builder';
import ValidationRules from '@shared/validations/validation_rules';

const initData = {
  manufacturer: '',
  model: '',
  registrationNumber: '',
  year: '',
  vin: '',
  color: null,
  type: null,
};

const initValidations = {
  manufacturer: [],
  model: [],
  registrationNumber: [],
  year: [],
  vin: [],
  color: [],
  type: [],
};

const validator = () => ({
  manufacturer: ValidationRules.requiredValidation,
  model: ValidationRules.requiredValidation,
  registrationNumber: ValidationRules.requiredValidation,
  year: ValidationRules.requiredValidation,
  vin: (value) => {
    return value.length
      ? ValidationRules.vinValidator(value)
      : ValidationRules.requiredValidation(value);
  },
  color: ValidationRules.requiredValidation,
  type: ValidationRules.requiredValidation,
});

const addCarFormState = new FormStateBuilder({
  initialData: initData,
  initialValidations: initValidations,
  getValidators: validator,
});

const editCarFormState = new FormStateBuilder({
  initialData: initData,
  initialValidations: initValidations,
  getValidators: validator,
});

export const addCarFormSelectors = addCarFormState.createSelectors();
export const editCarFormSelectors = editCarFormState.createSelectors();
