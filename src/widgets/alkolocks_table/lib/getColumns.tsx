import { useMemo } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { GridActionsCellItem, GridColDef, type GridColumnHeaderParams } from '@mui/x-data-grid';

import { setTestIdsToHeaderColumns } from '@shared/components/Table/Table';
import { testids } from '@shared/const/testid';
import type { IAlcolock, ID } from '@shared/types/BaseQueryTypes';
import type { RefetchType } from '@shared/types/QueryTypes';
import { Refetch } from '@shared/ui/refetch/Refetch';

import style from '../ui/AlkolocksTable.module.scss';

export enum ValuesHeader {
  NAMING = 'NAMING',
  SERIAL_NUMBER = 'SERIAL_NUMBER',
  TC = 'TC',
  OPERATING_MODE = 'OPERATING_MODE',
  HOW_LINK = 'HOW_LINK',
  DATA_INSTALLATION = 'DATA_INSTALLATION',
}

const setTestIdsToHeaderColumnsAdapter = (row: GridColumnHeaderParams<any, any, any>) => {
  return setTestIdsToHeaderColumns(
    row,
    testids.page_alcolocks.alcolocks_widget_table.ALCOLOCKS_WIDGET_TABLE_HEADER_ITEM,
  );
};

export const useGetColumns = (
  refetch: RefetchType<IAlcolock[]>,
  toggleDelete: (id: string, text?: string) => void,
  toggle: () => void,
  setChangeAlkolockId: (id: ID) => void,
): GridColDef[] => {
  return useMemo(
    () => [
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Наименование',
        field: ValuesHeader.NAMING,
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
        headerName: 'Режим работы',
        field: ValuesHeader.OPERATING_MODE,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Кем привязан',
        field: ValuesHeader.HOW_LINK,
        minWidth: 220,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Дата установки',
        field: ValuesHeader.DATA_INSTALLATION,
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
                  testids.page_attachments.attachments_widget_table
                    .ATTACHMENTS_WIDGET_TABLE_BODY_ITEM_ACTION_EDIT
                }
                label="edit"
                icon={<ModeEditIcon />}
                key={'add'}
                onClick={() => setChangeAlkolockId(row.id)}
              />
              <GridActionsCellItem
                onClick={() => toggleDelete(row.id, `${row.NAMING} ${row.SERIAL_NUMBER}`)}
                key={'delete'}
                data-testid={
                  testids.page_attachments.attachments_widget_table
                    .ATTACHMENTS_WIDGET_TABLE_BODY_ITEM_ACTION_DELETE
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
                  testids.page_attachments.attachments_widget_table
                    .ATTACHMENTS_WIDGET_TABLE_HEADER_ITEM_OPEN_MODAL
                }>
                <GridActionsCellItem
                  key={'add'}
                  data-testid={
                    testids.page_attachments.attachments_widget_table
                      .ATTACHMENTS_WIDGET_TABLE_HEADER_ITEM_OPEN_MODAL
                  }
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
