export default class AlcolocksMapper {
  static getAlcolockToApi(data) {
    return {
      ...data,
      vehicleId: data.vehicle?.id ?? null,
    };
  }

  static getAlcolockFromApi(data) {
    return {
      ...(data ?? {}),
      vehicle: data?.vehicleBind?.vehicle ?? null,
    };
  }
}
