import { type FC } from 'react';

import { Checkbox, TextField, Typography } from '@mui/material';

import { AppConstants } from '@app/index';
import { RolesSelect } from '@entities/roles_select';
import { InputsColumnWrapper } from '@shared/components/Inputs_column_wrapper';
import { ButtonFormWrapper } from '@shared/components/button_form_wrapper/ButtonFormWrapper';
import type { ID } from '@shared/types/BaseQueryTypes';
import { AppAlert } from '@shared/ui/alert';
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
    errorPhone,
    isGlobalAdmin,
    errorLicenseClass,
    licenseCode,
    setLicenseCode,
    closeAlert,
    alert,
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
                  error={!!errorMiddleName}
                  helperText={errorMiddleName}
                  label="Фамилия"
                  {...register('middleName')}
                />
                <TextField
                  error={!!errorFirstName}
                  helperText={errorFirstName}
                  label="Имя"
                  {...register('firstName')}
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
                  getOptionDisabled={(op) => isDisabledAdminRole(op, userGroups)}
                  helperText={errorUserGroups}
                  error={!!errorUserGroups}
                  disabled={isGlobalAdmin}
                  label="Роли"
                  setValueStore={onSelectUserGroups}
                  multiple
                  value={userGroups}
                  name={'userGroups'}
                  disableCloseOnSelect
                />
                <TextField
                  helperText={errorLicenseCode}
                  error={!!errorLicenseCode}
                  label={'Номер ВУ'}
                  value={licenseCode}
                  onChange={(e) => setLicenseCode(e?.target?.value)}
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
                  {!!errorLicenseClass && <span className={style.error}>{errorLicenseClass}</span>}
                </div>
              </InputsColumnWrapper>
            </div>
            {!alert && (
              <ButtonFormWrapper>
                <Button type="submit">{id ? 'сохранить' : 'добавить'}</Button>
                <Button onClick={closeModal}>отмена</Button>
              </ButtonFormWrapper>
            )}
            {
              <AppAlert
                severity="warning"
                title="Введенные данные ВУ будут удалены"
                type="submit"
                onClose={closeAlert}
                open={alert}
              />
            }
          </>
        )}
      </form>
    </Loader>
  );
};
