import {request} from "../../request";

export default class UserApi {
  static getInfo(token) {
    const params = {
      token,
      url: 'api/account',
      method: 'GET',
    }

    return request(params)
  }

  static changePassword(data) {
    const params = {
      url: 'api/account/change-password',
      method: 'POST',
      data
    }

    return request(params)
  }
}
