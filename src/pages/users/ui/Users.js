import { AppConstants } from '@app';
import { RowTableInfo } from '@entities/row_table_info';
import { EditTable } from '@features/edit_table';
import { UserPermissionsTypes } from '@features/menu_button';
import { UserForm } from '@features/users_form';
import { PageWrapper } from '@layout/page_wrapper';
import { testids } from '@shared/const/testid';
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
    // selectedItem,
    // toggleEditModal,
    // toggleAddModal,
    // openEditModal,
    // openAddModal,
    loading,
    userData,
    tabs,
    onClickRow,
    afterDelete,
    afterEdit,
    selectedUserId,
    handleCloseAside,
    selectedBranch,
    // items,
    // itemsCount,
    // setPage,
    // handleEditItem,
    // handleAddItem,
    // setRowsPerPage,
    // setOrderBy,
    // setSelectedItem,
    // setOrder,
    // handleCloseEditModal,
    // handleCloseAddModal,
    // onSubmitAdd,
    // onSubmitEdit,
    // isValidEditForm,
    // isValidAddForm,
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
          tableControlTestId={{
            inputSearch: testids.page_users.users_widget_header.USERS_WIDGET_HEADER_SEARCH_INPUT,
            inputStart: testids.page_users.users_widget_header.USERS_WIDGET_HEADER_FROM_DATE,
            inputEnd: testids.page_users.users_widget_header.USERS_WIDGET_HEADER_TO_DATE,
          }}
          testIdsForTable={{
            table: testids.page_users.users_widget_table.USERS_WIDGET_TABLE,
            headerItem: testids.page_users.users_widget_table.USERS_WIDGET_TABLE_HEADER_ITEM,
            row: testids.page_users.users_widget_table.USERS_WIDGET_TABLE_BODY_ITEM,
            rowActionEdit:
              testids.page_users.users_widget_table.USERS_WIDGET_TABLE_BODY_ITEM_ACTION_EDIT,
            rowActionDelete:
              testids.page_users.users_widget_table.USERS_WIDGET_TABLE_BODY_ITEM_ACTION_DELETE,
          }}
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
// {openAddModal && (
//   <Popup
//     isOpen={openAddModal}
//     toggleModal={toggleAddModal}
//     onCloseModal={toggleAddModal}
//     headerTitle={ADD_POPUP_TITLE}
//     closeonClickSpace={false}
//     styles={style.large}
//     body={<UserForm formSelectors={addUserFormSelectors} onValidSubmit={handleAddItem} />}
//     buttons={[
//       <Button
//         key={'action_1'}
//         type={ButtonsType.action}
//         disabled={!isValidAddForm}
//         onClick={onSubmitAdd}>
//         {AppConstants.addTxt}
//       </Button>,
//       <Button key={'action_2'} type={ButtonsType.action} onClick={handleCloseAddModal}>
//         {AppConstants.cancelTxt}
//       </Button>,
//     ]}
//   />
// )}
// {/* // TODO => Обертка для таблиц не должна знать о модалках */}
// {openEditModal && (
//   <Popup
//     isOpen={openEditModal}
//     toggleModal={toggleEditModal}
//     onCloseModal={toggleEditModal}
//     closeonClickSpace={false}
//     headerTitle={EDIT_POPUP_TITLE}
//     styles={style.large}
//     body={
//       <UserForm
//         formSelectors={editUserFromSelectors}
//         onValidSubmit={handleEditItem}
//         selectedItem={selectedItem}
//       />
//     }
//     buttons={[
//       <Button
//         key={'action_1'}
//         type={ButtonsType.action}
//         disabled={!isValidEditForm}
//         onClick={onSubmitEdit}>
//         {AppConstants.saveTxt}
//       </Button>,
//       <Button key={'action_2'} type={ButtonsType.action} onClick={handleCloseEditModal}>
//         {AppConstants.cancelTxt}
//       </Button>,
//     ]}
//   />
// )}
