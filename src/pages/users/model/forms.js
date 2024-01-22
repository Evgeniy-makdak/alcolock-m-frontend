import { FormStateBuilder } from '@shared/lib/form_state_builder';
import { ValidationMessages } from '@shared/validations/validation_messages';
import { ValidationRules } from '@shared/validations/validation_rules';

const initData = {
  email: '',
  password: '',
  name: '',
  userGroups: [],
  disabled: false,
  birthDate: null,
  phone: null,
  licenseCode: null,
  licenseIssueDate: null,
  licenseExpirationDate: null,
  licenseClass: null,
};

const initValidations = {
  email: [],
  password: [],
  name: [],
  phone: [],
  userGroups: [],
  licenseCode: [],
  licenseIssueDate: [],
  licenseExpirationDate: [],
};

const initChangeValidations = {
  email: [],
  name: [],
  phone: [],
  userGroups: [],
  licenseCode: [],
  licenseIssueDate: [],
  licenseExpirationDate: [],
};

const validator = (formValues) => ({
  email: (value) => {
    const required = ValidationRules.requiredValidation(value);
    const validEmail = ValidationRules.emailValidation(value);

    return required.length ? required : validEmail;
  },
  password: (value) => {
    const required = ValidationRules.requiredValidation(value);
    const minMaxLength = ValidationRules.minMaxValidation(
      (value ?? '').length,
      4,
      100,
      ValidationMessages.notValidPasswordLength,
    );

    return required.length ? required : minMaxLength;
  },
  name: (value) => {
    const required = ValidationRules.requiredValidation(value);
    return required.length ? required : ValidationRules.userNameValidation(value);
  },
  phone: (value) => {
    return value ? ValidationRules.phoneValidation(value) : [];
  },
  userGroups: (value) => ValidationRules.requiredValidation((value ?? []).length),
  licenseCode: (value) => {
    if (!formValues.userGroups?.includes(200)) return [];
    return value ? ValidationRules.driverLicenseValidation(value) : [];
  },
  licenseIssueDate: (value) => {
    if (!formValues.userGroups?.includes(200)) return [];
    if (formValues.licenseCode) {
      return ValidationRules.requiredValidation(value);
    } else {
      return [];
    }
  },
  licenseExpirationDate: (value) => {
    if (!formValues.userGroups?.includes(200)) return [];
    if (formValues.licenseCode) {
      return ValidationRules.requiredValidation(value);
    } else {
      return [];
    }
  },
});

const addUserFormState = new FormStateBuilder({
  initialData: initData,
  initialValidations: initValidations,
  getValidators: validator,
});

const editUserFromState = new FormStateBuilder({
  initialData: initData,
  initialValidations: initChangeValidations,
  getValidators: validator,
});

export const addUserFormSelectors = addUserFormState.createSelectors();
export const editUserFromSelectors = editUserFromState.createSelectors();
