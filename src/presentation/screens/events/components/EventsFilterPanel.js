import MultipleSearchSelect from "../../../shared/ui/form/components/MultipleSearchSelect";
import {filtersFormSelectors} from "../../../../internal/effector/events/forms";
import {
  searchCarsByRegistrationNumber, searchCarsManufacturers
} from "../../../../internal/effector/vehicles/effects";
import AppConstants from "../../../../internal/app_constants";
import {searchDrivers} from "../../../../internal/effector/users/effects";

const EventsFilterPanel = () => {
  return (
    <div className={'filters-panel'}>
      <MultipleSearchSelect
        key={'users'}
        formSelectors={filtersFormSelectors}
        fieldParams={{
          name: 'users',
          label: 'Поиск по водителю'
        }}
        onSearch={searchDrivers}
      />

      <MultipleSearchSelect
        key={'carsByMake'}
        formSelectors={filtersFormSelectors}
        fieldParams={{
          name: 'carsByMake',
          label: 'Поиск по марке ТС'
        }}
        onSearch={searchCarsManufacturers}
      />

      <MultipleSearchSelect
        key={'carsByLicense'}
        formSelectors={filtersFormSelectors}
        fieldParams={{
          name: 'carsByLicense',
          label: 'Поиск по гос.номеру'
        }}
        onSearch={searchCarsByRegistrationNumber}
      />

      <MultipleSearchSelect
        key={'eventsByType'}
        formSelectors={filtersFormSelectors}
        fieldParams={{
          name: 'eventsByType',
          label: 'Тип события'
        }}
        defOptions={AppConstants.eventTypesList}
      />
    </div>
  )
}

export default EventsFilterPanel
