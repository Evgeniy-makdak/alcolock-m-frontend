import PaginationActions from './PaginationActions';
import StyledPagination from './styled';

const Pagination = ({ count, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
  return (
    <div>
      <StyledPagination.Pagination
        component="div"
        count={count}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Строк на странице:"
        rowsPerPageOptions={[25, 50, 75, 100]}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count}`}
        ActionsComponent={PaginationActions}
      />
    </div>
  );
};

export default Pagination;
