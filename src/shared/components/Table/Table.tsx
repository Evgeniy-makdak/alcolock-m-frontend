import { memo } from 'react';

import { DataGridProps, type GridColumnHeaderParams } from '@mui/x-data-grid';

import style from './Table.module.scss';
import { CustomNoRowsOverlay, StyledDataGrid, getStyle } from './styledTable';

interface TableProps extends DataGridProps {
  styles?: string;
  testid?: string;
  pageSize?: number;
  pageNumber?: number;
  pointer?: boolean;
}

export const setTestIdsToHeaderColumns = (
  row: GridColumnHeaderParams<any, any, any>,
  testId: string,
) => {
  return <span data-testid={`${testId}_${row.colDef.field}`}>{row.colDef.headerName}</span>;
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
        <StyledDataGrid
          {...rest}
          sx={getStyle(pointer)}
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          disableVirtualization
          disableEval
          columns={styledHeaders}
          getRowClassName={() => `super-app-theme`}
          slots={{
            noResultsOverlay: CustomNoRowsOverlay,
          }}
          slotProps={{
            pagination: {
              labelDisplayedRows: ({ from, to, count }) => `${from}-${to} из ${count}`,
              labelRowsPerPage: 'Строк на странице',
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
