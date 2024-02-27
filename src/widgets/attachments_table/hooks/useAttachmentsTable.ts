import { useState } from 'react';

import { storageKeys } from '@shared/const/storageKeys';
import { useDebounce } from '@shared/hooks/useDebounce';
import { useSavedLocalTableSorts } from '@shared/hooks/useSavedLocalTableSorts';
import { useToggle } from '@shared/hooks/useToggle';
import { Formatters } from '@shared/utils/formatters';

import { useAttachmentsApi } from '../api/attachmentsApi';
import { useGetColumns } from '../lib/getColumns';
import { useGetRows } from '../lib/getRows';
import { useAttachmentsStore } from '../model/attachmentsStore';

export const useAttachmentsTable = () => {
  const [state, apiRef, changeTableState, changeTableSorts] = useSavedLocalTableSorts(
    storageKeys.ATTACHMENTS_TABLE_SORTS,
  );
  const [selectAttachment, setSelectAttachment] = useState<null | { id: number; text: string }>(
    null,
  );

  const [openAppAttachModal, toggleAppAttachModal, closeAppAttachModal] = useToggle(false);
  const [openDeleteModal, toggleOpenDeleteModal, closeDeleteModal] = useToggle(false);

  const [input, setInput] = useState('');
  const {
    changeEndDate,
    changeStartDate,
    clearDates,
    endDate,
    startDate,
    openFilters,
    toggleFilters,
  } = useAttachmentsStore();

  const [searchQuery] = useDebounce(input, 500);

  const { data, isLoading, refetch } = useAttachmentsApi({
    searchQuery,
    endDate: Formatters.formatToISODate(endDate),
    startDate: Formatters.formatToISODate(startDate),
    page: state.page,
    limit: state.pageSize,
  });

  const handleClickDeleteAttachment = (id: number, text: string) => {
    setSelectAttachment({ id, text });
    toggleOpenDeleteModal();
  };
  const rows = useGetRows(data);
  const headers = useGetColumns(toggleAppAttachModal, handleClickDeleteAttachment, refetch);

  const tableData = {
    ...state,
    apiRef,
    rows,
    headers,
    changeTableState,
    changeTableSorts,
    isLoading,
  };

  const filtersData = {
    changeEndDate,
    changeStartDate,
    clearDates,
    endDate,
    startDate,
    openFilters,
    toggleFilters,
    setInput,
    input,
  };

  const addModalData = {
    closeAppAttachModal,
    toggleAppAttachModal,
    openAppAttachModal,
  };

  const deleteAttachModalData = {
    closeDeleteModal,
    openDeleteModal,
    toggleOpenDeleteModal,
    selectAttachment,
  };

  return {
    deleteAttachModalData,
    addModalData,
    tableData,
    filtersData,
  };
};
