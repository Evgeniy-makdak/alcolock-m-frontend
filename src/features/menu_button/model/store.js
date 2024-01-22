import { StateBuilder } from '@shared/lib/state_builder';

export const userState = new StateBuilder(null);
export const changePasswordLoadingState = new StateBuilder(false);
export const changePasswordErrorState = new StateBuilder();

export const userStore = {
  userData: userState.createHooks(),
  changingPassword: changePasswordLoadingState.createHooks(),
  changePasswordError: changePasswordErrorState.createHooks(),
};
