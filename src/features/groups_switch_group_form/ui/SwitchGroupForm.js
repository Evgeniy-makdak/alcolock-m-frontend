import { useEffect } from 'react';

import { uploadGroupsList } from '@pages/groups/model/effects';
import { switchGroupFormSelectors } from '@pages/groups/model/forms';
import { groupsStore } from '@pages/groups/model/store';
import { Form } from '@shared/ui/form';
import { Loader } from '@shared/ui/loader';
import { SearchSelect } from '@shared/ui/search_select';

export const SwitchGroupForm = ({ groupInfo, onValidSubmit, loading }) => {
  const resetForm = switchGroupFormSelectors.useResetForm();
  const setInitData = switchGroupFormSelectors.useSetInitFormData();
  const groupDataLoading = groupsStore.groupLoading.useValue();

  useEffect(() => {
    if (!groupInfo?.id) return;

    setInitData({ group: groupInfo });

    return () => {
      resetForm();
    };
  }, [groupInfo]);

  const handleSearchGroups = (query) => {
    return uploadGroupsList({
      query,
      page: 1,
      limit: 20,
      excludeGroupId: groupInfo?.id,
    })
      .then((result) => {
        return result.list.map((group) => ({
          value: group,
          label: group.name,
        }));
      })
      .catch((err) => {
        console.log('uploadGroupsList error in SwitchGroupForm', err?.response);
      });
  };

  const valueFormatter = (item) => {
    if (item) {
      return {
        value: item,
        label: item.name,
      };
    } else {
      return null;
    }
  };

  return (
    <Loader isLoading={groupDataLoading || loading}>
      <Form formSelectors={switchGroupFormSelectors} onValidSubmit={onValidSubmit}>
        <SearchSelect
          formSelectors={switchGroupFormSelectors}
          fieldParams={{
            name: 'group',
            label: 'Поиск по группам',
          }}
          onSearch={handleSearchGroups}
          valueFormatter={valueFormatter}
        />
      </Form>
    </Loader>
  );
};
