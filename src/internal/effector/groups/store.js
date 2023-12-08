import StateBuilder from "../state_builder";
import AppConstants from "../../app_constants";

export const allGroupsListState = new StateBuilder(AppConstants.groupsList)
export const groupsListLoadingState = new StateBuilder(false)
export const lastGetGroupsListRequestState = new StateBuilder(null)

export const groupLoadingState = new StateBuilder(false)
export const lastGetGroupRequest = new StateBuilder(null)

export const createGroupLoadingState = new StateBuilder(false)
export const changeGroupLoadingState = new StateBuilder(false)

export const selectedGroupsUsersListState = new StateBuilder([])
export const lastSearchGroupsRequest = new StateBuilder(null)
export const usersMoveLoadingState = new StateBuilder(false)
export const carsMoveLoadingState = new StateBuilder(false)
export const alcolocksMoveLoadingState = new StateBuilder(false)

export const groupsStore = {
  allGroupsList: allGroupsListState.createHooks(),
  listLoading: groupsListLoadingState.createHooks(),
  selectedGroupsUsersList: selectedGroupsUsersListState.createHooks(),
  groupLoading: groupLoadingState.createHooks(),
  usersMoveLoading: usersMoveLoadingState.createHooks(),
  carsMoveLoading: carsMoveLoadingState.createHooks(),
  alcolocksMoveLoading: alcolocksMoveLoadingState.createHooks(),
}
