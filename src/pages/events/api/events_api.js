import { request } from '@shared/api/request';

// TODO => используется несколькими слоями => разделить или сделать общий интерфейс
export default class EventsApi {
  static getList({ page, limit, queries }) {
    const params = {
      url: `api/device-actions?page=${page}&size=${limit}${queries}`,
      method: 'GET',
    };

    return request(params);
  }

  static getItem(id) {
    const params = {
      url: `api/device-actions/${id}`,
      method: 'GET',
    };

    return request(params);
  }

  static activateServiceMode(data) {
    const params = {
      url: `api/device-actions`,
      method: 'POST',
      data,
    };

    return request(params);
  }

  static cancelActivateServiceMode(id) {
    const params = {
      url: `api/device-actions/${id}/cancel`,
      method: 'POST',
    };

    return request(params);
  }

  static rejectActivateServiceMode(id) {
    const params = {
      url: `api/device-actions/${id}/reject`,
      method: 'POST',
    };

    return request(params);
  }

  static acceptActivateServiceMode(id) {
    const params = {
      url: `api/device-actions/${id}/accept`,
      method: 'POST',
    };

    return request(params);
  }

  static seenAction(id) {
    const params = {
      url: `api/device-actions/${id}/seen`,
      method: 'POST',
    };

    return request(params);
  }
}
