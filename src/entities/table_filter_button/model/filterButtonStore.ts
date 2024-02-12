import { create } from 'zustand';

interface FilterButtonStore {
  openFilters: boolean;
  toggleFilters: () => void;
}

export const filterButtonStore = create<FilterButtonStore>()((set) => ({
  openFilters: false,
  toggleFilters() {
    set((state) => ({ openFilters: !state.openFilters }));
  },
}));
