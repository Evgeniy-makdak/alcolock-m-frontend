import { useMemo } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridActionsCellItem, GridColDef, type GridColumnHeaderParams } from '@mui/x-data-grid';

import { testids } from '@shared/const/testid';

export enum ValuesHeader {
  DRIVER = 'DRIVER',
  ALCOLOKS = 'ALCOLOKS',
  SERIAL_NUMBER = 'SERIAL_NUMBER',
  TC = 'TC',
  WHO_LINK = 'WHO_LINK',
  DATE_LINK = 'DATE_LINK',
}
const setTestIds = (row: GridColumnHeaderParams<any, any, any>) => {
  return (
    <span
      data-testid={`${testids.page_attachments.attachments_widget_table.ATTACHMENTS_WIDGET_TABLE_HEADER_ITEM}_${row.colDef.field}`}>
      {row.colDef.headerName}
    </span>
  );
};
export const useGetColumns = (
  toggle: () => void,
  toggleDelete: (id: number, text: string) => void,
): GridColDef[] => {
  return useMemo(
    () => [
      {
        renderHeader: setTestIds,
        headerName: 'Алкозамок',
        field: ValuesHeader.ALCOLOKS,
      },
      {
        renderHeader: setTestIds,
        headerName: 'Серийный номер',
        width: 200,
        field: ValuesHeader.SERIAL_NUMBER,
      },
      {
        renderHeader: setTestIds,
        headerName: 'ТС',
        field: ValuesHeader.TC,
      },
      {
        renderHeader: setTestIds,
        headerName: 'Водитель',
        field: ValuesHeader.DRIVER,
      },
      {
        renderHeader: setTestIds,
        headerName: 'Кем привязан',
        field: ValuesHeader.WHO_LINK,
      },
      {
        renderHeader: setTestIds,
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
              onClick={() => toggleDelete(row.id, row.alcolocks)}
              key={'delete'}
              data-testid={
                testids.page_attachments.attachments_widget_table
                  .ATTACHMENTS_WIDGET_TABLE_BODY_ITEM_ACTION_DELETE
              }
              icon={<DeleteIcon style={{ color: '#000' }} />}
              label="Delete"
            />
          );
        },
        renderHeader: () => {
          return (
            <span
              onClick={toggle}
              data-testid={
                testids.page_attachments.attachments_widget_table
                  .ATTACHMENTS_WIDGET_TABLE_HEADER_ITEM_OPEN_MODAL
              }>
              <GridActionsCellItem
                key={'delete'}
                data-testid={
                  testids.page_attachments.attachments_widget_table
                    .ATTACHMENTS_WIDGET_TABLE_HEADER_ITEM_OPEN_MODAL
                }
                icon={<AddIcon style={{ color: '#000' }} />}
                label="Delete"
              />
            </span>
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
