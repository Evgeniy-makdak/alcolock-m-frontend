import { type ReactNode, useMemo } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { GridActionsCellItem, GridColDef, type GridColumnHeaderParams } from '@mui/x-data-grid';

import { setTestIdsToHeaderColumns } from '@shared/components/Table/Table';
import { testids } from '@shared/const/testid';
import { SortTypes } from '@shared/const/types';
import type { IAlcolock, ID } from '@shared/types/BaseQueryTypes';
import type { RefetchType } from '@shared/types/QueryTypes';
import { Refetch } from '@shared/ui/refetch/Refetch';

import style from '../ui/VehiclesTable.module.scss';

export enum ValuesHeader {
  MARK = SortTypes.MARK,
  MODEL = SortTypes.MODEL,
  VIN = SortTypes.VIN,
  GOS_NUMBER = SortTypes.GOS_NUMBER,
  YEAR = SortTypes.YEAR,
  DATE_CREATE = SortTypes.DATE_CREATE,
}

const setTestIdsToHeaderColumnsAdapter = (row: GridColumnHeaderParams<any, any, any>) => {
  return setTestIdsToHeaderColumns(
    row,
    testids.page_transports.transports_widget_table.TRANSPORT_WIDGET_TABLE_HEADER_ITEM,
  );
};

export const useGetColumns = (
  refetch: RefetchType<IAlcolock[]>,
  toggleDelete: (id: string, text?: ReactNode) => void,
  toggle: () => void,
  setChangeAlkolockId: (id: ID) => void,
): GridColDef[] => {
  return useMemo(
    () => [
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Марка',
        field: ValuesHeader.MARK,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Модель',
        width: 200,
        field: ValuesHeader.MODEL,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'VIN',
        field: ValuesHeader.VIN,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Государственный номер',
        field: ValuesHeader.GOS_NUMBER,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Год выпуска',
        field: ValuesHeader.YEAR,
        minWidth: 220,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Дата регистрации',
        field: ValuesHeader.DATE_CREATE,
      },
      {
        field: 'actions',
        type: 'actions',
        sortable: false,
        disableClickEventBubbling: true,
        filterable: false,
        renderCell: ({ row }) => {
          return (
            <div className={style.controls}>
              <GridActionsCellItem
                data-testid={
                  testids.page_transports.transports_widget_table
                    .TRANSPORT_WIDGET_TABLE_BODY_ITEM_ACTION_EDIT
                }
                label="edit"
                icon={<ModeEditIcon />}
                key={'add'}
                onClick={() => setChangeAlkolockId(row.id)}
              />
              <GridActionsCellItem
                onClick={() =>
                  toggleDelete(
                    row?.id,
                    <>
                      <b>
                        {row?.MARK}, {row?.MODEL}, {row?.YEAR}, {row?.GOS_NUMBER}
                      </b>
                    </>,
                  )
                }
                key={'delete'}
                data-testid={
                  testids.page_transports.transports_widget_table
                    .TRANSPORT_WIDGET_TABLE_BODY_ITEM_ACTION_DELETE
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
                onClick={toggle}
                data-testid={
                  testids.page_transports.transports_widget_table
                    .TRANSPORT_WIDGET_TABLE_HEADER_ITEM_OPEN_MODAL
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
