import StateBuilder from '@shared/lib/state_builder';

export const AuthStatus = {
  auth: 'auth',
  notAuth: 'notAuth',
};

export const appLoadingState = new StateBuilder(true);
export const appAuthStatusState = new StateBuilder(AuthStatus.notAuth);
export const appTokenState = new StateBuilder();
export const refreshTokenState = new StateBuilder();
export const isAuthorization = new StateBuilder(false);

export const appStore = {
  appLoading: appLoadingState.createHooks(),
  appAuthStatus: appAuthStatusState.createHooks(),
  appToken: appTokenState.createHooks(),
  isAuthorization: isAuthorization.createHooks(),
};
