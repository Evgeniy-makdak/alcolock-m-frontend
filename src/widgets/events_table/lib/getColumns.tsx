import { useMemo } from 'react';

import { type GridColDef, type GridColumnHeaderParams } from '@mui/x-data-grid';

import { setTestIdsToHeaderColumns } from '@shared/components/Table/Table';
import { testids } from '@shared/const/testid';
import { SortTypes } from '@shared/const/types';
import type { IDeviceAction } from '@shared/types/BaseQueryTypes';
import type { RefetchType } from '@shared/types/QueryTypes';
import { Refetch } from '@shared/ui/refetch/Refetch';

import style from '../ui/EventsTable.module.scss';

export enum ValuesHeader {
  DATE_OCCURRENT = SortTypes.DATE_OCCURRENT,
  INTITIATOR = SortTypes.CREATED_BY,
  TC = SortTypes.TC,
  GOS_NUMBER = SortTypes.GOS_NUMBER,
  TYPE_OF_EVENT = SortTypes.TYPE_OF_EVENT,
}

const setTestIdsToHeaderColumnsAdapter = (row: GridColumnHeaderParams<any, any, any>) => {
  return setTestIdsToHeaderColumns(
    row,
    testids.page_events.events_widget_table.EVENTS_WIDGET_TABLE_HEADER_ITEM,
  );
};

export const useGetColumns = (refetch: RefetchType<IDeviceAction[]>): GridColDef[] => {
  return useMemo(
    () => [
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Дата',
        field: ValuesHeader.DATE_OCCURRENT,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Инициатор',
        width: 200,
        field: ValuesHeader.INTITIATOR,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'ТС',
        field: ValuesHeader.TC,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Номер',
        field: ValuesHeader.GOS_NUMBER,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Тип события',
        field: ValuesHeader.TYPE_OF_EVENT,
      },
      {
        field: 'actions',
        type: 'actions',
        sortable: false,
        disableClickEventBubbling: true,
        getActions: () => [],
        filterable: false,
        renderHeader: () => {
          return (
            <div className={style.refetchWrapper}>
              <Refetch testId={testids.TABLE_REFETCH_TABLE_DATA_BUTTON} onClick={refetch} />
            </div>
          );
        },
        width: 50,
        hideable: false,
        align: 'center',
      },
    ],
    [],
  );
};
