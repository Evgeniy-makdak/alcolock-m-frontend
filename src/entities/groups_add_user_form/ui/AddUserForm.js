import { groupsStore } from '@pages/groups/model/store';
import { searchUsers } from '@pages/users/model/effects';
import { Form } from '@shared/ui/form';
import { Loader } from '@shared/ui/loader';
import { MultipleSearchSelect } from '@shared/ui/multiple_search_select';

export const AddUserForm = ({ formSelectors, onValidSubmit, groupId }) => {
  const loading = groupsStore.usersMoveLoading.useValue();

  return (
    <Loader isLoading={loading}>
      <Form formSelectors={formSelectors} onValidSubmit={onValidSubmit}>
        <MultipleSearchSelect
          formSelectors={formSelectors}
          fieldParams={{
            name: 'user',
            label: 'Поиск по пользователю',
          }}
          onSearch={(query) => searchUsers({ query, excludeGroupId: groupId })}
        />
      </Form>
    </Loader>
  );
};
