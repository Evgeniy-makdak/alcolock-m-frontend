/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';

import { storageKeys } from '@shared/const/storageKeys';
import { useDebounce } from '@shared/hooks/useDebounce';
import { useSavedLocalTableSorts } from '@shared/hooks/useSavedLocalTableSorts';
import { Formatters } from '@shared/utils/formatters';

import { useAvtoServiceEventsApi } from '../api/avtoServiceEventsApi';
import { useGetColumns } from '../lib/getColumns';
import { useGetRows } from '../lib/getRows';
import { useAutoServiceStore } from '../model/autoServiceStore';

export const useAvtoServiceTable = () => {
  const [state, apiRef, changeTableState, changeTableSorts] = useSavedLocalTableSorts(
    storageKeys.AVTO_SERVICE_EVENTS_TABLE_SORTS,
  );
  const [input, setInput] = useState('');
  const { changeEndDate, changeStartDate, clearDates, endDate, startDate } = useAutoServiceStore();
  const [searchQuery] = useDebounce(input, 500);
  const { data, isLoading, refetch } = useAvtoServiceEventsApi({
    searchQuery,
    page: state.page,
    limit: state.pageSize,
    endDate: Formatters.formatToISODate(endDate),
    startDate: Formatters.formatToISODate(startDate),
  });
  const deviceActions = data?.data;
  const columns = useGetColumns(refetch);
  const rows = useGetRows(deviceActions);

  const filterData = {
    input,
    setInput,
    changeEndDate,
    changeStartDate,
    clearDates,
    endDate,
    startDate,
  };

  const tableData = {
    ...state,
    apiRef,
    changeTableState,
    changeTableSorts,
    columns,
    isLoading,
    rows,
  };
  return { filterData, tableData };
};