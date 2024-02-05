import { DataGrid, GridColDef } from '@mui/x-data-grid';

import style from './Table.module.scss';

interface TableProps<Rows> {
  headers: GridColDef[];
  rows: Rows[];
  rowsPerPageOptions?: number[];
  styles?: string;
}

export function Table<R>({ headers, rows, rowsPerPageOptions, styles }: TableProps<R>) {
  return (
    <div className={`${style} ${styles}`}>
      <DataGrid
        rows={rows}
        columns={headers}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={rowsPerPageOptions ? rowsPerPageOptions : [5, 10, 25]}
        checkboxSelection
      />
    </div>
  );
}
