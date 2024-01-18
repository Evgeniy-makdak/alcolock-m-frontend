import { useEffect, useState } from 'react';

import AppConstants from '@app/lib/app_constants';
import RoutePaths from '@app/lib/route_paths';
import GroupForm from '@entities/groups/ui/GroupForm/GroupForm';
import EditTable from '@features/edit_table/ui/EditTable';
import { userStore } from '@features/menu_button/model/store';
import { PageWrapper } from '@layout/page_wrapper';
import { useToggle } from '@shared/hooks/useToggle';
import GroupInfo from '@widgets/groups/ui/GroupInfo/GroupInfo';
import { useNavigate } from 'react-router-dom';

import { ADD_POPUP_TITLE, DELETE_POPUP_TITLE, EDIT_POPUP_TITLE, HEADERS } from '../lib/const';
import { getDeletePopupBody, getRowsTemplate } from '../lib/helpers';
import {
  GroupsSortTypes,
  addGroup,
  deleteGroup,
  editGroupName,
  uploadGroupsList,
} from '../model/effects';
import { addGroupFormSelectors, editGroupFormSelectors } from '../model/forms';
import { groupsStore } from '../model/store';

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
      <PageWrapper>
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
      </PageWrapper>

      {selectedGroupId && (
        <GroupInfo
          selectedGroupId={selectedGroupId}
          updateInfo={updateInfo}
          onClose={() => setSelectedGroupId(null)}
        />
      )}
    </>
  );
};

export default Groups;
