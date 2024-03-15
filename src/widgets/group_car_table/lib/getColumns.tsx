import { useMemo } from 'react';

import { GridColDef, type GridColumnHeaderParams } from '@mui/x-data-grid';

import { TableHeaderActions } from '@entities/table_header_actions';
import { TableRowControls } from '@entities/table_row_controls/ui/TableRowControls';
import { setTestIdsToHeaderColumns } from '@shared/components/Table/Table';
import { testids } from '@shared/const/testid';
import { SortTypes } from '@shared/const/types';
import type { IAlcolock, ID } from '@shared/types/BaseQueryTypes';
import type { RefetchType } from '@shared/types/QueryTypes';

export enum ValuesHeader {
  MARK = SortTypes.MARK,
  MODEL = SortTypes.MODEL,
  VIN = SortTypes.VIN,
  GOS_NUMBER = SortTypes.GOS_NUMBER,
}

const setTestIdsToHeaderColumnsAdapter = (row: GridColumnHeaderParams<any, any, any>) => {
  return setTestIdsToHeaderColumns(
    row,
    testids.page_groups.groups_widget_info.GROUPS_WIDGET_INFO_TAB_CARS_TABLE,
  );
};

export const useGetColumns = (
  refetch: RefetchType<IAlcolock[]>,
  toggleAdd: () => void,
  setChangeCar: ({ id, text }: { id: ID; text: string }) => void,
): GridColDef[] => {
  return useMemo(
    () => [
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Наименование',
        field: ValuesHeader.MARK,
        maxWidth: 130,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Серийный номер',
        maxWidth: 135,
        field: ValuesHeader.MODEL,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Установлен на ТС',
        field: ValuesHeader.VIN,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Государственный номер',
        field: ValuesHeader.GOS_NUMBER,
        maxWidth: 143,
      },
      {
        maxWidth: 110,
        field: 'actions',
        type: 'actions',
        sortable: false,
        disableClickEventBubbling: true,
        filterable: false,
        renderCell: ({ row }) => {
          return (
            <TableRowControls
              arrowIcon
              onClickEdit={() => setChangeCar({ id: row.id, text: row?.name })}
            />
          );
        },
        renderHeader: () => {
          return <TableHeaderActions refetch={refetch} onClickAddIcon={toggleAdd} />;
        },
        width: 120,
        hideable: false,
        align: 'center',
      },
    ],
    [],
  );
};
