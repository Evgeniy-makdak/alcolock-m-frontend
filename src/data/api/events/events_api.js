import {request} from "../../request";
import {cancelActivateService} from "../../../internal/effector/events/effects";

export default class EventsApi {
  static getList(
    {
      page,
      limit,
      queries
    }) {
    const params = {
      url: `api/device-actions?page=${page}&size=${limit}${queries}`,
      method: 'GET'
    }

    return request(params)
  }

  static getItem(id) {
    const params = {
      url: `api/device-actions/${id}`,
      method: 'GET'
    }

    return request(params)
  }

  static activateServiceMode(deviceId, data) {
    const params = {
      url: `api/device-actions`,
      method: 'POST',
      data: {
        duration: data.duration * 3600,
        deviceId,
        type: 'SERVICE_MODE_ACTIVATE'
      }
    }

    return request(params)
  }

  static cancelActivateServiceMode(id) {
    const params = {
      url: `api/device-actions/${id}/cancel`,
      method: 'POST',
    }

    return request(params)
  }
}
