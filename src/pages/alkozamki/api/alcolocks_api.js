import { request } from '@shared/api/request';

export default class AlcolocksApi {
  static getList({ page, limit, queries }) {
    const params = {
      url: `api/monitoring-devices?page=${page}&size=${limit}${queries}`,
      method: 'GET',
    };

    return request(params);
  }

  static getItem(id) {
    const params = {
      url: `api/monitoring-devices/${id}`,
      method: 'GET',
    };

    return request(params);
  }

  static createItem(data) {
    const params = {
      url: `api/monitoring-devices`,
      method: 'POST',
      data,
    };

    return request(params);
  }

  static changeItem(id, data) {
    const params = {
      url: `api/monitoring-devices/${id}`,
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
      url: `api/monitoring-devices/${id}`,
      method: 'DELETE',
    };

    return request(params);
  }

  static switchBranch(id, groupId) {
    const params = {
      url: `api/monitoring-devices/${id}/assign/${groupId}`,
      method: 'POST',
    };

    return request(params);
  }
}
