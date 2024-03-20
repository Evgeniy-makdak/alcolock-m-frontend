import type { Dayjs } from 'dayjs';
import * as yup from 'yup';
import { object } from 'yup';

import type { ID } from '@shared/types/BaseQueryTypes';
import type { Value, Values } from '@shared/ui/search_multiple_select';
import { ValidationMessages } from '@shared/validations/validation_messages';
import { ValidationRules } from '@shared/validations/validation_rules';

export interface Form {
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: Dayjs | null;
  phone: string;
  email: string;
  password: string;
  userGroups: Values;
  licenseCode: string;
  licenseIssueDate: Dayjs | null;
  licenseExpirationDate: Dayjs | null;
  licenseClass: string[];
  disabled: ID;
}

export type KeyForm = keyof Form;

yup.addMethod(object, 'dayjs', function method(message) {
  return this.test('dayjs', message, function validate(value: Dayjs, ctx) {
    if (!mustBeDate(ctx)) return true;
    if (!value) {
      return ctx.createError({ message: ValidationMessages.required });
    }
    const isValid = 'isValid' in value && value.isValid();
    if (!isValid) {
      return ctx.createError({ message: ValidationMessages.notValidData });
    }
    return true;
  });
});

const mustBeDate = (ctx: yup.TestContext<yup.AnyObject>) => {
  const licenseCode = ctx.parent?.licenseCode;

  return licenseCode.trim() > 0;
};

export const schema = (id: ID): yup.ObjectSchema<Form> =>
  yup.object({
    licenseClass: yup.array<Value>(),
    firstName: yup.string().required(ValidationMessages.required),
    middleName: yup.string().required(ValidationMessages.required),
    lastName: yup.string(),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    birthDate: yup.object().dayjs(),
    phone: yup.string().test({
      name: 'phone',
      test(value, ctx) {
        if (!value || value.length === 0) {
          return true;
        }
        const errorMessage = ValidationRules.phoneValidation(value);
        if (errorMessage) {
          return ctx.createError({ message: errorMessage });
        }
        return true;
      },
    }),
    email: yup
      .string()
      .required(ValidationMessages.required)
      .test({
        name: 'email',
        test(value, ctx) {
          if (value.length === 0) {
            return ctx.createError({ message: ValidationMessages.required });
          }
          if (ValidationRules.emailValidation(value).length > 0) {
            return ctx.createError({ message: ValidationMessages.notValidEmail });
          }
          return true;
        },
      }),
    password: yup.string().test({
      name: 'password',
      test(value, ctx) {
        if (value.length === 0 && !id) {
          return ctx.createError({ message: ValidationMessages.required });
        }
        if (value.length === 0 && id) return true;
        const errors = ValidationRules.minMaxValidation(
          (value ?? '').length,
          4,
          100,
          ValidationMessages.notValidPasswordLength,
        );
        if (errors.length > 0) {
          return ctx.createError({ message: errors[0] });
        }
        return true;
      },
    }),
    disabled: yup.string().required(ValidationMessages.required),
    licenseCode: yup.string().test({
      name: 'licenseCode',
      test(value, ctx) {
        if (value.trim().length > 0 && ValidationRules.driverLicenseValidation(value).length > 0) {
          return ctx.createError({ message: ValidationMessages.notValidData });
        }
        return true;
      },
    }),
    licenseIssueDate: yup
      .object()
      // TODO => разобраться с типами
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      .dayjs()
      .typeError(ValidationMessages.notValidData)
      .nullable(),
    licenseExpirationDate: yup
      .object()
      // TODO => разобраться с типами
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      .dayjs()
      .nullable()
      .typeError(ValidationMessages.notValidData),
    userGroups: yup.array().test({
      name: 'userGroups',
      test(value, ctx) {
        if (value.length === 0) {
          return ctx.createError({ message: ValidationMessages.required });
        }
        return true;
      },
    }),
  });

export const isDisabledAdminRole = (id: ID, value: Value, roles: Values): boolean => {
  const selectedRolesIds = roles.map((rol) => rol.value);
  const hasSelectedRoles = selectedRolesIds.length > 0;
  const isAdminRoleSelect = selectedRolesIds?.includes(100);
  const isNotAdminRole = value.value !== 100;

  if (!hasSelectedRoles && !id) return false;
  if (isAdminRoleSelect && isNotAdminRole && !id) return true;
  if (isAdminRoleSelect && isNotAdminRole && !id) return true;

  if (!isAdminRoleSelect && !isNotAdminRole && !id) return true;

  if (id && !isNotAdminRole) return true;
};
