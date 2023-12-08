import {
  ADD_USER_POPUP_TITLE,
  getUsersRowsTemplate,
  USERS_TABLE_HEADERS
} from "./const";
import AppConstants from "../../../../internal/app_constants";
import {addGroupUser, GroupUsersSortTypes} from "../../../../internal/effector/groups/effects";
import {addGroupUserFormSelectors, switchGroupFormSelectors} from "../../../../internal/effector/groups/forms";
import AddUserForm from "./AddUserForm";
import {usersStore} from "../../../../internal/effector/users/store";
import {useCallback, useState} from "react";
import {switchUserGroup, uploadUsersList} from "../../../../internal/effector/users/effects";
import EditTable from "../../../shared/components/edit_table/EditTable";
import StyledTable from "../../../shared/components/edit_table/styled";
import {useToggle} from "../../../../internal/hooks/useToggle";
import Popup from "../../../shared/ui/popup/Popup";
import Button, {ButtonsType} from "../../../shared/ui/button/Button";
import SwitchGroupForm from "./SwitchGroupForm";

const GroupUsersTable = ({groupInfo}) => {
  const [openSwitchPopup, toggleSwitchPopup] = useToggle()
  const loadingUsers = usersStore.usersLoading.useValue()
  const [selectedUserId, setSelectedUserId] = useState(null)
  const isValidForm = switchGroupFormSelectors.useIsFormValid()
  const onClickSubmit = switchGroupFormSelectors.useOnClickSubmit()
  const [updateTable, toggleUpdateTable] = useToggle()
  const userSwitchLoading = usersStore.userBranchSwitchLoading.useValue()

  const handleUploadUsersList = useCallback((
    {
      page,
      limit,
      sortBy,
      order,
      query,
    }) => {
    return uploadUsersList({
      groupId: groupInfo?.id ?? 0,
      page,
      limit,
      sortBy,
      order,
      query,
    })
  }, [groupInfo])

  const handleOpenSwitchPopup = (e, id) => {
    setSelectedUserId(id)
    toggleSwitchPopup()
  }

  const handleCloseSwitchPopup = () => {
    toggleSwitchPopup()
    setSelectedUserId(null)
  }

  const transferButton = (
    <StyledTable.TableButton
      onClick={handleOpenSwitchPopup}
    >
      <StyledTable.ShiftIcon/>
    </StyledTable.TableButton>
  )

  const handleSwitchBranch = (data) => {
    switchUserGroup({
      userId: selectedUserId,
      groupId: data.group?.id
    })
      .then(() => {
        handleCloseSwitchPopup()
        toggleUpdateTable()
      })
      .catch(err => {
        console.log('handleSwitchBranch GroupUsersTable error', err?.response)
      })
  }

  const onClickSwitch = () => {
    if (!isValidForm) return

    onClickSubmit()
  }

  return (
    <>
      <EditTable
        loading={loadingUsers}
        headers={USERS_TABLE_HEADERS}
        getRowsTemplate={getUsersRowsTemplate}
        initOrderType={AppConstants.OrderTypes.asc}
        initOrderBy={GroupUsersSortTypes.byName}
        withDate={false}
        uploadListPromise={handleUploadUsersList}
        addFormSelectors={addGroupUserFormSelectors}
        addItemPromise={(data) => addGroupUser({data, groupId: groupInfo?.id ?? 0})}
        withoutAction={true}
        addPopupParams={{
          title: ADD_USER_POPUP_TITLE,
          Body: AddUserForm,
          additionalBodyProps: {
            groupId: groupInfo?.id
          }
        }}
        additionalActions={[
          transferButton
        ]}
        updateTable={updateTable}
      />

      <Popup
        isOpen={openSwitchPopup}
        toggleModal={toggleSwitchPopup}
        headerTitle={'Перемещение пользователя'}
        closeonClickSpace={false}
        body={<SwitchGroupForm
          groupInfo={groupInfo}
          onValidSubmit={handleSwitchBranch}
          loading={userSwitchLoading}
        />}
        buttons={[
          <Button
            key={'action_1'}
            type={ButtonsType.action}
            onClick={onClickSwitch}
          >
            Переместить
          </Button>,
          <Button
            key={'action_2'}
            type={ButtonsType.action}
            onClick={handleCloseSwitchPopup}
          >
            {AppConstants.cancelTxt}
          </Button>,
        ]}
      />
    </>
  )
}

export default GroupUsersTable
