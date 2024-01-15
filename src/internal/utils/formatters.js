export default class Formatters {
  static formatISODate(isoDate) {
    if (!isoDate) return '-';
    const date = new Date(isoDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  }

  static convertDateFormat(dateStr) {
    if (!dateStr) return '-';
    const dateParts = dateStr.split('-');

    return dateParts.reverse().join('.');
  }

  static nameFormatter(user, withPlaceholder = true) {
    const placeholder = withPlaceholder ? '-' : '';
    if (!user) return placeholder;
    const name = user.firstName ? `${user.firstName} ` : '';
    const middleName = user.middleName ?? '';
    const lastName = user.lastName ? `${user.lastName} ` : '';

    if (!name.length && !middleName.length && !lastName.length) return placeholder;

    return lastName + name + middleName;
  }

  static carNameFormatter(car, withoutRegistrationNumber = false) {
    if (!car) return '-';

    if (withoutRegistrationNumber) {
      return `${car.manufacturer} ${car.model}`;
    } else {
      return `${car.manufacturer} ${car.model} ${car.registrationNumber}`;
    }
  }

  static normalizePermissions(userGroupPermissions) {
    const rolePermissions = {
      user_control: 3,
      car_control: 3,
      alkozamki_control: 3,
      attachments_control: 3,
    };

    if ((userGroupPermissions ?? []).length) {
      userGroupPermissions.forEach((permission) => {
        const permissionNameParts = permission.permission.name.split('_');
        const permissionArea = permissionNameParts[1];
        const availableMethod = permissionNameParts[permissionNameParts.length - 1];

        switch (availableMethod) {
          case 'CREATE':
            if (permissionArea === 'DEVICE') {
              rolePermissions.alkozamki_control = 1;
            } else if (permissionArea === 'VEHICLE') {
              rolePermissions.car_control = 1;
            } else if (permissionArea === 'USER') {
              rolePermissions.user_control = 1;
            }
            break;
          case 'READ':
            if (permissionArea === 'DEVICE') {
              rolePermissions.alkozamki_control = 2;
            } else if (permissionArea === 'VEHICLE') {
              rolePermissions.car_control = 2;
            } else if (permissionArea === 'USER') {
              rolePermissions.user_control = 2;
            }
            break;
        }
      });

      if (rolePermissions.user_control === 1 && rolePermissions.car_control === 1) {
        rolePermissions.attachments_control = 1;
      } else if (rolePermissions.user_control !== 3 && rolePermissions.car_control !== 3) {
        rolePermissions.attachments_control = 2;
      }

      return rolePermissions;
    } else {
      return rolePermissions;
    }
  }

  static parseISO8601Duration(isoDuration) {
    if (!isoDuration) return null;
    const regex = /P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = isoDuration.match(regex);

    return {
      hours: parseInt(matches[4])
        ? parseInt(matches[4]).toString().length === 1
          ? `0${parseInt(matches[4])}`
          : parseInt(matches[4])
        : '00',
      minutes: parseInt(matches[5])
        ? parseInt(matches[5]).toString().length === 1
          ? `0${parseInt(matches[5])}`
          : parseInt(matches[5])
        : '00',
      seconds: parseInt(matches[6])
        ? parseInt(matches[6]).toString().length === 1
          ? `0${parseInt(matches[6])}`
          : parseInt(matches[6])
        : '00',
    };
  }
}
