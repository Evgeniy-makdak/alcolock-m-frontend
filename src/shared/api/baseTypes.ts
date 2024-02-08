export interface IUser {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  activated?: boolean;
  email?: string;
  login?: string;
  id?: number;
  lastModifiedBy?: {
    email?: string;
    firstName?: string;
    id?: 1;
    lastName?: string;
    middleName?: string;
  };
  assignment?: {
    branch?: { id?: number; name?: string };
    createdAt?: string;
    createdBy?: {
      name?: string;
      id?: number;
      email?: string;
      firstName?: string;
      middleName?: string;
      lastName?: string;
    };
  };
  driver?: {
    id: number;
    licenseClass?: string[];
    licenseCode?: string;
    licenseExpirationDate?: string;
    licenseIssueDate?: string;
    vehicleAllotments?: {
      vehicle?: ICar;
      id: number;
    }[];
  };
  disabled?: boolean;
}

export interface ICar {
  color?: string;
  id?: number;
  manufacturer?: string;
  model?: string;
  registrationNumber?: string;
  type?: string;
  vin?: string;
  year?: string;
  monitoringDevice?: {
    id?: string;
    name?: string;
    serialNumber?: string;
    serviceId?: string;
    mode?: string;
    modeUpdatedAt?: string;
  };
}

export interface IAlcolocks {
  id?: number;
  name?: string;
  serialNumber?: number;
  serviceId?: string;
  mode?: string;
  modeUpdatedAt?: string;
  vehicleBind?: {
    createdBy?: {
      id?: number;
      email?: string;
      firstName?: string;
      middleName?: string;
      lastName?: string;
    };
    createdAt?: string;
    vehicle?: {
      id?: number;
      registrationNumber?: string;
      manufacturer?: string;
      model?: string;
      type?: string;
      color?: string;
    };
  };
  activeActions?: [];
  assignment?: {
    branch?: {
      id?: number;
      name?: string;
    };
    createdAt?: string;
    createdBy?: {
      id?: number;
      email?: string;
      firstName?: string;
      middleName?: string;
      lastName?: string;
    };
  };
  createdAt?: string;
  createdBy?: {
    id?: number;
    email?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
  };
  lastModifiedAt?: string;
  lastModifiedBy?: {
    id?: number;
    email?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
  };
}
