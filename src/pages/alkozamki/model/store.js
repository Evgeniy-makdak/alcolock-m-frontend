import { AppConstants } from '@app';
import { StateBuilder } from '@shared/lib/state_builder';

export const alkozamkiLoadingState = new StateBuilder(true);
export const alkozamkiListState = new StateBuilder([]);
export const allAlkozamkiState = new StateBuilder(AppConstants.alkozamkiList);
export const lastGetAlcolocksListRequestState = new StateBuilder(null);
export const lastGetItemDataRequest = new StateBuilder(null);
export const loadingItemDataState = new StateBuilder(false);
export const createAlcolcokLoadingState = new StateBuilder(false);
export const changeAlcolcokLoadingState = new StateBuilder(false);
export const lastSearchAlcolocksRequest = new StateBuilder(null);
export const alcolockBranchSwitchLoadingState = new StateBuilder(false);
export const alcolockErrorState = new StateBuilder(null);
export const alkozamkiStore = {
  alkozamkiLoading: alkozamkiLoadingState.createHooks(),
  alkozamkiList: alkozamkiListState.createHooks(),
  allAlkozamki: allAlkozamkiState.createHooks(),
  loadingData: loadingItemDataState.createHooks(),
  creating: createAlcolcokLoadingState.createHooks(),
  changing: changeAlcolcokLoadingState.createHooks(),
  alcolockBranchSwitchLoading: alcolockBranchSwitchLoadingState.createHooks(),
  error: alcolockErrorState.createHooks(),
};
