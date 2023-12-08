import StateBuilder from "../state_builder";
import AppConstants from "../../app_constants";

export const usersLoadingState = new StateBuilder(true)
export const usersListState = new StateBuilder([])
export const lastUsersListRequest = new StateBuilder(null)
export const userDataLoadingState = new StateBuilder(false)
export const lastGetUserDataRequest = new StateBuilder(null)
export const allUsersListState = new StateBuilder(AppConstants.usersList)
export const lastSearchDriversRequest = new StateBuilder(null)
export const createUserLoadingState = new StateBuilder(false)
export const changeUserLoadingState = new StateBuilder(false)
export const userErrorState = new StateBuilder()

export const lastSearchUsersRequest = new StateBuilder()
export const userBranchSwitchLoadingState = new StateBuilder(false)

export const usersStore = {
  usersLoading: usersLoadingState.createHooks(),
  usersList: usersListState.createHooks(),
  allList: allUsersListState.createHooks(),
  dataLoading: userDataLoadingState.createHooks(),
  creating: createUserLoadingState.createHooks(),
  changing: changeUserLoadingState.createHooks(),
  userError: userErrorState.createHooks(),
  userBranchSwitchLoading: userBranchSwitchLoadingState.createHooks()
}
