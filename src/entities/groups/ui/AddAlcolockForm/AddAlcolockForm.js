import { searchAlcolocks } from '@pages/alkozamki/model/effects';
import { groupsStore } from '@pages/groups/model/store';
import Form from '@shared/ui/form/Form';
import Loader from '@shared/ui/loader/Loader';
import MultipleSearchSelect from '@shared/ui/multiple_search_select/MultipleSearchSelect';

const AddAlcolockForm = ({ formSelectors, onValidSubmit, groupId }) => {
  const loading = groupsStore.alcolocksMoveLoading.useValue();

  const optionsMapper = (option) => ({
    value: option.value,
    label: `${option.value.name} ${option.value.serialNumber} (${option.value?.assignment?.branch?.name ?? '-'})`,
  });

  return (
    <Loader isLoading={loading}>
      <Form formSelectors={formSelectors} onValidSubmit={onValidSubmit}>
        <MultipleSearchSelect
          optionsMapper={optionsMapper}
          formSelectors={formSelectors}
          fieldParams={{
            name: 'alcolock',
            label: 'Поиск по алкозамкам',
          }}
          onSearch={(query) => searchAlcolocks({ query, excludeGroupId: groupId })}
        />
      </Form>
    </Loader>
  );
};

export default AddAlcolockForm;
