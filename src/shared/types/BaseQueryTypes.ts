export interface IUser {
  firstName: string;
  middleName: string;
  lastName: string;
  activated: boolean;
  email: string;
  login: string;
  id: number;
  lastModifiedBy: {
    email: string;
    firstName: string;
    id: 1;
    lastName: string;
    middleName: string;
  };
  assignment: {
    branch: { id: number; name: string };
    createdAt: string;
    createdBy: {
      name: string;
      id: number;
      email: string;
      firstName: string;
      middleName: string;
      lastName: string;
    };
  };
  driver: {
    id: number;
    licenseClass: string[];
    licenseCode: string;
    licenseExpirationDate: string;
    licenseIssueDate: string;
    vehicleAllotments: {
      vehicle: ICar;
      id: number;
    }[];
  };
  disabled: boolean;
}

export interface IAttachmentItems {
  createdAt: string;
  createdBy: IUser;
  id: number;
  driver: {
    id: number;
    licenseClass: string[];
    licenseCode: string;
    licenseExpirationDate: string;
    licenseIssueDate: string;
    userAccount: IUser;
  };
  vehicle: ICar;
}

export interface AttachmentsCreateData {
  driverId: number | string;
  vehicleId: number | string;
}

export interface ICar {
  color: string;
  id: number;
  manufacturer: string;
  model: string;
  registrationNumber: string;
  type: string;
  vin: string;
  year: string;
  monitoringDevice: {
    id: string;
    name: string;
    serialNumber: string;
    serviceId: string;
    mode: string;
    modeUpdatedAt: string;
  };
}

export interface IAlcolocks {
  id: number;
  name: string;
  serialNumber: number;
  serviceId: string;
  mode: string;
  modeUpdatedAt: string;
  lastModifiedAt: string;
  activeActions: [];
  createdAt: string;
  vehicleBind: {
    createdBy: {
      id: number;
      email: string;
      firstName: string;
      middleName: string;
      lastName: string;
    };
    createdAt: string;
    vehicle: {
      id: number;
      registrationNumber: string;
      manufacturer: string;
      model: string;
      type: string;
      color: string;
    };
  };

  assignment: {
    branch: {
      id: number;
      name: string;
    };
    createdAt: string;
    createdBy: {
      id: number;
      email: string;
      firstName: string;
      middleName: string;
      lastName: string;
    };
  };

  createdBy: {
    id: number;
    email: string;
    firstName: string;
    middleName: string;
    lastName: string;
  };

  lastModifiedBy: {
    id: number;
    email: string;
    firstName: string;
    middleName: string;
    lastName: string;
  };
}

export interface Event {
  eventType: string;
  extra: {
    qrCode: string;
  };
  id: number;
  latitude: number;
  longitude: number;
  occurredAt: string;
  reportedAt: string;
  userRecord: {
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
  };
  user: { id: number; branchId: number };
}

export interface IDeviceAction {
  createdAt: string;
  finishedAt: string;
  id: string;
  seen: boolean;
  startedAt: string;
  status: string;
  type: string;
  uuid: string;
  createdBy: IUser;
  device: IAlcolocks;
  events: Event[];
  summary: {
    photoFileName: any;
    testResult?: string;
    stateError?: string;
    stateErrorCode?: string;
    appErrorCode: string;
    appErrorMessage: string;
    exhaleError: string;
    exhaleErrorCode: number;
    initiator: number;
    lat: number;
    lon: number;
    qrCode: string;
    result: string;
  };
  vehicleRecord: ICar;
}

export interface IError {
  detail: string;
  instance: string;
  message: string;
  path: string;
  status: number;
  title: string;
  type: string;
}

export interface AuthError {
  field: string;
  message: string;
  objectName: string;
}
