import Formatters from "../../utils/formatters";

export default class RolesMapper {
  static toApi(data) {
    const userPermissions = this._getPermissions('USER', data.user_control)
    const devicesPermissions = this._getPermissions('DEVICE', data.alkozamki_control)
    const carPermissions = this._getPermissions('VEHICLE', data.car_control)

    return {
      name: data.role,
      permissions: [
        ...userPermissions,
        ...devicesPermissions,
        ...carPermissions
      ],
    }
  }

  static fromApi(data) {
    const rolesPermissions = Formatters.normalizePermissions(data.userGroupPermissions)

    return {
      role: data.name,
      ...rolesPermissions
    }
  }

  static _getPermissions(entity, value) {
    const result = []

    if (value === 1) {
      result.push(`PERMISSION_${entity}_CREATE`)
    } else if (value === 2) {
      result.push(`PERMISSION_${entity}_READ`)
    }

    return result
  }
}