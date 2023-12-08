import {request} from "../../request";

export default class DriversApi {
  static getList(
    {
      page,
      limit,
      queries
    }) {
    const params = {
      url: `api/drivers?page=${page}&size=${limit}${queries}`,
      method: 'GET'
    }

    return request(params)
  }
}