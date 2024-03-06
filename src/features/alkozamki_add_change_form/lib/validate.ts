import * as yup from 'yup';

import type { Values } from '@shared/ui/search_multiple_select';
import { ValidationRules } from '@shared/validations/validation_rules';

export interface Form {
  name: string;
  serialNumber: number;
  uid: string;
  tc: Values;
}

export const schema = yup.object<Form>({
  name: yup.string().required('Обязательное поле'),
  serialNumber: yup
    .string()
    .min(1, 'Минимальное количество символов 1')
    .max(20, 'Максимальное количество символов 20')
    .required('Обязательное поле'),
  uid: yup
    .string()
    .test({
      name: 'uid',
      test(value, ctx) {
        if (value.length === 0) {
          return ctx.createError({ message: 'Обязательное поле' });
        }
        if (ValidationRules.UUID4Validation(value).length > 0) {
          return ctx.createError({ message: 'Некорректный uuid4' });
        }
        return true;
      },
    })
    .required('Обязательное поле'),
});
