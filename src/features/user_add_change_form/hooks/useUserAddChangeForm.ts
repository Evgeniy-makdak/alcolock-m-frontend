import { useState } from 'react';
import { useForm } from 'react-hook-form';

import dayjs, { type Dayjs } from 'dayjs';

import { AppConstants } from '@app/index';
import { yupResolver } from '@hookform/resolvers/yup';
import { appStore } from '@shared/model/app_store/AppStore';
import type { ID } from '@shared/types/BaseQueryTypes';
import type { Value } from '@shared/ui/search_multiple_select';
import ArrayUtils from '@shared/utils/ArrayUtils';
import { ValidationRules } from '@shared/validations/validation_rules';

import { useUserAddChangeFormApi } from '../api/useUserAddChangeFormApi';
import { getDataForRequest } from '../lib/getDataForRequest';
import { groupsMapper } from '../lib/groupsMapper';
import { type Form, type KeyForm, schema } from '../lib/validate';

export const useUserAddChangeForm = (id?: ID, closeModal?: () => void) => {
  const selectedBranch = appStore.getState().selectedBranchState;
  const { user, isLoading, changeItem, createItem, groups } = useUserAddChangeFormApi(id);
  const { values, isGlobalAdmin } = groupsMapper(user, groups);
  const [alert, setAlert] = useState(false);

  const accessList = AppConstants.accessList.map((val) => ({
    value: `${val.value}`,
    label: val.label,
  }));

  const birthDate = user && user?.birthDate ? dayjs(user?.birthDate) : null;
  const disabled = `${user ? accessList.find((item) => item.value === `${user?.disabled}`)?.value : false}`;
  const licenseIssueDateInit =
    user && user?.driver?.licenseIssueDate ? dayjs(user?.driver?.licenseIssueDate) : null;

  const licenseExpirationDateInit =
    user && user?.driver?.licenseExpirationDate ? dayjs(user?.driver?.licenseExpirationDate) : null;

  const defaultValues: Form = {
    firstName: user ? user?.firstName : '',
    middleName: user ? user?.middleName : '',
    lastName: user ? user?.lastName : '',
    birthDate: birthDate,
    phone: user ? user?.phone : '',
    disabled: disabled,
    email: user ? user?.email : '',
    password: '',
    licenseExpirationDate: licenseExpirationDateInit,
    licenseIssueDate: licenseIssueDateInit,
    licenseClass: user ? user?.driver?.licenseClass : [],
    licenseCode: user ? user?.driver?.licenseCode : '',
    userGroups: values,
  };

  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    setValue,
    getValues,
    formState: {
      errors: {
        firstName,
        middleName,
        lastName,
        email,
        password,
        userGroups: userGroupsError,
        licenseCode: licenseCodeError,
        licenseIssueDate: licenseIssueDateError,
        licenseExpirationDate: licenseExpirationDateError,
        phone: phoneError,
        licenseClass: licenseClassError,
      },
    },
  } = useForm({
    resolver: yupResolver(schema(id)),
    values: defaultValues,
  });

  const onSelectLicenseClass = (value: string) => {
    const licenseClass = getValues()?.licenseClass || [];
    const newLicenseClass = licenseClass?.includes(value)
      ? licenseClass.filter((val: string) => val !== value)
      : [...licenseClass, value];
    setValue('licenseClass', newLicenseClass);
  };
  const onSelectUserGroups = (type: KeyForm, value: string | Value | (string | Value)[]) => {
    const values = ArrayUtils.getArrayValues(value);
    clearErrors(type);
    setValue(type, values);
  };

  const onChangeDate = (type: KeyForm, value: Dayjs) => {
    clearErrors(type);
    setValue(type, value);
  };

  const onChangeAccess = (value: ID) => {
    setValue('disabled', value);
  };

  const setPhone = (value: string, type: KeyForm = 'phone') => {
    clearErrors(type);
    setValue(type, value);
  };

  const setLicenseCode = (value: string | undefined) => {
    if (!value || value?.length === 0) {
      clearErrors(['licenseClass', 'licenseExpirationDate', 'licenseIssueDate', 'licenseCode']);
    }
    const error = ValidationRules.driverLicenseValidation(value);
    if (!error) {
      clearErrors('licenseCode');
    }
    setValue('licenseCode', value);
  };

  const errorFirstName = firstName ? firstName.message.toString() : '';
  const errorMiddleName = middleName ? middleName.message.toString() : '';
  const errorLastName = lastName ? lastName.message.toString() : '';
  const errorEmail = email ? email.message.toString() : '';
  const errorPassword = password ? password.message.toString() : '';
  const errorUserGroups = userGroupsError ? userGroupsError.message.toString() : '';
  const errorLicenseCode = licenseCodeError ? licenseCodeError.message.toString() : '';
  const errorPhone = phoneError ? phoneError.message.toString() : '';
  const errorLicenseIssueDate = licenseIssueDateError
    ? licenseIssueDateError.message.toString()
    : '';
  const errorLicenseExpirationDate = licenseExpirationDateError
    ? licenseExpirationDateError.message.toString()
    : '';
  const errorLicenseClass = licenseClassError ? licenseClassError.message?.toString() : '';

  const userGroups = watch('userGroups');
  const disableDriverInfo = watch('licenseCode')?.trim().length === 0;
  const licenseClass = watch('licenseClass') || [];
  const licenseIssueDate = watch('licenseIssueDate');
  const licenseExpirationDate = watch('licenseExpirationDate');
  const licenseCode = watch('licenseCode');

  const onSubmit = async (data: Form) => {
    console.log("Данные, отправляемые на сервер:", data);
    const licenseClass = (data?.licenseClass || []).length > 0;
    const licenseIssueDate = !!data?.licenseIssueDate;
    const licenseExpirationDate = !!data?.licenseExpirationDate;
    if (
      disableDriverInfo &&
      (licenseClass || licenseIssueDate || licenseExpirationDate) &&
      !alert
    ) {
      setAlert(true);
      return;
    }
    const reqBody = getDataForRequest(data, 'id' in selectedBranch ? selectedBranch.id : null);
    const answer = id ? await changeItem(reqBody) : await createItem(reqBody);

    !answer.isError && closeModal();
  };

  const closeAlert = () => {
    setAlert(false);
  };

  return {
    errorLicenseClass,
    register,
    handleSubmit: handleSubmit(onSubmit),
    isLoading,
    onSelectLicenseClass,
    errorFirstName,
    errorMiddleName,
    isGlobalAdmin,
    errorLastName,
    userGroups,
    licenseClass,
    phone: watch('phone'),
    setPhone,
    onChangeDate,
    errorEmail,
    date: watch('birthDate'),
    errorPassword,
    onSelectUserGroups,
    errorUserGroups,
    errorLicenseCode,
    disabled: watch('disabled'),
    accessList,
    onChangeAccess,
    licenseIssueDate,
    licenseExpirationDate,
    errorLicenseIssueDate,
    errorLicenseExpirationDate,
    disableDriverInfo,
    errorPhone,
    setLicenseCode,
    licenseCode,
    closeAlert,
    alert,
  };
};
