import { request } from '@shared/api/request';

export default class AuthenticateApi {
  static auth(data) {
    const params = {
      url: 'api/authenticate',
      method: 'POST',
      isAuth: false,
      data: data,
    };

    return request(params);
  }
}
