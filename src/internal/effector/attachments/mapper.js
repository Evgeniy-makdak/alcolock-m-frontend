export default class AttachmentsMapper {
  static getAttachmentToApi(data) {
    return {
      driverId: data.driver.driver.id,
      vehicleId: data.vehicle.id
    }
  }

  static getAttachmentFromApi(data) {
    return {
      ...data,
      vehicle: data.vehicle ?? null,
      driver: data?.driver?.userAccount
        ? {
          ...data.driver.userAccount,
          driver: {
            id: data.driver.id
          }
        }
        : null
    }
  }
}