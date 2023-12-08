import Form from "../../../shared/ui/form/Form";
import MultipleSearchSelect from "../../../shared/ui/form/components/MultipleSearchSelect";
import {searchCars} from "../../../../internal/effector/vehicles/effects";
import {groupsStore} from "../../../../internal/effector/groups/store";
import Loader from "../../../shared/components/loader/Loader";

const AddCarForm = (
  {
    formSelectors,
    onValidSubmit,
    groupId
  }) => {
  const loading = groupsStore.carsMoveLoading.useValue()

  const optionsMapper = (option) => ({
    value: option.value,
    label: `${option.value.manufacturer} ${option.value.model} ${option.value.registrationNumber} (${option.value?.assignment?.branch?.name ?? '-'})`
  })

  return (
    <Loader isLoading={loading}>
      <Form
        formSelectors={formSelectors}
        onValidSubmit={onValidSubmit}
      >
        <MultipleSearchSelect
          formSelectors={formSelectors}
          onValidSubmit={onValidSubmit}
          optionsMapper={optionsMapper}
          fieldParams={{
            name: 'car',
            label: 'Поиск по ТС'
          }}
          onSearch={(query) => searchCars({query, excludeGroupId: groupId})}
        />
      </Form>
    </Loader>
  )
}

export default AddCarForm
