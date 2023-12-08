import FormStateBuilder from "../form_state_builder";
import ValidationRules from "../../validations/validation_rules";

const initData = {
  users: [],
  carsByMake: [],
  carsByLicense: [],
  eventsByType: []
}

const filtersFormState = new FormStateBuilder({
  initialData: initData,
})

export const filtersFormSelectors = filtersFormState.createSelectors()

const initActivateData = {
  duration: '',
}

const initActivateValidations = {
  duration: []
}

const validator = () => ({
  duration: ValidationRules.requiredValidation
})

const alcolockActivateFormState = new FormStateBuilder({
  initialData: initActivateData,
  initialValidations: initActivateValidations,
  getValidators: validator
})

export const alcolockActivateFormSelectors = alcolockActivateFormState.createSelectors()
