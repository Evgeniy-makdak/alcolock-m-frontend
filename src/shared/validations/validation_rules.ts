import { isPossiblePhoneNumber } from 'react-phone-number-input';

import { ValidationMessages } from './validation_messages';

type ValidateValue = string | null | undefined | unknown[];
export class ValidationRules {
  static requiredValidation(value: ValidateValue) {
    let checkedValue: number | ValidateValue = value;
    if (Array.isArray(value)) {
      checkedValue = value.length;
    }
    return checkedValue ? false : ValidationMessages.required;
  }
  static emailValidation(value: ValidateValue) {
    const re =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(value).toLowerCase()) ? [] : [ValidationMessages.notValidEmail];
  }

  static phoneValidation = (value: string) => {
    if (isPossiblePhoneNumber(value)) return false;

    return ValidationMessages.notValidPhone;
  };

  static driverLicenseValidation = (value: ValidateValue) => {
    return value.length === 10 ? false : ValidationMessages.notValidData;
  };

  static minMaxValidation = (
    value: number,
    min: number,
    max: number,
    message = ValidationMessages.notValidData,
  ) => {
    return isNaN(+value)
      ? [ValidationMessages.notValidData]
      : value >= min && value <= max
        ? []
        : [message];
  };

  static UUID4Validation = (value: string) => {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    return regex.test(value) ? [] : [ValidationMessages.notValidUUID4];
  };

  static macAddressValidation = (value: string) => {
    const regex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;

    return regex.test(value) ? [] : [ValidationMessages.notValidMacAddress];
  };

  static userNameValidation = (value: string) => {
    const valueParts = value.trim().split(' ');

    return valueParts.length === 3 ? [] : [ValidationMessages.notValidName];
  };

  static vinValidator = (value: string) => {
    const regex = /^[A-HJ-NPR-Z0-9]{17}$/;

    return regex.test(value?.trim() ?? '') ? false : ValidationMessages.notValidVin;
  };
  static serialNumberValidator = (value: string) => {
    return value.length > 0 && value.length < 21 ? [] : [ValidationMessages.notValidSerialNumber];
  };
}
