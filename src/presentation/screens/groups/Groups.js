import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AppConstants from '../../../internal/app_constants';
import {
  GroupsSortTypes,
  addGroup,
  deleteGroup,
  editGroupName,
  uploadGroupsList,
} from '../../../internal/effector/groups/effects';
import { addGroupFormSelectors, editGroupFormSelectors } from '../../../internal/effector/groups/forms';
import { groupsStore } from '../../../internal/effector/groups/store';
import { userStore } from '../../../internal/effector/user/store';
import { useToggle } from '../../../internal/hooks/useToggle';
import RoutePaths from '../../../internal/route_paths';
import EditTable from '../../shared/components/edit_table/EditTable';
import GroupForm from './components/GroupForm';
import GroupInfo from './components/GroupInfo';
import {
  ADD_POPUP_TITLE,
  DELETE_POPUP_TITLE,
  EDIT_POPUP_TITLE,
  HEADERS,
  getDeletePopupBody,
  getRowsTemplate,
} from './const';

const Groups = () => {
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [updateInfo, toggleUpdateInfo] = useToggle();
  const loading = groupsStore.listLoading.useValue();
  const navigate = useNavigate();
  const userData = userStore.userData.useValue();

  useEffect(() => {
    if (!userData?.isAdmin) {
      navigate(RoutePaths.events);
    }
  }, [userData]);

  const onClickRow = (id) => setSelectedGroupId(id);
  const handleCloseAside = () => setSelectedGroupId(null);

  const afterDelete = (id) => {
    if (id === selectedGroupId) {
      handleCloseAside();
    }
  };

  const afterEdit = (id) => {
    if (id === selectedGroupId) {
      toggleUpdateInfo();
    }
  };

  return (
    <>
      <div className={'page groups'}>
        <EditTable
          loading={loading}
          headers={HEADERS}
          getRowsTemplate={getRowsTemplate}
          initOrderType={AppConstants.OrderTypes.asc}
          initOrderBy={GroupsSortTypes.byName}
          uploadListPromise={uploadGroupsList}
          deleteItemPromise={deleteGroup}
          addItemPromise={addGroup}
          editItemPromise={editGroupName}
          addFormSelectors={addGroupFormSelectors}
          editFormSelectors={editGroupFormSelectors}
          deletePopupParams={{
            title: DELETE_POPUP_TITLE,
            getBody: getDeletePopupBody,
          }}
          addPopupParams={{
            title: ADD_POPUP_TITLE,
            Body: GroupForm,
          }}
          editPopupParams={{
            title: EDIT_POPUP_TITLE,
            Body: GroupForm,
          }}
          selectedRow={selectedGroupId}
          afterDelete={afterDelete}
          onRowClick={onClickRow}
          afterEdit={afterEdit}
        />
      </div>

      {selectedGroupId && (
        <GroupInfo selectedGroupId={selectedGroupId} updateInfo={updateInfo} onClose={() => setSelectedGroupId(null)} />
      )}
    </>
  );
};

export default Groups;
