import type { CreateUserData, ID } from '@shared/types/BaseQueryTypes';
import ArrayUtils from '@shared/utils/ArrayUtils';

import { type Form } from './validate';

export const getDataForRequest = (data: Form, branchId: ID): CreateUserData => {
  const userGroups = data?.userGroups;
  const userGroupsIds = ArrayUtils.getArrayFromValues(userGroups);
  const licenseCode = data?.licenseCode;
  const licenseCodeLengthMoreZero = licenseCode.trim().length > 0;
  const phone = data?.phone?.trim();
  const lastName = data?.lastName || '';
  const password = data?.password;
  const birthDate = data?.birthDate?.format('YYYY-MM-DD');
  const licenseExpirationDate =
    licenseCodeLengthMoreZero && data?.licenseExpirationDate
      ? data?.licenseExpirationDate?.format('YYYY-MM-DD')
      : null;
  const licenseIssueDate =
    licenseCodeLengthMoreZero && data?.licenseIssueDate
      ? data?.licenseIssueDate?.format('YYYY-MM-DD')
      : null;

  const reqBody: CreateUserData = {
    branchId: branchId,
    disabled: data?.disabled === 'true' ? true : false,
    email: data.email,
    firstName: data?.firstName,
    middleName: data?.middleName,
    lastName,
    userGroups: userGroupsIds,
    driver: {
      licenseCode: data?.licenseCode ? data?.licenseCode : null,
      licenseClass: data?.licenseClass || [],
      licenseExpirationDate: licenseExpirationDate,
      licenseIssueDate: licenseIssueDate,
    },
  };

  if (password) {
    reqBody.password = password;
  }

  if (phone) {
    reqBody.phone = phone;
  }

  if (birthDate) {
    reqBody.birthDate = birthDate;
  }

  return reqBody;
};
