import { searchAlcolocks } from '../../../../internal/effector/alkozamki/effects';
import { groupsStore } from '../../../../internal/effector/groups/store';
import Loader from '../../../shared/components/loader/Loader';
import Form from '../../../shared/ui/form/Form';
import MultipleSearchSelect from '../../../shared/ui/form/components/MultipleSearchSelect';

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
