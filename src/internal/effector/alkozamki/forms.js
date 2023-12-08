import ValidationRules from "../../validations/validation_rules";
import FormStateBuilder from "../form_state_builder";

const initData = {
  name: '',
  serviceId: '',
  serialNumber: '',
  vehicle: null,
  // user: 0,
}

const initValidations = {
  name: [],
  serialNumber: [],
  serviceId: [],
}

const validator = () => ({
  name: ValidationRules.requiredValidation,
  serialNumber: ValidationRules.requiredValidation,
  serviceId: ValidationRules.UUID4Validation,
})

const addAlkozamokFormState = new FormStateBuilder({
  initialData: initData,
  initialValidations: initValidations,
  getValidators: validator
})

const editAlkozamokFormState = new FormStateBuilder({
  initialData: initData,
  initialValidations: initValidations,
  getValidators: validator
})

export const addAlkozamokFormSelectors = addAlkozamokFormState.createSelectors()
export const editAlkozamokFormSelectors = editAlkozamokFormState.createSelectors()
