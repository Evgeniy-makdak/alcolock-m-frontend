/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';

import type { Dayjs } from 'dayjs';

import { filterButtonStore } from '@entities/table_filter_button';
import { storageKeys } from '@shared/const/storageKeys';
import { useDebounce } from '@shared/hooks/useDebounce';
import { useSavedLocalTableSorts } from '@shared/hooks/useSavedLocalTableSorts';
import { useToggle } from '@shared/hooks/useToggle';
import { Formatters } from '@shared/utils/formatters';

import { useAttachmentsApi } from '../api/attachmentsApi';
import { useGetColumns } from '../lib/getColumns';
import { useGetRows } from '../lib/getRows';
import { useAttachmentsDateStore } from '../model/attachmentsDateStore';

interface InputsDate {
  startDate: null | Dayjs;
  endDate: null | Dayjs;
}

export const useAttachmentsTable = () => {
  const [state, apiRef, changeTableState, changeTableSorts] = useSavedLocalTableSorts(
    storageKeys.ATTACHMENTS_TABLE_SORTS,
  );
  const [selectAttachment, setSelectAttachment] = useState<null | { id: number; text: string }>(
    null,
  );
  const { openFilters, toggleFilters } = filterButtonStore((state) => state);

  const [openAppAttachModal, toggleAppAttachModal, closeAppAttachModal] = useToggle(false);
  const [openDeleteModal, toggleOpenDeleteModal, closeDeleteModal] = useToggle(false);

  const [input, setInput] = useState('');
  const { changeEndDate, changeStartDate, clearDates, endDate, startDate } =
    useAttachmentsDateStore();

  const [inputWidthDelay] = useDebounce(input, 500);

  const { data, isLoading, mutate } = useAttachmentsApi({
    searchQuery: inputWidthDelay,
    endDate: Formatters.formatToISODate(endDate),
    startDate: Formatters.formatToISODate(startDate),
    page: state.page,
    limit: state.pageSize,
  });
  const rows = useGetRows(data);

  const handleClickDeleteAttachment = (id: number, text: string) => {
    setSelectAttachment({ id, text });
    toggleOpenDeleteModal();
  };

  const headers = useGetColumns(toggleAppAttachModal, handleClickDeleteAttachment);

  const deleteAttachment = () => {
    if (!selectAttachment) return;
    mutate(selectAttachment.id);
    closeDeleteModal();
  };

  return {
    endDate,
    startDate,
    changeStartDate,
    changeEndDate,
    isLoading,
    openFilters,
    clearDates,
    toggleOpenFilters: toggleFilters,
    setInput,
    page: state.page,
    input,
    rows,
    headers,
    changeTableState,
    closeAppAttachModal,
    toggleAppAttachModal,
    openAppAttachModal,
    changeTableSorts,
    apiRef,
    closeDeleteModal,
    openDeleteModal,
    toggleOpenDeleteModal,
    selectAttachment,
    deleteAttachment,
  };
};
