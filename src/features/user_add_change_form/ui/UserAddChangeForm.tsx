/* eslint-disable @typescript-eslint/no-unused-vars */
import { type FC } from 'react';

import { Checkbox, TextField, Typography } from '@mui/material';

import { AppConstants } from '@app/index';
import { RolesSelect } from '@entities/roles_select';
import { InputsColumnWrapper } from '@shared/components/Inputs_column_wrapper';
import { ButtonFormWrapper } from '@shared/components/button_form_wrapper/ButtonFormWrapper';
import type { ID } from '@shared/types/BaseQueryTypes';
import { Button } from '@shared/ui/button';
import { FieldSelect } from '@shared/ui/field_select';
import { InputDate } from '@shared/ui/input_date/InputDate';
import { Loader } from '@shared/ui/loader';
import { PhoneInput } from '@shared/ui/phone_input';

import { useUserAddChangeForm } from '../hooks/useUserAddChangeForm';
import { isDisabledAdminRole } from '../lib/validate';
import style from './UserAddChangeForm.module.scss';

type UserAddChangeFormProps = {
  closeModal: () => void;
  id?: ID;
};

export const UserAddChangeForm: FC<UserAddChangeFormProps> = ({ closeModal, id }) => {
  const {
    isLoading,
    onSelectLicenseClass,
    userGroups,
    handleSubmit,
    register,
    errorFirstName,
    errorMiddleName,
    errorLastName,
    errorEmail,
    errorPassword,
    phone,
    licenseClass,
    errorUserGroups,
    onSelectUserGroups,
    setPhone,
    date,
    onChangeDate,
    accessList,
    disabled,
    errorLicenseCode,
    onChangeAccess,
    errorLicenseExpirationDate,
    errorLicenseIssueDate,
    licenseExpirationDate,
    licenseIssueDate,
    disableDriverInfo,
    showLicenseCode,
    errorPhone,
  } = useUserAddChangeForm(id, closeModal);
  return (
    <Loader isLoading={isLoading}>
      <form className={style.inputsWrapper} onSubmit={handleSubmit}>
        <Typography fontWeight={600} marginBottom={2} variant="h6">
          {id ? 'Редактирование пользователя' : 'Добавление пользователя'}
        </Typography>
        {!isLoading && (
          <>
            <div className={style.columnsWrapper}>
              <InputsColumnWrapper>
                <TextField
                  error={!!errorFirstName}
                  helperText={errorFirstName}
                  label="Имя"
                  {...register('firstName')}
                />
                <TextField
                  error={!!errorMiddleName}
                  helperText={errorMiddleName}
                  label="Фамилия"
                  {...register('middleName')}
                />
                <TextField
                  error={!!errorLastName}
                  helperText={errorLastName}
                  label="Отчество"
                  {...register('lastName')}
                />
                <InputDate
                  label="Дата рождения"
                  value={date}
                  disableFuture
                  onChange={(value) => onChangeDate('birthDate', value)}
                />
                <PhoneInput error={errorPhone} value={phone} setValue={setPhone} />
                <TextField
                  helperText={errorEmail}
                  error={!!errorEmail}
                  label={'Почта'}
                  {...register('email')}
                />
                <TextField
                  helperText={errorPassword}
                  error={!!errorPassword}
                  label={'Пароль'}
                  {...register('password')}
                />
                <FieldSelect
                  labelText="Доступ"
                  onChange={onChangeAccess}
                  selectProps={{ value: disabled }}
                  options={accessList}
                />
              </InputsColumnWrapper>
              <InputsColumnWrapper>
                <RolesSelect
                  getOptionDisabled={(op) => {
                    return isDisabledAdminRole(id, op, userGroups);
                  }}
                  readOnly={id && userGroups && !!userGroups.find((item) => item.value === 100)}
                  helperText={errorUserGroups}
                  error={!!errorUserGroups}
                  label="Роли"
                  setValueStore={onSelectUserGroups}
                  multiple
                  value={userGroups}
                  name={'userGroups'}
                  disableCloseOnSelect
                />
                <TextField
                  disabled={!showLicenseCode}
                  helperText={errorLicenseCode}
                  error={!!errorLicenseCode}
                  label={'Номер ВУ'}
                  {...register('licenseCode')}
                />
                <InputDate
                  disabled={disableDriverInfo}
                  slotProps={{
                    textField: {
                      error: !!errorLicenseIssueDate,
                      helperText: errorLicenseIssueDate,
                    },
                  }}
                  label="Дата выдачи"
                  value={licenseIssueDate}
                  disableFuture
                  onChange={(value) => onChangeDate('licenseIssueDate', value)}
                />
                <InputDate
                  disabled={disableDriverInfo}
                  slotProps={{
                    textField: {
                      error: !!errorLicenseExpirationDate,
                      helperText: errorLicenseExpirationDate,
                    },
                  }}
                  label="Дата окончания действия"
                  value={licenseExpirationDate}
                  onChange={(value) => onChangeDate('licenseExpirationDate', value)}
                />
                <div
                  className={`${style.wrapperCategories} ${disableDriverInfo ? style.disabledDriverData : ''}`}>
                  {AppConstants.categoryTypesList.map((category) => {
                    return (
                      <div className={style.categoriesItem} key={category.label}>
                        <Checkbox
                          checked={licenseClass?.includes(category.value)}
                          onClick={() => onSelectLicenseClass(category.value)}
                          disabled={disableDriverInfo}
                        />
                        <span>{category.label}</span>
                      </div>
                    );
                  })}
                </div>
              </InputsColumnWrapper>
            </div>
            <ButtonFormWrapper>
              <Button type="submit">{id ? 'сохранить' : 'добавить'}</Button>
              <Button onClick={closeModal}>отмена</Button>
            </ButtonFormWrapper>
          </>
        )}
      </form>
    </Loader>
  );
};
