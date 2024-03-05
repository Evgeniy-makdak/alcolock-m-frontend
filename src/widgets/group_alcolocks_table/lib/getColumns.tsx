import { useMemo } from 'react';

import AddIcon from '@mui/icons-material/Add';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { GridActionsCellItem, GridColDef, type GridColumnHeaderParams } from '@mui/x-data-grid';

import { setTestIdsToHeaderColumns } from '@shared/components/Table/Table';
import { testids } from '@shared/const/testid';
import { SortTypes } from '@shared/const/types';
import type { IAlcolock, ID } from '@shared/types/BaseQueryTypes';
import type { RefetchType } from '@shared/types/QueryTypes';
import { Refetch } from '@shared/ui/refetch/Refetch';

import style from '../ui/GroupAlcolocksTable.module.scss';

export enum ValuesHeader {
  NAMING = SortTypes.NAMING,
  SERIAL_NUMBER = SortTypes.SERIAL_NUMBER,
  TC = SortTypes.TC,
}

const setTestIdsToHeaderColumnsAdapter = (row: GridColumnHeaderParams<any, any, any>) => {
  return setTestIdsToHeaderColumns(
    row,
    testids.page_groups.groups_widget_info.GROUPS_WIDGET_INFO_TAB_TABLE_HEADER,
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
        field: ValuesHeader.NAMING,
        maxWidth: 130,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Серийный номер',
        minWidth: 190,
        field: ValuesHeader.SERIAL_NUMBER,
      },
      {
        renderHeader: setTestIdsToHeaderColumnsAdapter,
        headerName: 'Установлен на ТС',
        field: ValuesHeader.TC,
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
            <div className={style.controls}>
              <GridActionsCellItem
                label="edit"
                icon={<ArrowForwardOutlinedIcon />}
                key={'add'}
                onClick={() => setChangeCar({ id: row.id, text: row?.name })}
              />
            </div>
          );
        },
        renderHeader: () => {
          return (
            <div className={style.headerAction}>
              <Refetch testId={testids.TABLE_REFETCH_TABLE_DATA_BUTTON} onClick={refetch} />
              <span onClick={toggleAdd}>
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
