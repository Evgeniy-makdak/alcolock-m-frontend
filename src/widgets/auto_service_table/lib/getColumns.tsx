import { useMemo } from 'react';

import { Chip } from '@mui/material';
import { GridColDef, type GridColumnHeaderParams } from '@mui/x-data-grid';

import { TimeCell } from '@entities/time_cell';
import { setTestIdsToHeaderColumns } from '@shared/components/Table/Table';
import { testids } from '@shared/const/testid';
import { SortTypes } from '@shared/const/types';
import type { IAttachmentItems } from '@shared/types/BaseQueryTypes';
import type { RefetchType } from '@shared/types/QueryTypes';
import { Refetch } from '@shared/ui/refetch/Refetch';

import style from '../ui/AvtoServiceTable.module.scss';
import { chipColor } from './getRows';

export enum ValuesHeader {
  DATE = SortTypes.DATE_CREATE,
  SERIAL_NUMBER = SortTypes.SERIAL_NUMBER,
  TC = SortTypes.TC,
  INITIATOR = SortTypes.CREATED_BY,
  STATE = SortTypes.STATE,
  PROCESS = SortTypes.PROCESS,
  EXPIRES = SortTypes.EXPIRES,
}

const setTestIdsToHeaderColumnsAdapter = (row: GridColumnHeaderParams<any, any, any>) => {
  return setTestIdsToHeaderColumns(
    row,
    testids.page_avto_service.avto_service_widget_table.AVTO_SERVICE_WIDGET_TABLE_HEADER_ITEM,
  );
};

export const useGetColumns = (refetch: RefetchType<IAttachmentItems[]>): GridColDef[] => {
  return useMemo(
    () => [
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Дата',
        field: ValuesHeader.DATE,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Серийный номер',
        width: 200,
        field: ValuesHeader.SERIAL_NUMBER,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Установлен на ТС',
        field: ValuesHeader.TC,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Инициатор',
        field: ValuesHeader.INITIATOR,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Состояние',
        field: ValuesHeader.STATE,
        minWidth: 220,
        renderCell: (params) => {
          const state = params?.row?.state || '';
          return <Chip className={style.chipFont} color={chipColor[state]} label={state} />;
        },
        sortable: false,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Процесс',
        field: ValuesHeader.PROCESS,
        sortable: false,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Истекает',
        field: ValuesHeader.EXPIRES,
        sortable: false,
        renderCell: (params) => {
          return (
            <TimeCell
              refetch={refetch}
              key={params.id}
              time={
                params?.row?.lastEvent?.eventType !== 'REJECTED' ? params?.row?.finishedAt : null
              }
              id={params.id}
            />
          );
        },
      },
      {
        field: 'actions',
        type: 'actions',
        sortable: false,
        disableClickEventBubbling: true,
        filterable: false,
        getActions: () => [],
        renderHeader: () => {
          return (
            <div className={style.refetchWrapper}>
              <Refetch testId={testids.TABLE_REFETCH_TABLE_DATA_BUTTON} onClick={refetch} />
            </div>
          );
        },
        width: 120,
        hideable: false,
        align: 'center',
      },
    ],
    [],
  );
};
