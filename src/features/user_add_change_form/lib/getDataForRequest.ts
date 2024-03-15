import type { CreateUserData, ID } from '@shared/types/BaseQueryTypes';
import ArrayUtils from '@shared/utils/ArrayUtils';

import type { Form } from './validate';

export const getDataForRequest = (data: Form, branchId: ID): CreateUserData => {
  const userGroups = ArrayUtils.getArrayFromValues(data?.userGroups);
  const licenseCode = data?.licenseCode;
  const licenseCodeLengthMoreZero = licenseCode.trim().length > 0;
  const phone = data?.phone;
  const password = data?.password;
  const reqBody: CreateUserData = {
    birthDate: data?.birthDate?.format('YYYY-MM-DD'),
    branchId: branchId,
    disabled: data?.disabled === 'true' ? true : false,
    email: data.email,
    firstName: data.firstName,
    middleName: data?.middleName,
    lastName: data?.lastName,
    phone: phone.trim().length === 0 ? null : phone,
    userGroups,
    driver: {
      licenseCode: data?.licenseCode,
      licenseClass: licenseCodeLengthMoreZero ? data?.licenseClass : [],
      licenseExpirationDate: licenseCodeLengthMoreZero
        ? data?.licenseExpirationDate?.format('YYYY-MM-DD')
        : '',
      licenseIssueDate: licenseCodeLengthMoreZero
        ? data?.licenseIssueDate?.format('YYYY-MM-DD')
        : '',
    },
  };

  if (password) {
    reqBody.password = password;
  }

  return reqBody;
};
/**
 * birthDate:"2000-03-10"
branchId:20
disabled:false
driver:{licenseCode: "1010200010", licenseIssueDate: "2018-10-10", licenseExpirationDate: "2028-10-10",…}
email:"testemail@yandex.ru"
firstName:"Берёт"
lastName:"Константин"
middleName:"Гитару"
password:"1010"
phone:"+73242342342"
userGroups:[200, 400, 500, 1223, 300, 2190]
 * 
 * 
 * birthDate: "2000-10-10"
branchId: 20
disabled: false
driver: {licenseCode: "1234324234", licenseIssueDate: "2024-03-01", licenseExpirationDate: "2024-03-31",…}
email: "testKonstemail@yandex.ru"
firstName: "Konst"
lastName: "Bush"
middleName: "Vict"
password: "1010"
phone: "+79500176825"
userGroups: [200, 1223, 300, 2190, 400, 500]
 * 
 */
