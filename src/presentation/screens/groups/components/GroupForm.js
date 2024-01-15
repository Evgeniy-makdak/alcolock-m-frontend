import { useEffect } from 'react';

import { getGroup } from '../../../../internal/effector/groups/effects';
import { userStore } from '../../../../internal/effector/user/store';
import Form from '../../../shared/ui/form/Form';
import Input from '../../../shared/ui/form/components/Input';

const GroupForm = ({ onValidSubmit, formSelectors, selectedItem }) => {
  const user = userStore.userData.useValue();
  const setInitData = formSelectors.useSetInitFormData();

  useEffect(() => {
    if (selectedItem) {
      getGroup(selectedItem.id).then((res) => {
        if (res) {
          setInitData({
            ...res,
            user: res.user?.id ?? null,
          });
        }
      });
    } else {
      setInitData({
        user: user.id,
      });
    }
  }, [selectedItem]);

  return (
    <Form formSelectors={formSelectors} onValidSubmit={onValidSubmit}>
      <Input
        formSelectors={formSelectors}
        fieldParams={{
          name: 'name',
          label: 'Название группы',
        }}
      />
    </Form>
  );
};

export default GroupForm;
