import { request } from '@shared/api/request';

export class AuthenticateApi {
  static auth(data: string) {
    const params = {
      url: 'api/authenticate',
      method: 'POST',
      isAuth: false,
      data: data,
    };

    return request(params);
  }
}
