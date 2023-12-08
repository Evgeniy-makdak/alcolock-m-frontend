import {request} from "../../request";

export default class PhotosApi {
  static getItem(url) {
    const params = {
      url: `api/photos/${url}`,
      method: 'GET'
    }

    return request(params, true)
  }
}