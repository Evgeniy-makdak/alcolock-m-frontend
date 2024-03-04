import { useMemo } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridActionsCellItem, GridColDef, type GridColumnHeaderParams } from '@mui/x-data-grid';

import { setTestIdsToHeaderColumns } from '@shared/components/Table/Table';
import { testids } from '@shared/const/testid';
import { SortTypes } from '@shared/const/types';
import type { IAttachmentItems } from '@shared/types/BaseQueryTypes';
import type { RefetchType } from '@shared/types/QueryTypes';
import { Refetch } from '@shared/ui/refetch/Refetch';

import style from '../ui/AttachmentsTable.module.scss';

export enum ValuesHeader {
  DRIVER = SortTypes.DRIVER,
  ALCOLOKS = SortTypes.ALCOLOKS,
  SERIAL_NUMBER = SortTypes.SERIAL_NUMBER,
  TC = SortTypes.TC,
  WHO_LINK = SortTypes.WHO_LINK,
  DATE_LINK = SortTypes.DATE_CREATE,
}

const setTestIdsToHeaderColumnsAdapter = (row: GridColumnHeaderParams<any, any, any>) => {
  return setTestIdsToHeaderColumns(
    row,
    testids.page_attachments.attachments_widget_table.ATTACHMENTS_WIDGET_TABLE_HEADER_ITEM,
  );
};

export const useGetColumns = (
  toggle: () => void,
  toggleDelete: (id: number, text: string) => void,
  refetch: RefetchType<IAttachmentItems[]>,
): GridColDef[] => {
  return useMemo(
    () => [
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Алкозамок',
        field: ValuesHeader.ALCOLOKS,
        sortable: false,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Серийный номер',
        width: 200,
        field: ValuesHeader.SERIAL_NUMBER,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'ТС',
        field: ValuesHeader.TC,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Водитель',
        field: ValuesHeader.DRIVER,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Кем привязан',
        field: ValuesHeader.WHO_LINK,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Дата привязки',
        field: ValuesHeader.DATE_LINK,
      },
      {
        field: 'actions',
        type: 'actions',
        sortable: false,
        disableClickEventBubbling: true,
        filterable: false,
        renderCell: ({ row }) => {
          return (
            <GridActionsCellItem
              onClick={() => toggleDelete(row.id, row?.ALCOLOKS)}
              key={'delete'}
              data-testid={
                testids.page_attachments.attachments_widget_table
                  .ATTACHMENTS_WIDGET_TABLE_BODY_ITEM_ACTION_DELETE
              }
              icon={<DeleteIcon />}
              label="Delete"
            />
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
