import { request } from '@shared/api/request';

export default class PhotosApi {
  static getItem(url) {
    const params = {
      url: `api/photos/${url}`,
      method: 'GET',
    };

    return request(params, true);
  }
}
