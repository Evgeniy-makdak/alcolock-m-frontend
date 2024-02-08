/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';

import { GridPaginationModel } from '@mui/x-data-grid';

import type { Filters } from '@features/attachments_filter_panel';
import { useDebounce } from '@shared/hooks/useDebounce';
import { useToggle } from '@shared/hooks/useToggle';

import { useAttachmentsApi } from '../api/attachmentsApi';
import { useGetColumns } from '../lib/getColumns';
import { useGetRows } from '../lib/getRows';
import { useAttachmentsTableStore } from '../model/attachmentsTableStore';

export const useAttachmentsTable = () => {
  const [selectAttachment, setSelectAttachment] = useState<null | { id: number; text: string }>(
    null,
  );
  const [openFilters, toggleOpenFilters] = useToggle(false);
  const [openModal, toggleOpenModal, closeModal] = useToggle(false);
  const [openDeleteModal, toggleOpenDeleteModal, closeDeleteModal] = useToggle(false);
  const [_filters, setFilters] = useState<Filters>({
    userId: '',
    carsId: '',
  });
  const [input, setInput] = useState('');
  const [inputsDate, setInputsDate] = useState({
    startDate: '',
    endDate: '',
  });

  const [inputWidthDelay] = useDebounce(input, 500);
  const { countsElementsOnPage, page, setCountElementsOnPage, setPage } = useAttachmentsTableStore(
    (state) => state,
  );

  const listenFiletrs = (filter: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [prev[filter]]: value }));
  };

  const { data, isLoading, mutate } = useAttachmentsApi({
    searchQuery: inputWidthDelay,
    endDate: inputsDate.endDate,
    startDate: inputsDate.startDate,
    page,
    limit: countsElementsOnPage,
  });
  const rows = useGetRows(data);

  const handleClickDeleteAttachment = (id: number, text: string) => {
    setSelectAttachment({ id, text });
    toggleOpenDeleteModal();
  };

  const headers = useGetColumns(toggleOpenModal, handleClickDeleteAttachment);

  const paginationModelChange = (state: GridPaginationModel) => {
    setPage(state.page);
    setCountElementsOnPage(state.pageSize);
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>, type: 'start' | 'end') => {
    setInputsDate((prev) => {
      if (type === 'start') {
        return { ...prev, startDate: e.target.value };
      }
      return { ...prev, endDate: e.target.value };
    });
  };

  const deleteAttachment = () => {
    if (!selectAttachment) return;
    mutate(selectAttachment.id);
    closeDeleteModal();
  };

  return {
    inputsDate,
    setInputsDate,
    isLoading,
    openFilters,
    toggleOpenFilters,
    setInput,
    page,
    input,
    rows,
    headers,
    paginationModelChange,
    handleChangeDate,
    listenFiletrs,
    closeModal,
    toggleOpenModal,
    openModal,
    closeDeleteModal,
    openDeleteModal,
    toggleOpenDeleteModal,
    selectAttachment,
    deleteAttachment,
  };
};
