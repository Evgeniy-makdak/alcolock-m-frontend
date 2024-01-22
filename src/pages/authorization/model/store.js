import { StateBuilder } from '@shared/lib/state_builder';

export const authErrorState = new StateBuilder();

export const authStore = {
  authError: authErrorState.createHooks(),
};
