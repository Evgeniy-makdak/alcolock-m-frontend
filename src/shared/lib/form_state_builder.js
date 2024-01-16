import { combine, createEffect, createEvent, createStore, sample } from 'effector';
import { useEvent, useStore } from 'effector-react';
import { isEqual } from 'lodash';

export default class FormStateBuilder {
  constructor({ initialData, initialValidations = {}, getValidators = null }) {
    this.valueStateManager = {};
    this.onValidSubmit = null;

    this.$formData = createStore(initialData);
    this.$formValidations = createStore(initialValidations);
    this.$previousFormData = createStore(initialData);
    this.$isEqualCurrentAndPrevData = createStore(false);
    this.$validationAvailable = createStore(false);
    this.$isValidForm = createStore(true);

    this.setFormValidations = createEvent();
    this.setIsEqualCurrentAndPrevData = createEvent();
    this.resetFormData = createEvent();
    this.setInitData = createEvent();
    this.onCickSubmit = createEvent();
    this.turnOnValidations = createEvent();
    this.setFormDataField = createEvent();
    this.setIsValidForm = createEvent();
    this.validateAllFields = createEvent();
    this.setPreviousFormData = createEvent();

    this.$currentAndPrevData = combine(
      this.$formData,
      this.$previousFormData,
      (formData, previousFormData) => {
        return {
          currentData: formData,
          previousData: previousFormData,
        };
      },
    );

    this.$isValidForm
      .on(this.setIsValidForm, (state, payload) => payload)
      .reset(this.resetFormData);

    this.$formData
      .on(this.setFormDataField, (state, payload) => ({ ...state, [payload.key]: payload.value }))
      .reset(this.resetFormData);

    this.$previousFormData
      .on(this.setPreviousFormData, (state, payload) => payload)
      .reset(this.resetFormData);

    this.$formValidations
      .on(this.setFormValidations, (state, payload) => ({ ...state, [payload.key]: payload.value }))
      .reset(this.resetFormData);

    this.$validationAvailable.on(this.turnOnValidations, () => true).reset(this.resetFormData);

    this.$isEqualCurrentAndPrevData
      .on(this.setIsEqualCurrentAndPrevData, (state, payload) => payload)
      .reset(this.resetFormData);

    this.validateFields = createEffect((formData) => {
      for (const key in this.valueStateManager) {
        if (!this.valueStateManager[key].validateField) continue;

        this.valueStateManager[key].validateField(formData[key]);
      }
    });

    this.setOnValidSubmit = createEffect((callback) => {
      this.onValidSubmit = callback;
    });

    this.handleSendData = createEffect(({ formData, isValidForm, isEqual }) => {
      if (!isValidForm) {
        console.log('invalid form');
        return;
      }

      if (isEqual) {
        console.log('equal data');
        return;
      }

      if (!this.onValidSubmit) return;

      this.onValidSubmit(formData);
    });

    this.trimDataValues = createEffect((formData) => {
      for (const key in formData) {
        if (typeof formData[key] !== 'string') continue;

        this.valueStateManager[key].setValue(formData[key].trim());
      }
    });

    this.setValuesByInitData = createEffect((initData) => {
      for (const key in initData) {
        if (!this.valueStateManager[key]) continue;

        this.valueStateManager[key].setValue(initData[key]);
      }
    });

    this.validateDataBeforeSend = createEffect(({ formData, isValidationAvailable }) => {
      if (!isValidationAvailable) {
        this.turnOnValidations();
      }

      for (const key in formData) {
        if (!this.valueStateManager[key].validateField) continue;

        this.valueStateManager[key].validateField(formData[key]);
      }
    });

    this.$currentAndPrevData.watch(({ currentData, previousData }) => {
      this.setIsEqualCurrentAndPrevData(isEqual(currentData, previousData));
    });

    this.$formValidations.watch((store) => {
      let isValid = true;

      for (const key in store) {
        if (!store[key].length) continue;

        isValid = false;
      }

      this.setIsValidForm(isValid);
    });

    sample({
      clock: this.validateAllFields,
      source: this.$formData,
      target: this.validateFields,
    });

    sample({
      clock: this.onCickSubmit,
      source: this.$formData,
      target: this.trimDataValues,
    });

    sample({
      clock: this.trimDataValues.done,
      source: {
        formData: this.$formData,
        isValidationAvailable: this.$validationAvailable,
      },
      target: this.validateDataBeforeSend,
    });

    sample({
      clock: this.validateDataBeforeSend.done,
      source: {
        formData: this.$formData,
        isValidForm: this.$isValidForm,
        isEqual: this.$isEqualCurrentAndPrevData,
      },
      target: this.handleSendData,
    });

    sample({
      clock: this.setInitData,
      target: this.setValuesByInitData,
    });

    sample({
      clock: this.setInitData,
      target: this.setPreviousFormData,
    });

    for (const key in initialData) {
      if (this.valueStateManager[key] !== undefined) return;

      this.valueStateManager[key] = {
        $store: createStore(initialData[key]),
        setValue: createEvent(),
        $validationStore: createStore([]),
        validateOnChangeValue: createEffect(({ value, isValidationAvailable }) => {
          if (!isValidationAvailable || !this.valueStateManager[key].validateField) return;

          this.valueStateManager[key].validateField(value);
        }),
        resetValue: createEvent(),
      };

      if (initialValidations && initialValidations[key]) {
        this.valueStateManager[key].$validationStore = createStore(initialValidations[key]);
        this.valueStateManager[key].validateField = createEvent();

        this.valueStateManager[key].$validationStore
          .on(this.valueStateManager[key].validateField, (state, payload) => {
            return getValidators(this.$formData.getState(), state)[key](payload);
          })
          .reset(this.valueStateManager[key].resetValue);

        this.valueStateManager[key].$validationStore.watch((value) =>
          this.setFormValidations({ value, key }),
        );
      }

      this.valueStateManager[key].$store
        .on(this.valueStateManager[key].setValue, (state, payload) => payload)
        .reset(this.valueStateManager[key].resetValue);

      sample({
        clock: this.valueStateManager[key].setValue,
        fn: (value) => ({ key, value }),
        target: this.setFormDataField,
      });

      sample({
        clock: this.valueStateManager[key].setValue,
        source: {
          value: this.valueStateManager[key].$store,
          isValidationAvailable: this.$validationAvailable,
        },
        target: this.valueStateManager[key].validateOnChangeValue,
      });
    }

    this.resetValues = createEffect(() => {
      for (const key in this.valueStateManager) {
        this.valueStateManager[key].resetValue();
      }
    });

    sample({
      clock: this.resetFormData,
      target: this.resetValues,
    });
  }

  createSelectors() {
    return {
      useFormData: () => useStore(this.$formData),
      useFormValidations: () => useStore(this.$formValidations),
      useIsFormValid: () => useStore(this.$isValidForm),
      useIsValidationsAvailable: () => useStore(this.$validationAvailable),
      useValidateAllFields: () => useEvent(this.validateAllFields),
      useResetForm: () => useEvent(this.resetFormData),
      useSetInitFormData: () => useEvent(this.setInitData),
      useSetOnValidSubmit: () => useEvent(this.setOnValidSubmit),
      useFormDataValue: (key) => useStore(this.valueStateManager[key].$store),
      useSetFormDataValue: (key) => useEvent(this.valueStateManager[key].setValue),
      useOnClickSubmit: () => useEvent(this.onCickSubmit),
      useSetPreviousData: () => useEvent(this.setPreviousFormData),
      useFormValueValidation: (key) => useStore(this.valueStateManager[key].$validationStore),
      setFormDataValue: (key) => this.valueStateManager[key].setValue,
      getStateFromModel: (store) => this[store].getState(),
    };
  }
}
