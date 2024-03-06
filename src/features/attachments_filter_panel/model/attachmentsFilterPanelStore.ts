import { create } from 'zustand';

import { arraysHasLength } from '@shared/lib/arraysHasLength';
import { getArrayValues } from '@shared/lib/getValuesFromForm';
import type { Value } from '@shared/ui/search_multiple_select';

import type { AttachmentsFilters } from '../hooks/useAttachmentsFilterPanel';

interface AttachmentsFilterPanelStore {
  filters: AttachmentsFilters;
  setFilters: (type: keyof AttachmentsFilters, value: (string | Value)[] | Value) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
}

export const attachmentsFilterPanelStore = create<AttachmentsFilterPanelStore>()((set, get) => ({
  filters: {
    alcolocks: [],
    carId: [],
    createLink: [],
    dateLink: [],
    driverId: [],
  },
  hasActiveFilters: false,
  setFilters(type, value) {
    const filters = get().filters;
    const readyValue = getArrayValues(value);
    const newState = { ...filters, [type]: readyValue };
    const hasActiveFilters = arraysHasLength([
      newState.alcolocks,
      newState.carId,
      newState.createLink,
      newState.dateLink,
      newState.driverId,
    ]);

    set(() => ({
      hasActiveFilters,
      filters: newState,
    }));
  },
  resetFilters() {
    set(() => ({
      hasActiveFilters: false,
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
