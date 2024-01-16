import AppConstants from '@app/lib/app_constants';
import StateBuilder from '@shared/lib/state_builder';

export const allAutoServiceListState = new StateBuilder(AppConstants.autoServiceList);
export const autoServiceListLoadingState = new StateBuilder(false);
export const lastGetAutoServiceListRequest = new StateBuilder(null);
export const updateTableState = new StateBuilder(false);
export const selectedDeviceIdState = new StateBuilder(null);
export const lastCheckAutoServiceCountRequest = new StateBuilder();
export const notificationsCountState = new StateBuilder(0);
export const updateNotificationsCountState = new StateBuilder(false);

export const autoServiceStore = {
  allList: allAutoServiceListState.createHooks(),
  updateTable: updateTableState.createHooks(),
  listLoading: autoServiceListLoadingState.createHooks(),
  selectedDeviceId: selectedDeviceIdState.createHooks(),
  notificationsCount: notificationsCountState.createHooks(),
  updateNotificationsCount: updateNotificationsCountState.createHooks(),
};
