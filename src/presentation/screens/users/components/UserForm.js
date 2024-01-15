import dayjs from 'dayjs';

import { useEffect } from 'react';

import AppConstants from '../../../../internal/app_constants';
import { getUser } from '../../../../internal/effector/users/effects';
import { usersStore } from '../../../../internal/effector/users/store';
import { getErrorMessagesFromServer } from '../../../../internal/validations/server_error_handler';
import ErrorViewer from '../../../shared/components/errors/ErrorViewer';
import Loader from '../../../shared/components/loader/Loader';
import Form from '../../../shared/ui/form/Form';
import DateInput from '../../../shared/ui/form/components/DateInput';
import Input from '../../../shared/ui/form/components/Input';
import PhoneInput from '../../../shared/ui/form/components/PhoneInput';
import Select from '../../../shared/ui/form/components/Select';
import { userMapper } from '../mapper';
import CategoriesSelect from './CategoriesSelect';
import RolesSelect from './RolesSelect';
import './UserForm.sass';

const UserForm = ({ formSelectors, onValidSubmit, selectedItem = null }) => {
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
      <Form formSelectors={formSelectors} onValidSubmit={onValidSubmit} className={'user-form'}>
        <div className="user-form__column">
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

        <div className="user-form__column">
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

export default UserForm;
