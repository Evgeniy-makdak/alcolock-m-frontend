import type { Value } from '@shared/ui/search_multiple_select/SearchMultipleSelect';

import { attachmentsFilterPanelStore } from '../model/attachmentsFilterPanelStore';

export type AttachmentsFilters = {
  driverId: Value[];
  carId: Value[];
  alcolocks: Value[];
  createLink: Value[];
  dateLink: Value[];
};

export const useAttachmentsFilterPanel = () => {
  const { filters, setFilters } = attachmentsFilterPanelStore();

  return {
    setFilters,
    filters,
  };
};
