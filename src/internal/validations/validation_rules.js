import ValidationMessages from "./validation_messages";

export default class ValidationRules {
  static requiredValidation (value) {
    let checkedValue = value
    if (Array.isArray(value)) {
      checkedValue = value.length
    }
    return !!checkedValue
      ? []
      : [ValidationMessages.required]
  }
  static emailValidation (value) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return re.test(String(value).toLowerCase())
      ? []
      : [ValidationMessages.notValidEmail]
  }

  static phoneValidation = (value) => {
    const re = /^\+7[0-9]+$/

    return re.test(value)
      ? []
      : [ValidationMessages.notValidPhone]
  }

  static driverLicenseValidation = (value) => {
    return value.length === 10
      ? []
      : [ValidationMessages.notValidData]
  }

  static minMaxValidation = (value, min, max, message = ValidationMessages.notValidData) => {
    return isNaN(+value)
      ? [ValidationMessages.notValidData]
      : value >= min && value <= max
        ? []
        : [message]
  }

  static UUID4Validation = (value) => {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

    return regex.test(value)
      ? []
      : [ValidationMessages.notValidUUID4]
  }

  static macAddressValidation = (value) => {
    const regex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/

    return regex.test(value)
      ? []
      : [ValidationMessages.notValidMacAddress]
  }

  static userNameValidation = (value) => {
    const valueParts = value.trim().split(' ')

    return valueParts.length === 3
      ? []
      : [ValidationMessages.notValidName]
  }

  static vinValidator = (value) => {
    const regex = /^[A-HJ-NPR-Z0-9]{17}$/

    return regex.test(value?.trim() ?? '')
      ? []
      : [ValidationMessages.notValidVin]
  }
}