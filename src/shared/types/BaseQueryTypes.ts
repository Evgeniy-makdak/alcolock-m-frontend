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

interface IActiveActions {
  id: number;
  uuid: string;
  type: string;
  status: string;
  startedAt: string;
  finishedAt: string;
  vehicleRecord: {
    registrationNumber: string;
    manufacturer: string;
    model: string;
    year: number;
    vin: string;
  };
  vehicle: {
    id: number;
    branchId: number;
  };
  seen: boolean;
  events: Event[];
  createdAt: string;
  createdBy: IUser;
}

export interface IAlcolocks {
  id: number;
  name: string;
  serialNumber: number;
  serviceId: string;
  mode: string;
  modeUpdatedAt: string;
  lastModifiedAt: string;
  activeActions: IActiveActions[];
  createdAt: string;
  vehicleBind: {
    createdBy: IUser;
    createdAt: string;
    vehicle: ICar;
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

  createdBy: IUser;

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
    duration: string;
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

export interface ISummary {
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
  summary: ISummary;
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

export interface Branch {
  id: number;
  name: string;
}

interface Assignment {
  branch: Branch;
  createdAt: string;
  createdBy: IUser;
}

interface GroupMembership {
  id: 11;
  group: { id: number; name: string; systemGenerated: boolean };
}

export type ID = string | number | null | undefined;

export interface IAccount {
  activated: boolean;
  assignment: Assignment;
  disabled: boolean;
  email: string;
  firstName: string;
  groupMembership: GroupMembership[];
  id: number;
  lastName: string;
  login: string;
  middleName: string;
  permissions: string[];
}
