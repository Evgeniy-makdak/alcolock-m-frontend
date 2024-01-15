import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AppConstants from '../../../internal/app_constants';
import { RolesSortTypes, addRole, changeRole, deleteRole, uploadRolesList } from '../../../internal/effector/roles/effects';
import { addRoleFormSelectors, editRoleFormSelectors } from '../../../internal/effector/roles/forms';
import { rolesStore } from '../../../internal/effector/roles/store';
import { userStore } from '../../../internal/effector/user/store';
import RoutePaths from '../../../internal/route_paths';
import EditTable from '../../shared/components/edit_table/EditTable';
import RoleForm from './components/RoleForm';
import {
  ADD_POPUP_TITLE,
  DELETE_POPUP_TITLE,
  EDIT_POPUP_TITLE,
  HEADERS,
  getDeletePopupBody,
  getRowsTemplate,
} from './const';

const Roles = () => {
  const loading = rolesStore.loadingList.useValue();
  const navigate = useNavigate();
  const userData = userStore.userData.useValue();

  useEffect(() => {
    if (!userData?.isAdmin) {
      navigate(RoutePaths.events);
    }
  }, [userData]);

  return (
    <div className={'page permissions'}>
      <EditTable
        loading={loading}
        headers={HEADERS}
        getRowsTemplate={getRowsTemplate}
        initOrderType={AppConstants.OrderTypes.asc}
        initOrderBy={RolesSortTypes.byRole}
        addFormSelectors={addRoleFormSelectors}
        editFormSelectors={editRoleFormSelectors}
        uploadListPromise={uploadRolesList}
        deleteItemPromise={deleteRole}
        addItemPromise={addRole}
        editItemPromise={changeRole}
        deletePopupParams={{
          title: DELETE_POPUP_TITLE,
          getBody: getDeletePopupBody,
        }}
        addPopupParams={{
          title: ADD_POPUP_TITLE,
          Body: RoleForm,
        }}
        editPopupParams={{
          title: EDIT_POPUP_TITLE,
          Body: RoleForm,
        }}
        withDate={false}
      />
    </div>
  );
};

export default Roles;
