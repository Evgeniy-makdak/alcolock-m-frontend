import Form from "../../../shared/ui/form/Form";
import Input from "../../../shared/ui/form/components/Input";
import {useEffect} from "react";
import Select from "../../../shared/ui/form/components/Select";
import AppConstants from "../../../../internal/app_constants";
import {getCar} from "../../../../internal/effector/vehicles/effects";
import SearchSelect from "../../../shared/ui/form/components/SearchSelect";
import Loader from "../../../shared/components/loader/Loader";
import {vehiclesStore} from "../../../../internal/effector/vehicles/store";

const VehiclesForm = (
  {
    formSelectors,
    onValidSubmit,
    selectedItem
  }) => {
  const setInitData = formSelectors.useSetInitFormData()
  const loadingData = vehiclesStore.carDataLoading.useValue()
  const creating = vehiclesStore.createCarLoading.useValue()
  const changing = vehiclesStore.changing.useValue()

  useEffect(() => {
    if (!selectedItem) return
    getCar(selectedItem.id)
      .then(res => {
        if (res) {
          setInitData(res)
        }
      })
      .catch(err => {
        console.log('VehiclesForm getCar error', err?.response ?? err)
      })
  }, [selectedItem])

  const colorSelectValueFormatter = (value) => {
    return AppConstants.carColorsList.find(item => item.value === value) ?? null
  }

  const typeSelectValueFormatter = (value) => AppConstants.carTypesList.find(item => item.value === value) ?? null

 return (
   <Loader isLoading={!!loadingData || !!creating || !!changing}>
     <Form
       formSelectors={formSelectors}
       onValidSubmit={onValidSubmit}
     >
       <Input
         formSelectors={formSelectors}
         fieldParams={{
           name: 'manufacturer',
           label: 'Марка'
         }}
       />
       <Input
         formSelectors={formSelectors}
         fieldParams={{
           name: 'model',
           label: 'Модель'
         }}
       />
       <SearchSelect
         formSelectors={formSelectors}
         fieldParams={{
           name: 'type',
           label: 'Тип'
         }}
         defOptions={AppConstants.carTypesList}
         valueFormatter={typeSelectValueFormatter}
       />
       <Input
         formSelectors={formSelectors}
         fieldParams={{
           name: 'vin',
           label: 'VIN',
         }}
       />
        <SearchSelect
          formSelectors={formSelectors}
          fieldParams={{
            name: 'color',
            label: 'Цвет'
          }}
          valueFormatter={colorSelectValueFormatter}
          defOptions={AppConstants.carColorsList}
       />
       <Input
         formSelectors={formSelectors}
         fieldParams={{
           name: 'registrationNumber',
           label: 'Государственный номер'
         }}
       />
       <Input
         formSelectors={formSelectors}
         fieldParams={{
           name: 'year',
           label: 'Год выпуска'
         }}
       />
     </Form>
   </Loader>
 )
}

export default VehiclesForm
