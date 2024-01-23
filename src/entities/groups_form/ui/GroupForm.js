import { useEffect } from 'react';

import { userStore } from '@features/menu_button/model/store';
import { getGroup } from '@pages/groups/model/effects';
import { Form } from '@shared/ui/form';
import { Input } from '@shared/ui/input';

export const GroupForm = ({ onValidSubmit, formSelectors, selectedItem }) => {
  // TODO => убрать сторы или добавить инициализацию стора к форме или прокидывать через пропсы
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
