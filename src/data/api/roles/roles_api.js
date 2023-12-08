import {request} from "../../request";

export default class RolesApi {
  static getList(
    {
      page,
      limit,
      queries
    }) {
    const params = {
      url: `api/user-groups?page=${page}&size=${limit}${queries}`,
      method: 'GET'
    }

    return request(params)
  }

  static createItem(data) {
    const params = {
      url: `api/user-groups`,
      method: 'POST',
      data
    }

    return request(params)
  }

  static getItem(id) {
    const params = {
      url: `api/user-groups/${id}`,
      method: 'GET',
    }

    return request(params)
  }

  static changeItem(id, data) {
    const params = {
      url: `api/user-groups/${id}`,
      method: 'PUT',
      data: {
        id,
        ...data,
      }
    }

    return request(params)
  }

  static deleteItem(id) {
    const params = {
      url: `api/user-groups/${id}`,
      method: 'DELETE',
    }

    return request(params)
  }
}
