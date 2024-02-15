import { create } from 'zustand';

import { getArrayValues } from '@shared/lib/getValuesFromForm';
import type { Value } from '@shared/ui/search_multiple_select/SearchMultipleSelect';

import type { AttachmentsFilters } from '../hooks/useAttachmentsFilterPanel';

interface AttachmentsFilterPanelStore {
  filters: AttachmentsFilters;
  setFilters: (type: keyof AttachmentsFilters, value: (string | Value)[] | Value) => void;
  resetFilters: () => void;
}

export const attachmentsFilterPanelStore = create<AttachmentsFilterPanelStore>()((set) => ({
  filters: {
    alcolocks: [],
    carId: [],
    createLink: [],
    dateLink: [],
    driverId: [],
  },
  setFilters(type, value) {
    set((state) => ({ filters: { ...state.filters, [type]: getArrayValues(value) } }));
  },
  resetFilters() {
    set(() => ({
      filters: {
        alcolocks: [],
        carId: [],
        createLink: [],
        dateLink: [],
        driverId: [],
      },
    }));
  },
}));
