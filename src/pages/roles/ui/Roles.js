import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppConstants, RoutePaths } from '@app';
import { RoleForm } from '@entities/roles_form';
import { EditTable } from '@features/edit_table';
import { userStore } from '@features/menu_button/model/store';
import { PageWrapper } from '@layout/page_wrapper';
import { testids } from '@shared/const/testid';

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
import style from './Roles.module.scss';

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
        marginControls={style.marginControls}
        tableControlTestId={{
          inputSearch: testids.page_roles.roles_widget_header.ROLES_WIDGET_HEADER_SEARCH_INPUT,
          inputStart: testids.page_roles.roles_widget_header.ROLES_WIDGET_HEADER_FROM_DATE,
          inputEnd: testids.page_roles.roles_widget_header.ROLES_WIDGET_HEADER_TO_DATE,
          filterButton: testids.page_roles.roles_widget_header.ROLES_WIDGET_HEADER_FILTER_BUTTON,
        }}
        testIdsForTable={{
          table: testids.page_roles.roles_widget_table.ROLES_WIDGET_TABLE,
          headerItem: testids.page_roles.roles_widget_table.ROLES_WIDGET_TABLE_HEADER_ITEM,
          row: testids.page_roles.roles_widget_table.ROLES_WIDGET_TABLE_BODY_ITEM,
          rowActionEdit:
            testids.page_roles.roles_widget_table.ROLES_WIDGET_TABLE_BODY_ITEM_ACTION_EDIT,
          rowActionDelete:
            testids.page_roles.roles_widget_table.ROLES_WIDGET_TABLE_BODY_ITEM_ACTION_DELETE,
        }}
      />
    </PageWrapper>
  );
};

export default Roles;
