import FormStateBuilder from '@shared/lib/form_state_builder';
import ValidationRules from '@shared/validations/validation_rules';

const initData = {
  vehicle: null,
  driver: null,
};

const initValidations = {
  vehicle: [],
  driver: [],
};

const validator = () => ({
  vehicle: ValidationRules.requiredValidation,
  driver: ValidationRules.requiredValidation,
});

const addAttachmentFormState = new FormStateBuilder({
  initialData: initData,
  initialValidations: initValidations,
  getValidators: validator,
});

const editAttachmentFormState = new FormStateBuilder({
  initialData: initData,
  initialValidations: initValidations,
  getValidators: validator,
});

export const addAttachmentFormSelectors = addAttachmentFormState.createSelectors();
export const editAttachmentFormSelectors = editAttachmentFormState.createSelectors();
