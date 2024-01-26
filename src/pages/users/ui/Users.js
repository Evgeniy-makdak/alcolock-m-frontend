import { AppConstants } from '@app';
import { RowTableInfo } from '@entities/row_table_info';
import { EditTable } from '@features/edit_table';
import { UserPermissionsTypes } from '@features/menu_button';
import { UserForm } from '@features/users_form';
import { PageWrapper } from '@layout/page_wrapper';
import { Aside } from '@shared/ui/aside';

import { useUsers } from '../hooks/useUsers';
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
import style from './Users.module.scss';

const Users = () => {
  const {
    afterDelete,
    afterEdit,
    loading,
    onClickRow,
    tabs,
    userData,
    handleCloseAside,
    selectedUserId,
    selectedBranch,
  } = useUsers();
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
            userData?.permissions.users === UserPermissionsTypes.CREATE ? deleteUser : null
          }
          editItemPromise={
            userData?.permissions.users === UserPermissionsTypes.CREATE ? changeUser : null
          }
          addItemPromise={
            userData?.permissions.users === UserPermissionsTypes.CREATE ? addUser : null
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
          marginControls={style.marginControls}
        />
      </PageWrapper>

      {selectedUserId && (
        <Aside onClose={handleCloseAside}>
          <RowTableInfo tabs={tabs} key={selectedUserId} />
        </Aside>
      )}
    </>
  );
};

export default Users;
