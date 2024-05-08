export enum ServiceModeInfoActionTypes {
  SERVICE_MODE_DEACTIVATE = 'SERVICE_MODE_DEACTIVATE',
  SERVICE_MODE_ACTIVATE = 'SERVICE_MODE_ACTIVATE',
}

export enum DriverOperatorState {
  OFFLINE_SWITCH = 'OFFLINE_SWITCH',
  DRIVER_WAITING = 'DRIVER_WAITING',
  OPERATOR_WAITING = 'OPERATOR_WAITING',
  DRIVER_ACCEPT = 'DRIVER_ACCEPT',
  DRIVER_CANCEL = 'DRIVER_CANCEL',
}

export enum OperatorAction {
  SWITCHING_ON = 'SWITCHING_ON',
  SWITCHING_OFF = 'SWITCHING_OFF',
}
