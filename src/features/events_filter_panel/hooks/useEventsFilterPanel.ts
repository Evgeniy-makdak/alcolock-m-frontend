import type { Value } from '@shared/ui/search_multiple_select/SearchMultipleSelect';

import { eventsFilterPanelStore } from '../model/eventsFilterPanelStore';

export interface EventsFilters {
  driverId: Value[];
  markCar: Value[];
  gosNumber: Value[];
  typeEvent: Value[];
}

export const useEventsFilterPanel = () => {
  const { filters, setFilters } = eventsFilterPanelStore();

  return { filters, setFilters };
};
