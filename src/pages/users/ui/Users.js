import { useEffect, useState } from 'react';

import { AppConstants } from '@app';
import { RowTableInfo } from '@entities/row_table_info';
import { EditTable } from '@features/edit_table';
import { EventsHistory, HistoryTypes } from '@features/events_history/ui/EventsHistory';
import { UserPermissionsTypes } from '@features/menu_button/model/effects';
import { userStore } from '@features/menu_button/model/store';
import { UserForm } from '@features/users_form';
import { PageWrapper } from '@layout/page_wrapper';
import { useToggle } from '@shared/hooks/useToggle';
import { selectedBranchStore } from '@shared/model/selected_branch/store';
import { Aside } from '@shared/ui/aside';
import { UserInfo } from '@widgets/users_info';

import {
  ADD_POPUP_TITLE,
  DELETE_POPUP_TITLE,
  EDIT_POPUP_TITLE,
  HEADERS,
  getDeletePopupBody,
  getRowsTemplate,
} from '../lib/const';
import { UsersSortTypes, addUser, changeUser, deleteUser, uploadUsersList } from '../model/effects';
import { addUserFormSelectors, editUserFromSelectors } from '../model/forms';
import { usersStore } from '../model/store';
import style from './Users.module.scss';

const Users = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
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

  return (
    <>
      <PageWrapper>
        <EditTable
          loading={!!loading}
          headers={HEADERS}
          getRowsTemplate={getRowsTemplate}
          initOrderType={AppConstants.OrderTypes.asc}
          initOrderBy={UsersSortTypes.byName}
          addFormSelectors={addUserFormSelectors}
          editFormSelectors={editUserFromSelectors}
          uploadListPromise={uploadUsersList}
          deleteItemPromise={
            userData?.permissions.users === UserPermissionsTypes.create ? deleteUser : null
          }
          editItemPromise={
            userData?.permissions.users === UserPermissionsTypes.create ? changeUser : null
          }
          addItemPromise={
            userData?.permissions.users === UserPermissionsTypes.create ? addUser : null
          }
          deletePopupParams={{
            title: DELETE_POPUP_TITLE,
            getBody: getDeletePopupBody,
          }}
          addPopupParams={{
            title: ADD_POPUP_TITLE,
            Body: UserForm,
            style: style.large,
          }}
          editPopupParams={{
            title: EDIT_POPUP_TITLE,
            Body: UserForm,
            style: style.large,
          }}
          onRowClick={onClickRow}
          afterDelete={afterDelete}
          selectedRow={selectedUserId}
          afterEdit={afterEdit}
          updateTable={selectedBranch}
        />
      </PageWrapper>

      {selectedUserId && (
        <Aside onClose={handleCloseAside}>
          <RowTableInfo
            infoContent={<UserInfo selectedUserId={selectedUserId} updateData={updateInfo} />}
            historyContent={<EventsHistory type={HistoryTypes.byUser} id={selectedUserId} />}
          />
        </Aside>
      )}
    </>
  );
};

export default Users;
