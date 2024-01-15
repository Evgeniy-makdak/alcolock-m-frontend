import { useEffect } from 'react';

import AppConstants from '../../../../internal/app_constants';
import { getRole } from '../../../../internal/effector/roles/effects';
import { rolesStore } from '../../../../internal/effector/roles/store';
import Loader from '../../../shared/components/loader/Loader';
import Form from '../../../shared/ui/form/Form';
import Input from '../../../shared/ui/form/components/Input';
import Select from '../../../shared/ui/form/components/Select';

const RoleForm = ({ formSelectors, onValidSubmit, selectedItem }) => {
  const setInitData = formSelectors.useSetInitFormData();
  const userControl = formSelectors.useFormDataValue('user_control');
  const carControl = formSelectors.useFormDataValue('car_control');
  const setAttachmentsPermission = formSelectors.useSetFormDataValue('attachments_control');
  const loading = rolesStore.loadingData.useValue();
  const creating = rolesStore.creating.useValue();
  const changing = rolesStore.changing.useValue();

  useEffect(() => {
    if (!selectedItem) return;
    getRole(selectedItem.id).then((res) => {
      if (res) {
        setInitData(res);
      }
    });
  }, [selectedItem]);

  useEffect(() => {
    if (userControl === 1 && carControl === 1) {
      setAttachmentsPermission(1);
    } else if (userControl !== 3 && carControl !== 3) {
      setAttachmentsPermission(2);
    } else {
      setAttachmentsPermission(3);
    }
  }, [userControl, carControl]);

  return (
    <Loader isLoading={!!loading || !!changing || !!creating}>
      <Form onValidSubmit={onValidSubmit} formSelectors={formSelectors}>
        <Input
          formSelectors={formSelectors}
          fieldParams={{
            name: 'role',
            label: 'Название роли',
          }}
        />

        <Select
          formSelectors={formSelectors}
          fieldParams={{
            name: 'user_control',
            label: 'Пользователи',
          }}
          options={AppConstants.permissionsList}
        />

        <Select
          formSelectors={formSelectors}
          fieldParams={{
            name: 'car_control',
            label: 'ТС',
          }}
          options={AppConstants.permissionsList}
        />

        <Select
          formSelectors={formSelectors}
          fieldParams={{
            name: 'alkozamki_control',
            label: 'Алкозамки',
          }}
          options={AppConstants.permissionsList}
        />

        <Select
          formSelectors={formSelectors}
          fieldParams={{
            name: 'attachments_control',
            label: 'Привязки',
          }}
          options={AppConstants.permissionsList}
          disabled={true}
        />
      </Form>
    </Loader>
  );
};

export default RoleForm;
