import { groupsStore } from '@pages/groups/model/store';
import { searchCars } from '@pages/vehicles/model/effects';
import { Form } from '@shared/ui/form';
import { Loader } from '@shared/ui/loader';
import { MultipleSearchSelect } from '@shared/ui/multiple_search_select';

export const AddCarForm = ({ formSelectors, onValidSubmit, groupId }) => {
  const loading = groupsStore.carsMoveLoading.useValue();

  const optionsMapper = (option) => ({
    value: option.value,
    label: `${option.value.manufacturer} ${option.value.model} ${option.value.registrationNumber} (${option.value?.assignment?.branch?.name ?? '-'})`,
  });

  return (
    <Loader isLoading={loading}>
      <Form formSelectors={formSelectors} onValidSubmit={onValidSubmit}>
        <MultipleSearchSelect
          formSelectors={formSelectors}
          onValidSubmit={onValidSubmit}
          optionsMapper={optionsMapper}
          fieldParams={{
            name: 'car',
            label: 'Поиск по ТС',
          }}
          onSearch={(query) => searchCars({ query, excludeGroupId: groupId })}
        />
      </Form>
    </Loader>
  );
};
