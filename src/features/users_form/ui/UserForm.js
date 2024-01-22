import { useEffect } from 'react';

// TODO => вынести всё использование dayjs в shared слой, там экспортировать готовые функции
import dayjs from 'dayjs';

import { AppConstants } from '@app';
import { DateInput } from '@entities/date_input';
import { CategoriesSelect } from '@entities/users_categories_select';
import { RolesSelect } from '@entities/users_roles_select';
import { userMapper } from '@pages/users/hooks/mapper';
import { getUser } from '@pages/users/model/effects';
import { usersStore } from '@pages/users/model/store';
import { ErrorViewer } from '@shared/ui/error_viewer';
import { Form } from '@shared/ui/form';
import { Input } from '@shared/ui/input';
import { Loader } from '@shared/ui/loader';
import { PhoneInput } from '@shared/ui/phone_input';
import { Select } from '@shared/ui/select';
import { getErrorMessagesFromServer } from '@shared/validations/server_error_handler';

import style from './UserForm.module.scss';

export const UserForm = ({ formSelectors, onValidSubmit, selectedItem = null }) => {
  const setInitData = formSelectors.useSetInitFormData();
  const license = formSelectors.useFormDataValue('licenseCode');
  const rolesIds = formSelectors.useFormDataValue('userGroups');
  const isDriver = (rolesIds ?? []).includes(200);
  const loading = usersStore.dataLoading.useValue();
  const creating = usersStore.creating.useValue();
  const changing = usersStore.changing.useValue();
  const [error, setError] = usersStore.userError.useState();
  const serverErrorMessages = getErrorMessagesFromServer(error);
  const fieldsErrors = error?.response?.fieldErrors;
  const isValidationAvailable = formSelectors.useIsValidationsAvailable();
  const validateAllFields = formSelectors.useValidateAllFields();

  useEffect(() => {
    setError(null);
  }, []);

  useEffect(() => {
    if (!selectedItem) return;

    getUser(selectedItem.id)
      .then((res) => {
        if (res) {
          setInitData(userMapper(res));
        }
      })
      .catch((err) => {
        console.log('UserForm error', err?.response);
      });
  }, [selectedItem]);

  const withChangeLicenseCode = () => {
    if (isValidationAvailable) {
      validateAllFields();
    }
  };

  return (
    <Loader isLoading={!!loading || !!creating || !!changing}>
      <Form formSelectors={formSelectors} onValidSubmit={onValidSubmit} className={style.userForm}>
        <div className={style.column}>
          <Input
            formSelectors={formSelectors}
            fieldParams={{
              name: 'name',
              label: 'ФИО пользователя',
            }}
          />

          <DateInput
            formSelectors={formSelectors}
            fieldParams={{
              name: 'birthDate',
              label: 'Дата рождения',
            }}
            maxDate={dayjs(Date.now())}
          />

          <PhoneInput
            formSelectors={formSelectors}
            fieldParams={{
              name: 'phone',
              label: 'Номер телефона',
            }}
          />

          <Input
            formSelectors={formSelectors}
            fieldParams={{
              name: 'email',
              label: 'Почта',
            }}
          />

          <Input
            formSelectors={formSelectors}
            fieldParams={{
              name: 'password',
              label: 'Пароль',
              type: 'password',
            }}
            fieldsErrors={fieldsErrors}
          />

          <RolesSelect
            formSelectors={formSelectors}
            fieldParams={{
              name: 'userGroups',
              label: 'Роли',
            }}
            isEdit={!!selectedItem}
          />

          <Select
            formSelectors={formSelectors}
            fieldParams={{
              name: 'disabled',
              label: 'Доступ',
            }}
            options={AppConstants.accessList}
          />
        </div>

        <div className={style.column}>
          <Input
            formSelectors={formSelectors}
            fieldParams={{
              name: 'licenseCode',
              label: 'Номер ВУ',
            }}
            disabled={!isDriver}
            withChange={withChangeLicenseCode}
          />

          <DateInput
            formSelectors={formSelectors}
            fieldParams={{
              name: 'licenseIssueDate',
              label: 'Дата выдачи',
            }}
            disabled={!license || !isDriver}
            maxDate={dayjs(Date.now())}
          />

          <DateInput
            formSelectors={formSelectors}
            fieldParams={{
              name: 'licenseExpirationDate',
              label: 'Дата окончания действия',
            }}
            disabled={!license || !isDriver}
          />

          <CategoriesSelect
            formSelectors={formSelectors}
            fieldParams={{
              name: 'licenseClass',
              label: 'Категории',
            }}
            disabled={!license || !isDriver}
          />
        </div>
      </Form>

      {!!serverErrorMessages.length && <ErrorViewer errorMessages={serverErrorMessages} />}
    </Loader>
  );
};
