import {request} from "../../request";

export default class UsersApi {
  static getList(
    {
     page,
     limit,
     queries
   }) {
    const params = {
      url: `api/users?page=${page}&size=${limit}${queries}`,
      method: 'GET'
    }

    return request(params)
  }

  static getItem(id) {
    const params = {
      url: `api/users/${id}`,
      method: 'GET'
    }

    return request(params)
  }

  static createItem(data) {
    const params = {
      url: `api/users`,
      method: 'POST',
      data
    }

    return request(params)
  }

  static changeItem(id, data) {
    const params = {
      url: `api/users/${id}`,
      method: 'PUT',
      data
    }

    return request(params)
  }

  static deleteItem(id) {
    const params = {
      url: `api/users/${id}`,
      method: 'DELETE',
    }

    return request(params)
  }

  static switchBranch(userId, groupId) {
    const params = {
      url: `api/users/${userId}/assign/${groupId}`,
      method: 'POST',
    }

    return request(params)
  }
}
