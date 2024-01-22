import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppConstants, RoutePaths } from '@app';
import { RoleForm } from '@entities/roles_form';
import { EditTable } from '@features/edit_table';
import { userStore } from '@features/menu_button/model/store';
import { PageWrapper } from '@layout/page_wrapper';

import {
  ADD_POPUP_TITLE,
  DELETE_POPUP_TITLE,
  EDIT_POPUP_TITLE,
  HEADERS,
  getDeletePopupBody,
  getRowsTemplate,
} from '../lib/const';
import { RolesSortTypes, addRole, changeRole, deleteRole, uploadRolesList } from '../model/effects';
import { addRoleFormSelectors, editRoleFormSelectors } from '../model/forms';
import { rolesStore } from '../model/store';

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
    <PageWrapper>
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
    </PageWrapper>
  );
};

export default Roles;
