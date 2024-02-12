import { memo } from 'react';

import { DataGrid, DataGridProps } from '@mui/x-data-grid';

import style from './Table.module.scss';

interface TableProps extends DataGridProps {
  styles?: string;
  testid?: string;
  pageSize?: number;
  pageNumber?: number;
  pointer?: boolean;
}

const getStyle = (flag: boolean) => {
  return {
    '.MuiDataGrid-columnHeaderTitleContainerContent': {
      fontWeight: '600',
    },
    '.MuiDataGrid-columnHeaders': {
      backgroundColor: 'rgba(0, 0, 0, 0.13)',
      borderRadius: '0',
    },
    '.MuiDataGrid-row': {
      cursor: flag ? 'pointer' : 'default',
    },
    '.MuiDataGrid-columnHeaderTitle': {
      fontWeight: '600',
    },
    '.MuiSvgIcon-root': {
      fontSize: '25px',
    },
    '.MuiButtonBase-root': {
      padding: 0,
    },
  };
};

export const Table = memo(
  ({
    columns,
    pageSize = 25,
    pageNumber = 1,
    pointer,
    pageSizeOptions,
    styles,
    ...rest
  }: TableProps) => {
    const styledHeaders = columns.map((head) => {
      if (head?.type === 'actions') return { ...head };
      return { ...head, flex: 1 };
    });

    return (
      <div className={styles ? styles : style.table}>
        <DataGrid
          {...rest}
          sx={getStyle(pointer)}
          disableColumnMenu
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          disableVirtualization
          disableEval
          columns={styledHeaders}
          slotProps={{
            pagination: {
              labelRowsPerPage: ' Строк на странице',
            },
          }}
          initialState={{
            pagination: {
              paginationModel: { page: pageNumber, pageSize: pageSize },
            },
          }}
          pageSizeOptions={pageSizeOptions ? pageSizeOptions : [25, 50, 75, 100]}
        />
      </div>
    );
  },
);

Table.displayName = 'Table';
