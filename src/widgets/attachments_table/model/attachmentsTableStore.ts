import { create } from 'zustand';

interface AttachmentsTableStore {
  page: number;
  countsElementsOnPage: number;
  setPage: (page: number) => void;
  setCountElementsOnPage: (count: number) => void;
}

export const useAttachmentsTableStore = create<AttachmentsTableStore>((set) => ({
  page: 0,
  countsElementsOnPage: 25,
  setCountElementsOnPage: (count) => set(() => ({ countsElementsOnPage: count })),
  setPage: (page) => set({ page: page }),
}));
