import { useCallback, useState } from 'react';

import AppConstants from '@app/lib/app_constants';
import AddUserForm from '@entities/groups/ui/AddUserForm/AddUserForm';
import EditTable from '@features/edit_table/ui/EditTable';
import SwitchGroupForm from '@features/groups/ui/SwitchGroupForm';
import { GroupUsersSortTypes, addGroupUser } from '@pages/groups/model/effects';
import { addGroupUserFormSelectors, switchGroupFormSelectors } from '@pages/groups/model/forms';
import { switchUserGroup, uploadUsersList } from '@pages/users/model/effects';
import { usersStore } from '@pages/users/model/store';
import { useToggle } from '@shared/hooks/useToggle';
import StyledTable from '@shared/styled_components/styledTable';
import Button, { ButtonsType } from '@shared/ui/button/Button';
import Popup from '@shared/ui/popup/Popup';

import { ADD_USER_POPUP_TITLE, USERS_TABLE_HEADERS } from '../../lib/const';
import { getUsersRowsTemplate } from '../../lib/helpers';

const GroupUsersTable = ({ groupInfo }) => {
  const [openSwitchPopup, toggleSwitchPopup] = useToggle();
  const loadingUsers = usersStore.usersLoading.useValue();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const isValidForm = switchGroupFormSelectors.useIsFormValid();
  const onClickSubmit = switchGroupFormSelectors.useOnClickSubmit();
  const [updateTable, toggleUpdateTable] = useToggle();
  const userSwitchLoading = usersStore.userBranchSwitchLoading.useValue();

  const handleUploadUsersList = useCallback(
    ({ page, limit, sortBy, order, query }) => {
      return uploadUsersList({
        groupId: groupInfo?.id ?? 0,
        page,
        limit,
        sortBy,
        order,
        query,
      });
    },
    [groupInfo],
  );

  const handleOpenSwitchPopup = (e, id) => {
    setSelectedUserId(id);
    toggleSwitchPopup();
  };

  const handleCloseSwitchPopup = () => {
    toggleSwitchPopup();
    setSelectedUserId(null);
  };

  const transferButton = (
    <StyledTable.TableButton onClick={handleOpenSwitchPopup}>
      <StyledTable.ShiftIcon />
    </StyledTable.TableButton>
  );

  const handleSwitchBranch = (data) => {
    switchUserGroup({
      userId: selectedUserId,
      groupId: data.group?.id,
    })
      .then(() => {
        handleCloseSwitchPopup();
        toggleUpdateTable();
      })
      .catch((err) => {
        console.log('handleSwitchBranch GroupUsersTable error', err?.response);
      });
  };

  const onClickSwitch = () => {
    if (!isValidForm) return;

    onClickSubmit();
  };

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
        addItemPromise={(data) => addGroupUser({ data, groupId: groupInfo?.id ?? 0 })}
        withoutAction={true}
        addPopupParams={{
          title: ADD_USER_POPUP_TITLE,
          Body: AddUserForm,
          additionalBodyProps: {
            groupId: groupInfo?.id,
          },
        }}
        additionalActions={[transferButton]}
        updateTable={updateTable}
      />

      <Popup
        isOpen={openSwitchPopup}
        toggleModal={toggleSwitchPopup}
        headerTitle={'Перемещение пользователя'}
        closeonClickSpace={false}
        body={
          <SwitchGroupForm
            groupInfo={groupInfo}
            onValidSubmit={handleSwitchBranch}
            loading={userSwitchLoading}
          />
        }
        buttons={[
          <Button key={'action_1'} type={ButtonsType.action} onClick={onClickSwitch}>
            Переместить
          </Button>,
          <Button key={'action_2'} type={ButtonsType.action} onClick={handleCloseSwitchPopup}>
            {AppConstants.cancelTxt}
          </Button>,
        ]}
      />
    </>
  );
};

export default GroupUsersTable;
