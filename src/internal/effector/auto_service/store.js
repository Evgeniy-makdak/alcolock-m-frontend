import StateBuilder from "../state_builder";
import AppConstants from "../../app_constants";

export const allAutoServiceListState = new StateBuilder(AppConstants.autoServiceList)
export const autoServiceListLoadingState = new StateBuilder(false)
export const lastGetAutoServiceListRequest = new StateBuilder(null)
export const updateTableState = new StateBuilder(false)

export const autoServiceStore = {
  allList: allAutoServiceListState.createHooks(),
  updateTable: updateTableState.createHooks()
}

