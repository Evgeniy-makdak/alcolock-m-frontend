import { request } from '@shared/api/request';

// TODO => понять зачем это api было написано
export default class DriversApi {
  static getList({ page, limit, queries }) {
    const params = {
      url: `api/drivers?page=${page}&size=${limit}${queries}`,
      method: 'GET',
    };

    return request(params);
  }
}
