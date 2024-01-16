import FormStateBuilder from '@shared/lib/form_state_builder';
import ValidationRules from '@shared/validations/validation_rules';

const initData = {
  name: '',
  serviceId: '',
  serialNumber: '',
  vehicle: null,
  // user: 0,
};

const initValidations = {
  name: [],
  serialNumber: [],
  serviceId: [],
};

const validator = () => ({
  name: ValidationRules.requiredValidation,
  serialNumber: ValidationRules.requiredValidation,
  serviceId: ValidationRules.UUID4Validation,
});

const addAlkozamokFormState = new FormStateBuilder({
  initialData: initData,
  initialValidations: initValidations,
  getValidators: validator,
});

const editAlkozamokFormState = new FormStateBuilder({
  initialData: initData,
  initialValidations: initValidations,
  getValidators: validator,
});

export const addAlkozamokFormSelectors = addAlkozamokFormState.createSelectors();
export const editAlkozamokFormSelectors = editAlkozamokFormState.createSelectors();
