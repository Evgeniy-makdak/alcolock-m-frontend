import { useEffect, useRef, useState } from 'react';

import { AppConstants } from '@app/index';
import { HistoryTypes } from '@entities/events_data';
import { EventsHistory } from '@features/events_history';
import { UserPermissionsTypes } from '@features/menu_button';
import { userStore } from '@features/menu_button/model/store';
import { testids } from '@shared/const/testid';
import { useToggle } from '@shared/hooks/useToggle';
import { selectedBranchStore } from '@shared/model/selected_branch/store';
import { UserInfo } from '@widgets/users_info';

import { UsersSortTypes, addUser, changeUser, uploadUsersList } from '../model/effects';
import { addUserFormSelectors, editUserFromSelectors } from '../model/forms';
import { usersStore } from '../model/store';

export const useUsers = () => {
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [orderBy, setOrderBy] = useState(UsersSortTypes.byName);
  const [selectedItem, setSelectedItem] = useState(null);
  const searchQuery = useRef('');
  const startDate = useRef('');
  const endDate = useRef('');
  const [items, setItems] = useState([]);
  const isValidAddForm = addUserFormSelectors?.useIsFormValid();
  const onClickAddSubmit = addUserFormSelectors?.useOnClickSubmit();
  const isValidEditForm = editUserFromSelectors?.useIsFormValid();
  const onClickEditSubmit = editUserFromSelectors?.useOnClickSubmit();
  const onSubmitAdd = () => {
    if (!isValidAddForm) return;

    onClickAddSubmit();
  };
  const onSubmitEdit = () => {
    if (!isValidEditForm) return;

    onClickEditSubmit();
  };

  const resetAddForm = addUserFormSelectors?.useResetForm();
  const resetEditForm = editUserFromSelectors?.useResetForm();

  const [order, setOrder] = useState(AppConstants.OrderTypes.asc);
  const [itemsCount, setItemsCount] = useState(0);
  const [openAddModal, toggleAddModal] = useToggle();
  const [openEditModal, toggleEditModal] = useToggle();
  const [page, setPage] = useState(0);
  const [updateInfo, toggleUpdateInfo] = useToggle();
  const loading = usersStore.usersLoading.useValue();
  const selectedBranch = selectedBranchStore.selectedBranch.useValue();
  const userData = userStore.userData.useValue();

  useEffect(() => {
    handleCloseAside();
  }, [selectedBranch]);

  const onClickRow = (id) => setSelectedUserId(id);
  const handleCloseAside = () => setSelectedUserId(null);

  const afterDelete = (id) => {
    if (id === selectedUserId) {
      handleCloseAside();
    }
  };

  const afterEdit = (id) => {
    if (id === selectedUserId) {
      toggleUpdateInfo();
    }
  };
  const tabs = [
    {
      testid: testids.page_users.users_widget_info.USERS_WIDGET_INFO_TAB_BUTTON_INFO,
      name: 'ИНФО',
      content: <UserInfo selectedUserId={selectedUserId} updateData={updateInfo} />,
    },
    {
      testid: testids.page_users.users_widget_info.USERS_WIDGET_INFO_TAB_BUTTON_HISTORY,
      name: 'ИСТОРИЯ',
      content: <EventsHistory type={HistoryTypes.byUser} id={selectedUserId} />,
    },
  ];
  const handleAddItem = (data) => {
    (userData?.permissions.users === UserPermissionsTypes.CREATE ? addUser : null)(data)
      .then(() => {
        uploadUsersList({
          page: page + 1,
          limit: rowsPerPage,
          sortBy: orderBy,
          order,
          query: searchQuery.current,
          startDate: startDate.current,
          endDate: endDate.current,
        })
          .then((res) => {
            setItems(res.list);
            setItemsCount(res.count);
          })
          .catch((err) => {
            console.log('uploadListPromise error', err);
          });
        toggleAddModal();
      })
      .catch((err) => {
        console.log('addItemPromise error', err);
      });
  };
  const handleEditItem = (data) => {
    (userData?.permissions.users === UserPermissionsTypes.CREATE ? changeUser : null)({
      id: selectedItem?.id,
      data,
    })
      .then(() => {
        uploadUsersList({
          page: 1,
          limit: rowsPerPage,
          sortBy: orderBy,
          order,
          query: searchQuery.current,
          startDate: startDate.current,
          endDate: endDate.current,
          // filtersData: null,
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
        toggleEditModal();
      })
      .catch((err) => {
        console.log('editItemPromise error', err?.response);
      });
  };
  const handleCloseEditModal = () => {
    toggleEditModal();
    resetEditForm();
  };
  const handleCloseAddModal = () => {
    toggleAddModal();
    resetAddForm();
  };
  return {
    selectedItem,
    toggleEditModal,
    toggleAddModal,
    openEditModal,
    openAddModal,
    loading,
    userData,
    tabs,
    onClickRow,
    afterDelete,
    afterEdit,
    selectedUserId,
    handleCloseAside,
    selectedBranch,
    items,
    itemsCount,
    setPage,
    handleEditItem,
    handleAddItem,
    setRowsPerPage,
    setOrderBy,
    setSelectedItem,
    setOrder,
    handleCloseEditModal,
    handleCloseAddModal,
    onSubmitAdd,
    onSubmitEdit,
    isValidEditForm,
    isValidAddForm,
  };
};
