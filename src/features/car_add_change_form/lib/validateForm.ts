import dayjs, { type Dayjs } from 'dayjs';
import * as yup from 'yup';

import type { Value } from '@shared/ui/search_multiple_select/SearchMultipleSelect';
import { ValidationRules } from '@shared/validations/validation_rules';

export type Form = {
  mark: string;
  model: string;
  vin: string;
  registrationNumber: string;
  color: Value[];
  type: Value[];
  year: Dayjs;
};

const date = new Date();
const maxYear = dayjs(date).year();
const minYear = 1900;
export const schema = yup.object({
  mark: yup.string().required('Обязательное поле'),
  model: yup.string().required('Обязательное поле'),
  vin: yup
    .string()
    .test({
      name: 'vin',
      test(value, ctx) {
        if (value.length === 0) {
          return ctx.createError({ message: 'Обязательное поле' });
        }
        if (ValidationRules.vinValidator(value).length > 0) {
          return ctx.createError({ message: 'Некорректный vin' });
        }
        return true;
      },
    })
    .required('Обязательное поле'),
  registrationNumber: yup.string().required('Обязательное поле'),
  year: yup
    .object()
    .typeError('Невалидная дата')
    .test({
      name: 'year',
      test(value: Dayjs, ctx) {
        if (!value) {
          return ctx.createError({ message: 'Обязательное поле' });
        }

        const isValid = value?.isValid && value?.isValid();

        if (!isValid) {
          return ctx.createError({ message: 'Невалидное значение' });
        }

        const year = value.year();
        if (year > maxYear) {
          return ctx.createError({ message: `Год не должен превышать ${maxYear}` });
        } else if (year < minYear) {
          return ctx.createError({ message: `Год должен быть не ниже ${minYear}` });
        }
        return true;
      },
    })
    .required('Обязательное поле'),
  color: yup
    .array()
    .min(1, 'Поле "Цвет" должно содержать 1 значение')
    .max(1, 'Поле "Цвет" должно содержать 1 значение'),
  type: yup
    .array()
    .min(1, 'Поле "Тип" должно содержать 1 значение')
    .max(1, 'Поле "Тип" должно содержать 1 значение'),
});
