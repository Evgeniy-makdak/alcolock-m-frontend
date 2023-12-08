import './Users.sass'
import {
  addUser,
  changeUser,
  deleteUser,
  uploadUsersList,
  UsersSortTypes
} from "../../../internal/effector/users/effects";
import {addUserFormSelectors, editUserFromSelectors} from "../../../internal/effector/users/forms";
import EditTable from "../../shared/components/edit_table/EditTable";
import {
  ADD_POPUP_TITLE,
  DELETE_POPUP_TITLE,
  EDIT_POPUP_TITLE,
  getDeletePopupBody,
  getRowsTemplate,
  HEADERS
} from "./const";
import AppConstants from "../../../internal/app_constants";
import UserForm from "./components/UserForm";
import {useEffect, useState} from "react";
import Aside from "../../shared/components/aside/Aside";
import RowTableInfo from "../../shared/components/row_table_info/RowTableInfo";
import UserInfo from "./components/UserInfo";
import {useToggle} from "../../../internal/hooks/useToggle";
import EventsHistory, {HistoryTypes} from "../../shared/components/events_history/EventsHistory";
import {usersStore} from "../../../internal/effector/users/store";
import {selectedBranchStore} from "../../../internal/effector/selected_branch/store";
import {userStore} from "../../../internal/effector/user/store";
import {UserPermissionsTypes} from "../../../internal/effector/user/effects";

const Users = () => {
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [updateInfo, toggleUpdateInfo] = useToggle()
  const loading = usersStore.usersLoading.useValue()
  const selectedBranch = selectedBranchStore.selectedBranch.useValue()
  const userData = userStore.userData.useValue()

  useEffect(() => {
    handleCloseAside()
  }, [selectedBranch])

  const onClickRow = (id) => setSelectedUserId(id)
  const handleCloseAside = () => setSelectedUserId(null)

  const afterDelete = (id) => {
    if (id === selectedUserId) {
      handleCloseAside()
    }
  }

  const afterEdit = (id) => {
    if (id === selectedUserId) {
      toggleUpdateInfo()
    }
  }

  return (
    <>
      <div className={'page users'}>
        <EditTable
          loading={!!loading}
          headers={HEADERS}
          getRowsTemplate={getRowsTemplate}
          initOrderType={AppConstants.OrderTypes.asc}
          initOrderBy={UsersSortTypes.byName}
          addFormSelectors={addUserFormSelectors}
          editFormSelectors={editUserFromSelectors}
          uploadListPromise={uploadUsersList}
          deleteItemPromise={userData?.permissions.users === UserPermissionsTypes.create
            ? deleteUser
            : null}
          editItemPromise={userData?.permissions.users === UserPermissionsTypes.create
            ? changeUser
            : null}
          addItemPromise={userData?.permissions.users === UserPermissionsTypes.create
              ? addUser
              : null}
          deletePopupParams={{
            title: DELETE_POPUP_TITLE,
            getBody: getDeletePopupBody
          }}
          addPopupParams={{
            title: ADD_POPUP_TITLE,
            Body: UserForm,
            size: "l"
          }}
          editPopupParams={{
            title: EDIT_POPUP_TITLE,
            Body: UserForm,
            size: "l"
          }}
          onRowClick={onClickRow}
          afterDelete={afterDelete}
          selectedRow={selectedUserId}
          afterEdit={afterEdit}
          updateTable={selectedBranch}
        />
      </div>

      {selectedUserId &&
        <Aside
          onClose={handleCloseAside}
        >
          <RowTableInfo
            infoContent={<UserInfo
              selectedUserId={selectedUserId}
              updateData={updateInfo}
            />}
            historyContent={<EventsHistory
              type={HistoryTypes.byUser}
              id={selectedUserId}
            />}
          />
        </Aside>
      }
    </>
  )
}

export default Users
