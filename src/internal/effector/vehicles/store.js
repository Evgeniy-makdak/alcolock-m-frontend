import StateBuilder from "../state_builder";
import AppConstants from "../../app_constants";

export const carsLoadingState = new StateBuilder(true)
export const allCarsListState = new StateBuilder(AppConstants.carList)
export const lastGetVehiclesListRequestState = new StateBuilder(null)

export const carDataLoadingState = new StateBuilder(false)
export const lastGetCarDataRequest = new StateBuilder(null)
export const createCarLoadingState = new StateBuilder(false)
export const lastSearchRequest = new StateBuilder(null)
export const changingCarLoadingState = new StateBuilder(false)
export const lastSearchByRegistrationNumberRequest = new StateBuilder(null)
export const lastSearchByManufacturersRequest = new StateBuilder(null)
export const carBranchSwitchLoadingState = new StateBuilder(false)

export const vehiclesStore = {
  carsLoading: carsLoadingState.createHooks(),
  allList: allCarsListState.createHooks(),
  carDataLoading: carDataLoadingState.createHooks(),
  createCarLoading: createCarLoadingState.createHooks(),
  changing: changingCarLoadingState.createHooks(),
  carBranchSwitchLoading: carBranchSwitchLoadingState.createHooks()
}
