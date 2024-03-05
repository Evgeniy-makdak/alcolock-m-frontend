import { useMemo } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { GridActionsCellItem, GridColDef, type GridColumnHeaderParams } from '@mui/x-data-grid';

import { setTestIdsToHeaderColumns } from '@shared/components/Table/Table';
import { testids } from '@shared/const/testid';
import { SortTypes } from '@shared/const/types';
import type { IBranch, ID } from '@shared/types/BaseQueryTypes';
import type { RefetchType } from '@shared/types/QueryTypes';
import { Refetch } from '@shared/ui/refetch/Refetch';

import style from '../ui/GroupTable.module.scss';

export enum ValuesHeader {
  NAMING = SortTypes.NAMING,
  WHO_CREATE = SortTypes.WHO_CREATE,
  DATE_CREATE = SortTypes.DATE_CREATE,
}

const setTestIdsToHeaderColumnsAdapter = (row: GridColumnHeaderParams<any, any, any>) => {
  return setTestIdsToHeaderColumns(
    row,
    testids.page_groups.groups_widget_table.GROUPS_WIDGET_TABLE_HEADER_ITEM,
  );
};

export const useGetColumns = (
  refetch: RefetchType<IBranch[]>,
  toggleDelete: (id: ID, text?: string) => void,
  toggleAdd: () => void,
  setChangeBranch: (data: { id: number; name: string }) => void,
): GridColDef[] => {
  return useMemo(
    () => [
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Название группы',
        field: ValuesHeader.NAMING,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Кем создана',
        width: 200,
        field: ValuesHeader.WHO_CREATE,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Дата создание',
        field: ValuesHeader.DATE_CREATE,
      },
      {
        field: 'actions',
        type: 'actions',
        sortable: false,
        disableClickEventBubbling: true,
        filterable: false,
        renderCell: ({ row }) => {
          if (row?.disabledAction) return <></>;
          return (
            <div className={style.controls}>
              <GridActionsCellItem
                data-testid={
                  testids.page_groups.groups_widget_table.GROUPS_WIDGET_TABLE_BODY_ITEM_ACTION_EDIT
                }
                label="edit"
                icon={<ModeEditIcon />}
                key={'edit'}
                onClick={() => {
                  setChangeBranch({ id: row?.id, name: row?.NAMING });
                  toggleAdd();
                }}
              />
              <GridActionsCellItem
                onClick={() => toggleDelete(row.id, `${row.NAMING} ${row.SERIAL_NUMBER}`)}
                key={'delete'}
                data-testid={
                  testids.page_groups.groups_widget_table
                    .GROUPS_WIDGET_TABLE_BODY_ITEM_ACTION_DELETE
                }
                icon={<DeleteIcon />}
                label="Delete"
              />
            </div>
          );
        },
        renderHeader: () => {
          return (
            <div className={style.headerAction}>
              <Refetch testId={testids.TABLE_REFETCH_TABLE_DATA_BUTTON} onClick={refetch} />
              <span
                onClick={toggleAdd}
                data-testid={
                  testids.page_groups.groups_widget_table.GROUPS_WIDGET_TABLE_HEADER_ITEM_OPEN_MODAL
                }>
                <GridActionsCellItem
                  key={'add'}
                  icon={<AddIcon style={{ color: '#000' }} />}
                  label="add"
                />
              </span>
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
