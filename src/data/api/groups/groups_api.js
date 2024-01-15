import { request } from '../../request';

export default class GroupsApi {
  static getList({ page, limit, queries }) {
    const params = {
      url: `api/branch-offices?page=${page}&size=${limit}${queries}`,
      method: 'GET',
    };

    return request(params);
  }

  static getItem(id) {
    const params = {
      url: `api/branch-offices/${id}`,
      method: 'GET',
    };

    return request(params);
  }

  static createItem(data) {
    const params = {
      url: `api/branch-offices`,
      method: 'POST',
      data: {
        name: data.name,
        branchId: 20,
      },
    };

    return request(params);
  }

  static changeItem(id, data) {
    const params = {
      url: `api/branch-offices/${id}`,
      method: 'PUT',
      data: {
        id,
        name: data.name,
      },
    };

    return request(params);
  }

  static deleteItem(id) {
    const params = {
      url: `api/branch-offices/${id}`,
      method: 'DELETE',
    };

    return request(params);
  }

  static moveItems(id, data) {
    const params = {
      url: `api/branch-offices/${id}/move`,
      method: 'POST',
      data: {
        entities: data,
      },
    };

    return request(params);
  }
}
