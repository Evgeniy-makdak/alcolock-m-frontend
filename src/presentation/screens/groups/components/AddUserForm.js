import { groupsStore } from '../../../../internal/effector/groups/store';
import { searchUsers } from '../../../../internal/effector/users/effects';
import Loader from '../../../shared/components/loader/Loader';
import Form from '../../../shared/ui/form/Form';
import MultipleSearchSelect from '../../../shared/ui/form/components/MultipleSearchSelect';

const AddUserForm = ({ formSelectors, onValidSubmit, groupId }) => {
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

export default AddUserForm;
