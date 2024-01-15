import AppConstants from '../../app_constants';
import StateBuilder from '../state_builder';

export const eventsLoadingState = new StateBuilder(true);
export const eventsListState = new StateBuilder([]);
export const allEventsListState = new StateBuilder(AppConstants.eventsList);
export const lastGetEventsListRequest = new StateBuilder(null);
export const lastGetEventDataRequest = new StateBuilder(null);
export const lastGetEventsHistoryRequest = new StateBuilder(null);
export const activateServiceLoadingState = new StateBuilder(false);

export const eventsStore = {
  eventsList: eventsListState.createHooks(),
  eventsLoading: eventsLoadingState.createHooks(),
  allEventsList: allEventsListState.createHooks(),
  activateServiceLoading: activateServiceLoadingState.createHooks(),
};
