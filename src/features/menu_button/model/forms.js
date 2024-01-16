import FormStateBuilder from '@shared/lib/form_state_builder';
import ValidationMessages from '@shared/validations/validation_messages';
import ValidationRules from '@shared/validations/validation_rules';

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
