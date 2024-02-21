import * as yup from 'yup';

export interface Form {
  duration: number;
}

export const schema = yup
  .object<Form>({
    duration: yup
      .number()
      .transform((val) => (Number.isNaN(val) ? null : val))
      .nullable('значение должно быть числом')
      .positive('значение должно быть больше 0')
      .integer('значение должно быть числом')
      .required('Обязательное поле')
      .min(1, 'значение должно быть больше 0'),
  })
  .required('Обязательное поле');
