import AppConstants from '@app/lib/app_constants';
import { filtersFormSelectors } from '@pages/events/model/forms';
import { searchDrivers } from '@pages/users/model/effects';
import {
  searchCarsByRegistrationNumber,
  searchCarsManufacturers,
} from '@pages/vehicles/model/effects';
import MultipleSearchSelect from '@shared/ui/multiple_search_select/MultipleSearchSelect';

import style from './EventsFilterPanel.module.scss';

const EventsFilterPanel = () => {
  return (
    <div className={style.filtersPanel}>
      <MultipleSearchSelect
        key={'users'}
        formSelectors={filtersFormSelectors}
        fieldParams={{
          name: 'users',
          label: 'Поиск по водителю',
        }}
        onSearch={searchDrivers}
      />

      <MultipleSearchSelect
        key={'carsByMake'}
        formSelectors={filtersFormSelectors}
        fieldParams={{
          name: 'carsByMake',
          label: 'Поиск по марке ТС',
        }}
        onSearch={searchCarsManufacturers}
      />

      <MultipleSearchSelect
        key={'carsByLicense'}
        formSelectors={filtersFormSelectors}
        fieldParams={{
          name: 'carsByLicense',
          label: 'Поиск по гос.номеру',
        }}
        onSearch={searchCarsByRegistrationNumber}
      />

      <MultipleSearchSelect
        key={'eventsByType'}
        formSelectors={filtersFormSelectors}
        fieldParams={{
          name: 'eventsByType',
          label: 'Тип события',
        }}
        defOptions={AppConstants.eventTypesList}
      />
    </div>
  );
};

export default EventsFilterPanel;
