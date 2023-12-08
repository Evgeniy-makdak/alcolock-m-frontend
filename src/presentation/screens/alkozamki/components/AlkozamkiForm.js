import Form from "../../../shared/ui/form/Form";
import Input from "../../../shared/ui/form/components/Input";
import {useEffect} from "react";
import {getItem} from "../../../../internal/effector/alkozamki/effects";
import SearchSelect from "../../../shared/ui/form/components/SearchSelect";
import {alkozamkiStore} from "../../../../internal/effector/alkozamki/store";
import Loader from "../../../shared/components/loader/Loader";
import {searchCars, SearchCarsType} from "../../../../internal/effector/vehicles/effects";

const AlkozamkiForm = (
  {
    formSelectors,
    onValidSubmit,
    selectedItem
  }) => {
  const setInitData = formSelectors.useSetInitFormData()
  const loading = alkozamkiStore.loadingData.useValue()
  const creating = alkozamkiStore.creating.useValue()
  const changing = alkozamkiStore.changing.useValue()

  useEffect(() => {
    if (selectedItem) {
      getItem(selectedItem.id)
        .then(res => {
          if (res) {
            setInitData(res)
          }
        })
        .catch(err => {
          console.log('AlkozamkiForm get data error', err?.response ?? err)
        })
    }
  }, [selectedItem])

  const selectValueFormatter = (item) => {
    return item
      ? {
        value: item,
        label: `${item.manufacturer} ${item.model}, ${item.registrationNumber}`
      }
      : null
  }

  return (
    <Loader isLoading={!!loading || !!creating || !!changing}>
      <Form
        formSelectors={formSelectors}
        onValidSubmit={onValidSubmit}
      >
        <Input
          formSelectors={formSelectors}
          fieldParams={{
            name: 'name',
            label: 'Наименование'
          }}
        />
        <Input
          formSelectors={formSelectors}
          fieldParams={{
            name: 'serialNumber',
            label: 'Серийный номер'
          }}
          disabled={!!selectedItem}
        />
        <Input
          formSelectors={formSelectors}
          fieldParams={{
            name: 'serviceId',
            label: 'uid'
          }}
        />
        <SearchSelect
          formSelectors={formSelectors}
          fieldParams={{
            name: 'vehicle',
            label: 'Установлен на ТС',
          }}
          onSearch={(query) => searchCars({query: query, withoutAlcolock: true})}
          valueFormatter={selectValueFormatter}
        />
      </Form>
    </Loader>
  )
}

export default AlkozamkiForm
