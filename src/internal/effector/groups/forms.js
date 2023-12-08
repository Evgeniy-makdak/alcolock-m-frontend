import ValidationRules from "../../validations/validation_rules";
import FormStateBuilder from "../form_state_builder";

const initData = {
  name: '',
  user: 0
}

const initValidations = {
  name: []
}

const validator = () => ({
  name: ValidationRules.requiredValidation
})

const addGroupFormState = new FormStateBuilder({
  initialData: initData,
  initialValidations: initValidations,
  getValidators: validator
})

const editGroupFormState = new FormStateBuilder({
  initialData: initData,
  initialValidations: initValidations,
  getValidators: validator
})

const initUserData = {
  user: []
}

const initUserValidations = {
  user: []
}

const userValidator = () => ({
  user: ValidationRules.requiredValidation
})

const addGroupUserFormState = new FormStateBuilder({
  initialData: initUserData,
  initialValidations: initUserValidations,
  getValidators: userValidator
})

const initAlcolockData = {
  alcolock: []
}

const initAlcolockValidations = {
  alcolock: []
}

const alcolockValidator = () => ({
  alcolock: ValidationRules.requiredValidation
})

const addGroupAlcolockFormState = new FormStateBuilder({
  initialData: initAlcolockData,
  initialValidations: initAlcolockValidations,
  getValidators: alcolockValidator
})

const initCarData = {
  car: []
}

const initCarValidations = {
  car: []
}

const carValidator = () => ({
  car: ValidationRules.requiredValidation
})

const addGroupCarFormState = new FormStateBuilder({
  initialData: initCarData,
  initialValidations: initCarValidations,
  getValidators: carValidator
})

const initSwitchGroupData = {
  group: null
}

const initSwitchGroupValidations = {
  group: []
}

const switchGroupValidator = () => ({
  group: ValidationRules.requiredValidation
})

const switchGroupFormState = new FormStateBuilder({
  initialData: initSwitchGroupData,
  initialValidations: initSwitchGroupValidations,
  getValidators: switchGroupValidator
})

export const addGroupFormSelectors = addGroupFormState.createSelectors()
export const editGroupFormSelectors = editGroupFormState.createSelectors()
export const addGroupUserFormSelectors = addGroupUserFormState.createSelectors()
export const addGroupAlcolockFormSelectors = addGroupAlcolockFormState.createSelectors()
export const addGroupCarFormSelectors = addGroupCarFormState.createSelectors()
export const switchGroupFormSelectors = switchGroupFormState.createSelectors()
