import ValidationMessages from '../../validations/validation_messages';
import ValidationRules from '../../validations/validation_rules';
import FormStateBuilder from '../form_state_builder';

const initData = {
  currentPassword: '',
  newPassword: '',
};

const initValidations = {
  currentPassword: [],
  newPassword: [],
};

const passwordValidation = (value) => {
  const required = ValidationRules.requiredValidation(value);
  const minMaxLength = ValidationRules.minMaxValidation(
    (value ?? '').length,
    4,
    100,
    ValidationMessages.notValidPasswordLength,
  );

  return !!required.length ? required : minMaxLength;
};

const validator = () => ({
  currentPassword: passwordValidation,
  newPassword: passwordValidation,
});

const changePasswordFormState = new FormStateBuilder({
  initialData: initData,
  initialValidations: initValidations,
  getValidators: validator,
});

export const changePasswordFormSelectors = changePasswordFormState.createSelectors();
