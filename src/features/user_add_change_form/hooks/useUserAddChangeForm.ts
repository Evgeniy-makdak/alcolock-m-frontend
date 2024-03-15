/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form';

import dayjs, { type Dayjs } from 'dayjs';

import { AppConstants } from '@app/index';
import { yupResolver } from '@hookform/resolvers/yup';
import { appStore } from '@shared/model/app_store/AppStore';
import type { ID } from '@shared/types/BaseQueryTypes';
import type { Value, Values } from '@shared/ui/search_multiple_select';
import ArrayUtils from '@shared/utils/ArrayUtils';

import { useUserAddChangeFormApi } from '../api/useUserAddChangeFormApi';
import { getDataForRequest } from '../lib/getDataForRequest';
import { userGroupsMapper } from '../lib/userGroupsMapper';
import { type Form, schema } from '../lib/validate';

export const useUserAddChangeForm = (id?: ID, closeModal?: () => void) => {
  const selectedBranch = appStore.getState().selectedBranchState;
  const { user, isLoading, changeItem, createItem } = useUserAddChangeFormApi(id);
  const userGroupsInit = userGroupsMapper(user);

  const accessList = AppConstants.accessList.map((val) => ({
    value: `${val.value}`,
    label: val.label,
  }));

  const birthDate = user && user?.birthDate ? dayjs(user?.birthDate) : null;
  const disabled = `${user ? accessList.find((item) => item.value === `${user?.disabled}`)?.value : false}`;
  const licenseIssueDate =
    user && user?.driver?.licenseIssueDate ? dayjs(user?.driver?.licenseIssueDate) : null;

  const licenseExpirationDate =
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
    licenseExpirationDate: licenseExpirationDate,
    licenseIssueDate: licenseIssueDate,
    licenseClass: user ? user?.driver?.licenseClass : [],
    licenseCode: user ? user?.driver?.licenseCode : '',
    userGroups: userGroupsInit,
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
        licenseCode,
        licenseIssueDate: licenseIssueDateError,
        licenseExpirationDate: licenseExpirationDateError,
        phone: phoneError,
      },
    },
  } = useForm<any>({
    resolver: yupResolver(schema(id)),
    values: defaultValues,
  });

  const onSelectLicenseClass = (value: string) => {
    const licenseClass = getValues()?.licenseClass;
    const newLicenseClass = licenseClass?.includes(value)
      ? licenseClass.filter((val: string) => val !== value)
      : [...licenseClass, value];
    setValue('licenseClass', newLicenseClass);
  };
  const onSelectUserGroups = (type: string, value: string | Value | (string | Value)[]) => {
    const values = ArrayUtils.getArrayValues(value);
    clearErrors(type);
    setValue(type, values);
  };

  const onChangeDate = (type: string, value: Dayjs) => {
    clearErrors(type);
    setValue(type, value);
  };

  const onChangeAccess = (value: ID) => {
    setValue('disabled', value);
  };

  const setPhone = (value: string, type = 'phone') => {
    clearErrors(type);
    setValue(type, value);
  };

  const errorFirstName = firstName ? firstName.message.toString() : '';
  const errorMiddleName = middleName ? middleName.message.toString() : '';
  const errorLastName = lastName ? lastName.message.toString() : '';
  const errorEmail = email ? email.message.toString() : '';
  const errorPassword = password ? password.message.toString() : '';
  const errorUserGroups = userGroupsError ? userGroupsError.message.toString() : '';
  const errorLicenseCode = licenseCode ? licenseCode.message.toString() : '';
  const errorPhone = phoneError ? phoneError.message.toString() : '';
  const errorLicenseIssueDate = licenseIssueDateError
    ? licenseIssueDateError.message.toString()
    : '';
  const errorLicenseExpirationDate = licenseExpirationDateError
    ? licenseExpirationDateError.message.toString()
    : '';

  const onSubmit = async (data: Form) => {
    const reqBody = getDataForRequest(data, 'id' in selectedBranch ? selectedBranch.id : null);
    id ? await changeItem(reqBody) : await createItem(reqBody);
    closeModal();
  };
  const userGroups = watch('userGroups') as Values;
  const showLicenseCode = !!userGroups.find((item) => item.value === 200 || item.value === 300);
  const disableDriverInfo = watch('licenseCode')?.length === 0;

  return {
    register,
    showLicenseCode,
    handleSubmit: handleSubmit(onSubmit, console.log),
    isLoading,
    onSelectLicenseClass,
    errorFirstName,
    errorMiddleName,
    errorLastName,
    userGroups,
    licenseClass: watch('licenseClass') || [],
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
    licenseIssueDate: watch('licenseIssueDate'),
    licenseExpirationDate: watch('licenseExpirationDate'),
    errorLicenseIssueDate,
    errorLicenseExpirationDate,
    disableDriverInfo,
    errorPhone,
  };
};
