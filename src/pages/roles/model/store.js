import AppConstants from '@app/lib/app_constants';
import StateBuilder from '@shared/lib/state_builder';

export const rolesListState = new StateBuilder([]);
export const rolesListLoadingState = new StateBuilder(false);
export const lastGetRolesListRequest = new StateBuilder(null);
export const allRolesState = new StateBuilder(AppConstants.rolesList);
export const createRoleLoadingState = new StateBuilder(false);
export const changeRoleLoadingState = new StateBuilder(false);
export const lastGetRoleDataRequest = new StateBuilder();
export const roleDataLoadingState = new StateBuilder(false);

export const rolesStore = {
  rolesList: rolesListState.createHooks(),
  allRoles: allRolesState.createHooks(),
  loadingList: rolesListLoadingState.createHooks(),
  creating: createRoleLoadingState.createHooks(),
  changing: changeRoleLoadingState.createHooks(),
  loadingData: roleDataLoadingState.createHooks(),
};
