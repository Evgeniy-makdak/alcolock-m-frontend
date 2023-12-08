export default class UsersMapper{
  static getUserToApi(data, isChange = false) {
    const nameParts = data.name.split(' ')
    const driverData = data.licenseCode
      ? {
        driver: {
          licenseCode: data.licenseCode,
          licenseIssueDate: data.licenseIssueDate,
          licenseExpirationDate: data.licenseExpirationDate,
          licenseClass: data.licenseClass ?? []
        }
      } : {}
    const passwordData = isChange
      ? data.password?.length
        ? {password: data.password}
        : {}
      : {password: data.password}

    return {
      lastName: nameParts[0],
      firstName: nameParts[1],
      middleName: nameParts[2],
      email: data.email,
      birthDate: data.birthDate,
      phone: data.phone?.length
        ? data.phone
        : null,
      disabled: data.disabled,
      userGroups: data.userGroups,
      ...passwordData,
      ...driverData,
      branchId: data.userGroups.includes(100)
        ? 10
        : data.branchId,
    }
  }
}