import { request } from '@shared/api/request';
import { HttpMethods } from '@shared/const/httpMethods';

export default class PhotosApi {
  static getItem(url: string) {
    const params = {
      url: `api/photos/${url}`,
      method: HttpMethods.GET,
    };

    return request(params);
  }
}
