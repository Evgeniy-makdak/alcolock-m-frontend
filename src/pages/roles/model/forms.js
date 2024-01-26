import { FormStateBuilder } from '@shared/lib/form_state_builder';
import { ValidationRules } from '@shared/validations/validation_rules';

const initData = {
  role: '',
  user_control: 3,
  car_control: 3,
  alkozamki_control: 3,
  attachments_control: 3,
};

const initValidations = {
  role: [],
};

const validator = () => ({
  role: ValidationRules.requiredValidation,
});

const addRoleFormState = new FormStateBuilder({
  initialData: initData,
  initialValidations: initValidations,
  getValidators: validator,
});

const editRoleFormState = new FormStateBuilder({
  initialData: initData,
  initialValidations: initValidations,
  getValidators: validator,
});

export const addRoleFormSelectors = addRoleFormState.createSelectors();
export const editRoleFormSelectors = editRoleFormState.createSelectors();
