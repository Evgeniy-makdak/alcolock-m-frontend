import ValidationRules from '../../validations/validation_rules';
import FormStateBuilder from '../form_state_builder';

const initAuthData = {
  username: '',
  password: '',
  rememberMe: false,
};
const initAuthValidations = {
  username: [],
  password: [],
};

const validator = () => ({
  username: (value) => {
    const required = ValidationRules.requiredValidation(value);
    const validEmail = ValidationRules.emailValidation(value);

    return !!required.length ? required : validEmail;
  },
  password: ValidationRules.requiredValidation,
});

const authFormSate = new FormStateBuilder({
  initialData: initAuthData,
  initialValidations: initAuthValidations,
  getValidators: validator,
});

const changeProfileFormState = new FormStateBuilder({
  initialData: initAuthData,
  initialValidations: initAuthValidations,
  getValidators: validator,
});

export const authFormSelectors = authFormSate.createSelectors();
export const changeProfileFormSelectors = changeProfileFormState.createSelectors();
