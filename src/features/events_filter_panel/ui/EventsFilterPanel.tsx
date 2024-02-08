import { AppConstants } from '@app/index';
import { FilterPanel } from '@entities/filter_panel/ui/FilterPanel';
import { filtersFormSelectors } from '@pages/events/model/forms';
import { searchDrivers } from '@pages/users/model/effects';
import {
  searchCarsByRegistrationNumber,
  searchCarsManufacturers,
} from '@pages/vehicles/model/effects';
import { MultipleSearchSelect } from '@shared/ui/multiple_search_select';

interface EventsFilterPanelProps {
  testids: {
    users: string;
    carsByMake: string;
    carsByLicense: string;
    eventsByType: string;
  };
}

export const EventsFilterPanel = ({ testids }: EventsFilterPanelProps) => {
  return (
    <FilterPanel>
      <MultipleSearchSelect
        key={'users'}
        formSelectors={filtersFormSelectors}
        fieldParams={{
          name: 'users',
          label: 'Поиск по водителю',
        }}
        onSearch={searchDrivers}
        defOptions={undefined}
        testid={testids.users}
      />

      <MultipleSearchSelect
        key={'carsByMake'}
        formSelectors={filtersFormSelectors}
        fieldParams={{
          name: 'carsByMake',
          label: 'Поиск по марке ТС',
        }}
        onSearch={searchCarsManufacturers}
        defOptions={undefined}
        testid={testids.carsByMake}
      />

      <MultipleSearchSelect
        key={'carsByLicense'}
        formSelectors={filtersFormSelectors}
        fieldParams={{
          name: 'carsByLicense',
          label: 'Поиск по гос.номеру',
        }}
        onSearch={searchCarsByRegistrationNumber}
        defOptions={undefined}
        testid={testids.carsByLicense}
      />

      <MultipleSearchSelect
        key={'eventsByType'}
        formSelectors={filtersFormSelectors}
        fieldParams={{
          name: 'eventsByType',
          label: 'Тип события',
        }}
        defOptions={AppConstants.eventTypesList}
        onSearch={undefined}
        testid={testids.eventsByType}
      />
    </FilterPanel>
  );
};
