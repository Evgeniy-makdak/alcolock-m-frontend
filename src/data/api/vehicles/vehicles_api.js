import { request } from '../../request';

export default class VehiclesApi {
  static getList({ page, limit, queries }) {
    const params = {
      url: `api/vehicles?page=${page}&size=${limit}${queries}`,
      method: 'GET',
    };

    return request(params);
  }

  static getItem(id) {
    const params = {
      url: `api/vehicles/${id}`,
      method: 'GET',
    };

    return request(params);
  }

  static createItem(data) {
    const params = {
      url: `api/vehicles`,
      method: 'POST',
      data,
    };

    return request(params);
  }

  static changeItem(id, data) {
    const params = {
      url: `api/vehicles/${id}`,
      method: 'PUT',
      data: {
        id,
        ...data,
      },
    };

    return request(params);
  }

  static deleteItem(id) {
    const params = {
      url: `api/vehicles/${id}`,
      method: 'DELETE',
    };

    return request(params);
  }

  static switchBranch(id, groupId) {
    const params = {
      url: `api/vehicles/${id}/assign/${groupId}`,
      method: 'POST',
    };

    return request(params);
  }

  static getManufacturersList({ page, limit, queries }) {
    const params = {
      url: `api/vehicles/manufacturers?page=${page}&size=${limit}${queries}`,
      method: 'GET',
    };

    return request(params);
  }
}
