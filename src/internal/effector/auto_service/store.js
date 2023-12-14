import StateBuilder from "../state_builder";
import AppConstants from "../../app_constants";

export const allAutoServiceListState = new StateBuilder(AppConstants.autoServiceList)
export const autoServiceListLoadingState = new StateBuilder(false)
export const lastGetAutoServiceListRequest = new StateBuilder(null)
export const updateTableState = new StateBuilder(false)
export const selectedDeviceIdState = new StateBuilder(null)
export const lastCheckAutoServiceCountRequest = new StateBuilder()
export const notificationsCountState = new StateBuilder(0)
export const updateNotificationsCountState = new StateBuilder(false)

export const autoServiceStore = {
  allList: allAutoServiceListState.createHooks(),
  updateTable: updateTableState.createHooks(),
  listLoading: autoServiceListLoadingState.createHooks(),
  selectedDeviceId: selectedDeviceIdState.createHooks(),
  notificationsCount: notificationsCountState.createHooks(),
  updateNotificationsCount: updateNotificationsCountState.createHooks()
}
