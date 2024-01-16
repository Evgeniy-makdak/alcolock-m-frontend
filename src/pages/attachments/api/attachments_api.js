import { request } from '@shared/api/request';

export default class AttachmentsApi {
  static getList({ page, limit, queries }) {
    const params = {
      url: `api/vehicle-driver-allotments?page=${page}&size=${limit}${queries}`,
      method: 'GET',
    };

    return request(params);
  }

  static createItem(data) {
    const params = {
      url: `api/vehicle-driver-allotments`,
      method: 'POST',
      data,
    };

    return request(params);
  }

  static getItem(id) {
    const params = {
      url: `api/vehicle-driver-allotments/${id}`,
      method: 'GET',
    };

    return request(params);
  }

  static changeItem(id, data) {
    const params = {
      url: `api/vehicle-driver-allotments/${id}`,
      method: 'PUT',
      data,
    };

    return request(params);
  }

  static deleteItem(id) {
    const params = {
      url: `api/vehicle-driver-allotments/${id}`,
      method: 'DELETE',
    };

    return request(params);
  }
}
