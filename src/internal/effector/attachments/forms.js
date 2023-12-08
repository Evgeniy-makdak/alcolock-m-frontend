import ValidationRules from "../../validations/validation_rules";
import FormStateBuilder from "../form_state_builder";

const initData = {
  vehicle: null,
  driver: null,
}

const initValidations = {
  vehicle: [],
  driver: [],
}

const validator = () => ({
  vehicle: ValidationRules.requiredValidation,
  driver: ValidationRules.requiredValidation,
})

const addAttachmentFormState = new FormStateBuilder({
  initialData: initData,
  initialValidations: initValidations,
  getValidators: validator
})

const editAttachmentFormState = new FormStateBuilder({
  initialData: initData,
  initialValidations: initValidations,
  getValidators: validator
})

export const addAttachmentFormSelectors = addAttachmentFormState.createSelectors()
export const editAttachmentFormSelectors = editAttachmentFormState.createSelectors()
