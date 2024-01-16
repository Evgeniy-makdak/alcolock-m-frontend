import { cloneElement, useEffect, useRef, useState } from 'react';

import AppConstants from '@app/lib/app_constants';
import Pagination from '@entities/edit_table/ui/Pagination/Pagination';
import TableControl from '@entities/edit_table/ui/TableControl/TableControl';
import { Table, TableBody, TableHead, TableSortLabel } from '@mui/material';
import { useToggle } from '@shared/hooks/useToggle';
import StyledTable from '@shared/styled_components/styledTable';
import Button, { ButtonsType } from '@shared/ui/button/Button';
import Loader from '@shared/ui/loader/Loader';
import Popup from '@shared/ui/popup/Popup';

// TODO => разнести этот компонент на более мелкие компоненты
const EditTable = ({
  headers,
  getRowsTemplate,
  withDate = true,
  withSearch = true,
  onRowClick,
  addFormSelectors,
  editFormSelectors,
  initOrderBy = null,
  initOrderType = AppConstants.OrderTypes.asc,
  uploadListPromise,
  deleteItemPromise,
  deletePopupParams,
  addItemPromise,
  addPopupParams,
  editItemPromise,
  editPopupParams,
  afterDelete,
  selectedRow,
  afterEdit,
  filtersPanel = null,
  filtersData = null,
  isFiltersActive,
  updateTable = null,
  loading = false,
  withoutAction = false,
  withoutAdd = false,
  additionalActions = [],
}) => {
  const [openDeleteModal, toggleDeleteModal] = useToggle();
  const [openAddModal, toggleAddModal] = useToggle();
  const [openEditModal, toggleEditModal] = useToggle();

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [itemsCount, setItemsCount] = useState(0);

  const [selectedItem, setSelectedItem] = useState(null);

  const resetAddForm = addFormSelectors?.useResetForm();
  const isValidAddForm = addFormSelectors?.useIsFormValid();
  const onClickAddSubmit = addFormSelectors?.useOnClickSubmit();
  const resetEditForm = editFormSelectors?.useResetForm();
  const isValidEditForm = editFormSelectors?.useIsFormValid();
  const onClickEditSubmit = editFormSelectors?.useOnClickSubmit();

  const [order, setOrder] = useState(initOrderType);
  const [orderBy, setOrderBy] = useState(initOrderBy);

  const tableWrapper = useRef(null);
  const searchTimeout = useRef(null);
  const searchQuery = useRef('');
  const startDate = useRef('');
  const endDate = useRef('');

  const updateTableDeps = Array.isArray(updateTable) ? updateTable : [updateTable];

  useEffect(() => {
    setPage(0);

    uploadListPromise({
      page: 1,
      limit: rowsPerPage,
      sortBy: orderBy,
      order,
      query: searchQuery.current,
      startDate: startDate.current,
      endDate: endDate.current,
      filtersData: filtersData ?? {},
    })
      .then((res) => {
        setItems(res.list);
        setItemsCount(res.count);
      })
      .catch((err) => {
        console.log('uploadListPromise error', err);
      });

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [filtersData, uploadListPromise, ...updateTableDeps]);

  const onPageChange = (event, newPage) => {
    tableWrapper.current?.scrollTo(0, 0);
    setPage(newPage);

    uploadListPromise({
      page: newPage + 1,
      limit: rowsPerPage,
      sortBy: orderBy,
      order,
      query: searchQuery.current,
      startDate: startDate.current,
      endDate: endDate.current,
      filtersData: filtersData,
    })
      .then((res) => {
        setItems(res.list);
        setItemsCount(res.count);
      })
      .catch((err) => {
        console.log('uploadListPromise error', err);
      });
  };

  const onChangeRowsPerPage = (event) => {
    tableWrapper.current?.scrollTo(0, 0);
    const value = parseInt(event.target.value, 10);
    setRowsPerPage(value);
    setPage(0);

    uploadListPromise({
      page: 1,
      limit: value,
      sortBy: orderBy,
      order,
      query: searchQuery.current,
      startDate: startDate.current,
      endDate: endDate.current,
      filtersData: filtersData,
    })
      .then((res) => {
        setItems(res.list);
        setItemsCount(res.count);
      })
      .catch((err) => {
        console.log('uploadListPromise error', err);
      });
  };

  const onClickDelete = (e, id) => {
    e.stopPropagation();
    const item = items.find((item) => item.id === id);

    if (!item) {
      throw Error('Не найден элемент для удаления');
    }

    setSelectedItem(item);
    toggleDeleteModal();
  };

  const handleDelete = () => {
    deleteItemPromise(selectedItem?.id)
      .then(() => {
        uploadListPromise({
          page: 1,
          limit: rowsPerPage,
          sortBy: orderBy,
          order,
          query: searchQuery.current,
          startDate: startDate.current,
          endDate: endDate.current,
          filtersData: filtersData,
        })
          .then((res) => {
            setItems(res.list);
            setItemsCount(res.count);
          })
          .catch((err) => {
            console.log('uploadListPromise error', err);
          });
        toggleDeleteModal();

        if (afterDelete) {
          afterDelete(selectedItem?.id);
        }
      })
      .catch((err) => {
        console.log('deleteItemPromise error', err?.response);
      });
  };

  const handleCloseAddModal = () => {
    toggleAddModal();
    resetAddForm();
  };

  const onSubmitAdd = () => {
    if (!isValidAddForm) return;

    onClickAddSubmit();
  };

  const handleAddItem = (data) => {
    addItemPromise(data)
      .then(() => {
        uploadListPromise({
          page: page + 1,
          limit: rowsPerPage,
          sortBy: orderBy,
          order,
          query: searchQuery.current,
          startDate: startDate.current,
          endDate: endDate.current,
          filtersData: filtersData,
        })
          .then((res) => {
            setItems(res.list);
            setItemsCount(res.count);
          })
          .catch((err) => {
            console.log('uploadListPromise error', err);
          });
        handleCloseAddModal();
      })
      .catch((err) => {
        console.log('addItemPromise error', err);
      });
  };

  const handleCloseEditModal = () => {
    toggleEditModal();
    resetEditForm();
  };

  const onClickEdit = (e, id) => {
    e.stopPropagation();
    const item = items.find((item) => item.id === id);

    if (!item) {
      throw Error('Не найден элемент для редактирования');
    }

    setSelectedItem(item);
    toggleEditModal();
  };

  const onSubmitEdit = () => {
    if (!isValidEditForm) return;

    onClickEditSubmit();
  };

  const handleEditItem = (data) => {
    editItemPromise({
      id: selectedItem?.id,
      data,
    })
      .then(() => {
        uploadListPromise({
          page: 1,
          limit: rowsPerPage,
          sortBy: orderBy,
          order,
          query: searchQuery.current,
          startDate: startDate.current,
          endDate: endDate.current,
          filtersData: filtersData,
        })
          .then((res) => {
            setItems(res.list);
            setItemsCount(res.count);
          })
          .catch((err) => {
            console.log('uploadListPromise error', err);
          });

        if (afterEdit) {
          afterEdit(selectedItem?.id);
        }
        handleCloseEditModal();
      })
      .catch((err) => {
        console.log('editItemPromise error', err?.response);
      });
  };

  const handleSort = (property) => {
    setPage(0);
    const isAsc = orderBy === property && order === AppConstants.OrderTypes.asc;
    setOrder(isAsc ? AppConstants.OrderTypes.desc : AppConstants.OrderTypes.asc);
    setOrderBy(property);

    setPage(0);
    uploadListPromise({
      page: 1,
      limit: rowsPerPage,
      sortBy: property,
      order: isAsc ? AppConstants.OrderTypes.desc : AppConstants.OrderTypes.asc,
      query: searchQuery.current,
      startDate: startDate.current,
      endDate: endDate.current,
      filtersData: filtersData,
    })
      .then((res) => {
        setItems(res.list);
        setItemsCount(res.count);
      })
      .catch((err) => {
        console.log('uploadListPromise error', err);
      });
  };

  const rows = items.map((data) => {
    return getRowsTemplate(data);
  });

  const onSearch = (value, start, end) => {
    searchQuery.current = value;
    startDate.current = start;
    endDate.current = end;

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    const timeout = setTimeout(() => {
      setPage(0);
      uploadListPromise({
        page: 1,
        limit: rowsPerPage,
        sortBy: orderBy,
        order,
        query: value,
        startDate: start,
        endDate: end,
        filtersData: filtersData,
      })
        .then((res) => {
          setItems(res.list);
          setItemsCount(res.count);
        })
        .catch((err) => {
          console.log('uploadListPromise error', err);
        });

      searchTimeout.current = null;
    }, 100);

    searchTimeout.current = timeout;
  };

  return (
    <>
      {(withSearch || filtersPanel) && (
        <TableControl
          search={onSearch}
          withSearch={withSearch}
          withDate={withDate}
          filtersPanel={filtersPanel}
          isFiltersActive={isFiltersActive}
        />
      )}
      <Loader
        isLoading={loading}
        styles={{
          wrapper: (base) => ({
            ...base,
            overflow: 'auto',
            flexGrow: 1,
          }),
        }}>
        <Table stickyHeader>
          <TableHead
            sx={{
              borderTop: '1px solid rgba(0, 0, 0, 0.12)',
            }}>
            <StyledTable.HeaderRow>
              {headers.map((head, i) => {
                return (
                  <StyledTable.HeaderCell key={i} sx={head.style ?? {}}>
                    {head.sortType ? (
                      <TableSortLabel
                        active={orderBy === head.sortType}
                        direction={orderBy === head.sortType ? order : AppConstants.OrderTypes.asc}
                        onClick={() => handleSort(head.sortType)}>
                        {head.label}
                      </TableSortLabel>
                    ) : (
                      head.label
                    )}
                  </StyledTable.HeaderCell>
                );
              })}

              {!withoutAdd && (
                <StyledTable.HeaderIconCell>
                  {addItemPromise && (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        maxWidth: '114px',
                      }}>
                      <StyledTable.TableButton onClick={toggleAddModal}>
                        <StyledTable.AddIcon className={'icon-button'} />
                      </StyledTable.TableButton>
                    </div>
                  )}
                </StyledTable.HeaderIconCell>
              )}
            </StyledTable.HeaderRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => {
              return (
                <StyledTable.BodyRow
                  key={row.id}
                  onClick={() => (onRowClick ?? (() => {}))(row.id)}
                  sx={{
                    background: row.id === selectedRow ? 'rgba(246,246,246, .9)' : 'transparent',
                    cursor: onRowClick && row.id !== selectedRow ? 'pointer' : 'unset',
                    '&:hover': {
                      background:
                        onRowClick && row.id !== selectedRow
                          ? 'rgba(246,246,246, .4)'
                          : row.id === selectedRow
                            ? 'rgba(246,246,246, .9)'
                            : 'transparent',
                    },
                  }}>
                  {row.values.map((value, i) => {
                    return (
                      <StyledTable.BodyCell key={i} sx={value.style ?? {}}>
                        {value.value}
                      </StyledTable.BodyCell>
                    );
                  })}

                  {!!additionalActions.length && (
                    <StyledTable.ActionsCell>
                      <div className={'table-actions-wrapper'}>
                        {additionalActions.map((elem, i) => {
                          return cloneElement(elem, {
                            ...elem.props,
                            key: i,
                            onClick: (e) => elem.props.onClick(e, row.id),
                          });
                        })}
                      </div>
                    </StyledTable.ActionsCell>
                  )}

                  {!withoutAction && (
                    <StyledTable.ActionsCell>
                      {!(row.disabledAction ?? false) && (
                        <div className={'table-actions-wrapper'}>
                          {editItemPromise && (
                            <StyledTable.TableButton onClick={(e) => onClickEdit(e, row.id)}>
                              <StyledTable.EditIcon />
                            </StyledTable.TableButton>
                          )}

                          {deleteItemPromise && (
                            <StyledTable.TableButton onClick={(e) => onClickDelete(e, row.id)}>
                              <StyledTable.DeleteIcon />
                            </StyledTable.TableButton>
                          )}
                        </div>
                      )}
                    </StyledTable.ActionsCell>
                  )}
                </StyledTable.BodyRow>
              );
            })}
          </TableBody>
        </Table>
      </Loader>

      <Pagination
        count={itemsCount}
        page={page}
        handleChangePage={onPageChange}
        handleChangeRowsPerPage={onChangeRowsPerPage}
        rowsPerPage={rowsPerPage}
      />

      {!!deletePopupParams && (
        <Popup
          isOpen={openDeleteModal}
          toggleModal={toggleDeleteModal}
          headerTitle={deletePopupParams?.title}
          body={deletePopupParams?.getBody(selectedItem)}
          buttons={[
            <Button key={'action_1'} type={ButtonsType.action} onClick={handleDelete}>
              {AppConstants.deleteTxt}
            </Button>,
            <Button key={'action_2'} type={ButtonsType.action} onClick={toggleDeleteModal}>
              {AppConstants.cancelTxt}
            </Button>,
          ]}
        />
      )}

      {!!addPopupParams && (
        <Popup
          isOpen={openAddModal}
          toggleModal={toggleAddModal}
          onCloseModal={handleCloseAddModal}
          headerTitle={addPopupParams.title}
          closeonClickSpace={false}
          size={addPopupParams.size}
          body={
            <addPopupParams.Body
              {...(addPopupParams.additionalBodyProps ?? {})}
              formSelectors={addFormSelectors}
              onValidSubmit={handleAddItem}
            />
          }
          buttons={[
            <Button
              key={'action_1'}
              type={ButtonsType.action}
              disabled={!isValidAddForm}
              onClick={onSubmitAdd}>
              {AppConstants.addTxt}
            </Button>,
            <Button key={'action_2'} type={ButtonsType.action} onClick={handleCloseAddModal}>
              {AppConstants.cancelTxt}
            </Button>,
          ]}
        />
      )}

      {!!editPopupParams && (
        <Popup
          isOpen={openEditModal}
          toggleModal={toggleEditModal}
          onCloseModal={handleCloseEditModal}
          closeonClickSpace={false}
          headerTitle={editPopupParams.title}
          size={editPopupParams.size}
          body={
            <editPopupParams.Body
              formSelectors={editFormSelectors}
              onValidSubmit={handleEditItem}
              selectedItem={selectedItem}
            />
          }
          buttons={[
            <Button
              key={'action_1'}
              type={ButtonsType.action}
              disabled={!isValidEditForm}
              onClick={onSubmitEdit}>
              {AppConstants.saveTxt}
            </Button>,
            <Button key={'action_2'} type={ButtonsType.action} onClick={handleCloseEditModal}>
              {AppConstants.cancelTxt}
            </Button>,
          ]}
        />
      )}
    </>
  );
};

export default EditTable;
