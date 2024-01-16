import AppConstants from '@app/lib/app_constants';

export default class MockGenerators {
  static generateCars(count) {
    const cars = [];

    for (let i = 0; i < count; i++) {
      const car = {
        id: i + 1,
        ...generateCarsInfo(),
        vin: i + 1 + 'HSFJUFHHSFEDHSHE',
        color: Math.floor(Math.random() * AppConstants.carColorsList.length + 1),
        type: Math.floor(Math.random() * AppConstants.carTypesList.length + 1),
        registration: getRandomDate().toISOString(),
      };

      cars.push(car);
    }

    return cars;
  }

  static generateUsersList(count) {
    const users = [];
    const licenseData = {
      license: null,
      start_license: null,
      license_period: null,
      categories: null,
    };

    users.push({
      id: 1,
      name: 'Тестов Сергей Анатольевич',
      email: 'test@mail.ru',
      phone: generatePhoneNumber(),
      roles: generateRoles(),
      ...licenseData,
      birthday: generateBirthDate(),
      access: true,
      registration: getRandomDate().toISOString(),
      password: 'password',
    });

    for (let i = 0; i < count; i++) {
      const userLicense = { ...licenseData };

      if (Math.random() < 0.5) {
        const licensePeriod = generateLicensePeriod();
        userLicense.license = generateDriverLicenseNumber();
        userLicense.start_license = licensePeriod.start;
        userLicense.license_period = licensePeriod.end;
        userLicense.categories = generateCategories();
      }

      const user = {
        id: i + 2,
        name: getRandomUserName(),
        phone: Math.random() < 0.5 ? generatePhoneNumber() : null,
        email: `test${i}@mail.ru`,
        birthday: Math.random() < 0.6 ? generateBirthDate() : null,
        roles: generateRoles(),
        ...userLicense,
        access: Math.random() < 0.5,
        registration: getRandomDate().toISOString(),
        password: 'password',
      };

      users.push(user);
    }

    return users;
  }

  static generateAlcoLocks(count, carsList, userList) {
    const items = [];
    const shuffledCarsList = [...carsList].sort(() => Math.random() - 0.5);

    for (let i = 0; i < count; i++) {
      const service_status = getRandomServiceMode();
      const item = {
        id: i + 1,
        name: `Алкозамок${i + 1}`,
        serial: generateAlkolockSerial(),
        service_status,
        work_mode: [
          AppConstants.ServiceModeTypes.on,
          AppConstants.ServiceModeTypes.driver_accept,
        ].includes(service_status)
          ? 1
          : randomWorkMode(),
        car: Math.random() < 0.7 ? shuffledCarsList[i] ?? null : null,
        user: getRandomArrayItem(userList),
        setup: getRandomDate().toISOString(),
      };

      items.push(item);
    }

    return items;
  }

  static generateEventsList(driversList, alcoLocksWithCar) {
    const items = [];

    for (let i = 0; i < alcoLocksWithCar.length; i++) {
      items.push({
        id: i + 1,
        user: getRandomArrayItem(driversList),
        date: getRandomDate().toISOString(),
        alcolock: alcoLocksWithCar[i],
        event: generateRandomEventData(),
      });
    }

    return items;
  }

  static generateAttachments(userList, alcoLocksWithCar) {
    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const items = [];

    for (let i = 0; i < alcoLocksWithCar.length; i++) {
      const item = {
        id: i + 1,
        alcolock: alcoLocksWithCar[i],
        driver: getRandomItem(userList.filter((user) => user.roles.includes(5))),
        user: getRandomItem(userList.filter((user) => !user.roles.includes(5))),
        date: getRandomDate().toISOString(),
      };

      items.push(item);
    }

    return items;
  }

  static getRoles() {
    const items = [];

    for (let i = 0; i < AppConstants.rolesSystemList.length; i++) {
      const item = {
        id: AppConstants.rolesSystemList[i].value,
        role: AppConstants.rolesSystemList[i].label,
        user_control: Math.floor(Math.random() * 3) + 1,
        car_control: Math.floor(Math.random() * 3) + 1,
        alkozamki_control: Math.floor(Math.random() * 3) + 1,
        attachments_control: Math.floor(Math.random() * 3) + 1,
        groups_control: Math.floor(Math.random() * 3) + 1,
      };

      items.push(item);
    }

    return items;
  }

  static generateGroups(count, usersList, alcolocksList, carsList) {
    const result = [];
    const remainingUsers = [...usersList];
    const remainingAlcolocks = [...alcolocksList];
    const remainingCars = [...carsList];

    for (let i = 0; i < count; i++) {
      const usersSubset = randomSubset(remainingUsers, 4);
      const alcolocksSubset = randomSubset(remainingAlcolocks, 4);
      const carsSubset = randomSubset(remainingCars, 4);

      result.push({
        id: i + 1,
        name: `Филиал${i + 1}`,
        user: getRandomArrayItem(usersList),
        users: usersSubset.map((user) => ({
          ...user,
          cars: [getRandomArrayItem(carsList), getRandomArrayItem(carsList)],
        })),
        alcolocks: alcolocksSubset,
        cars: carsSubset,
        date: getRandomDate().toISOString(),
      });

      usersSubset.forEach((user) => {
        const index = remainingUsers.indexOf((remainUser) => remainUser.id === user.id);
        if (index > -1) remainingUsers.splice(index, 1);
      });

      alcolocksSubset.forEach((alcolock) => {
        const index = remainingAlcolocks.indexOf(
          (remainAlcolock) => remainAlcolock.id === alcolock.id,
        );
        if (index > -1) remainingAlcolocks.splice(index, 1);
      });

      carsSubset.forEach((car) => {
        const index = remainingCars.indexOf((remainCar) => remainCar.id === car.id);
        if (index > -1) remainingCars.splice(index, 1);
      });
    }
    return result;
  }

  static generateAutoService = (count, alcolocksList, userList) => {
    const result = [];

    for (let i = 0; i < count; i++) {
      const state = getRandomArrayItem(AppConstants.alcolockServiceTypes).value;
      let time = null;

      if (state === 'DRIVER_WAITING' || state === 'OPERATOR_WAITING') {
        time = getIsoDateWithOffset(i + 1);
      }
      result.push({
        id: i + 1,
        alcolock: alcolocksList.filter((item) => item.car)[i],
        driver: getRandomArrayItem(userList.filter((user) => user.roles.includes(5))),
        state,
        process: getRandomArrayItem(AppConstants.alcolockServiceProcesses).value,
        createdAt: getRandomDate().toISOString(),
        time,
      });
    }

    return result;
  };
}

function getIsoDateWithOffset(minutesOffset) {
  const now = new Date();
  now.setMinutes(now.getMinutes() + minutesOffset);
  return now.toISOString();
}

function getRandomServiceMode() {
  const random = Math.random() * 100;

  if (random < 3) {
    return AppConstants.ServiceModeTypes.pending_by_driver;
  } else if (random < 6) {
    return AppConstants.ServiceModeTypes.pending_by_system;
  } else if (random < 30) {
    return AppConstants.ServiceModeTypes.on;
  } else if (random < 97) {
    return AppConstants.ServiceModeTypes.off;
  } else {
    return AppConstants.ServiceModeTypes.driver_accept;
  }
}

function randomWorkMode() {
  return Math.random() < 0.1 ? 3 : 2;
}

function generateRandomEventData() {
  const eventType = getRandomArrayItem(AppConstants.eventTypesList).value;
  let alcohol_value = null;
  let sobriety = null;
  let error = null;
  let error_code = null;

  if (eventType === 13) {
    sobriety = Math.random() > 0.05 ? (Math.random() > 0.7 ? 1 : 2) : Math.random() > 0.5 ? 3 : 4;

    if (sobriety === 1 || sobriety === 2) {
      alcohol_value =
        sobriety === 1
          ? +(Math.random() * 20).toFixed(0)
          : +(Math.random() * (120 - 20) + 20).toFixed(0);
    }
  }

  if (eventType === 14) {
    error_code = 'E-20';
    error = 'Общая критичекая ошибка';
  }

  return {
    type: eventType,
    coordinates: generateRandomCoordinatesForRussia(),
    alcohol_value,
    sobriety,
    error,
    error_code,
  };
}

function getRandomDate() {
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  const endDate = new Date();
  const randomDate = new Date(
    startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()),
  );

  return randomDate;
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function generateLicensePeriod() {
  function getRandomDateInInterval(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  const currentDate = new Date();
  const tenYearsAgo = new Date(currentDate);
  tenYearsAgo.setFullYear(currentDate.getFullYear() - 10);

  const startDate = getRandomDateInInterval(tenYearsAgo, currentDate);
  const endDate = new Date(startDate);
  endDate.setFullYear(startDate.getFullYear() + 10);

  return {
    start: formatDate(startDate),
    end: formatDate(endDate),
  };
}

function generateCategories() {
  const shuffled = AppConstants.categoryTypesList.slice().sort(() => 0.5 - Math.random());
  const subarrayLength = Math.floor(Math.random() * (shuffled.length - 1)) + 1;
  return shuffled.slice(0, subarrayLength).map((item) => item.value);
}

function getRandomArrayItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomUserName() {
  const firstNames = ['Иван', 'Василий', 'Петр', 'Алекснадр', 'Никита'];
  const lastNames = ['Соколов', 'Смирнов', 'Иванов', 'Петров', 'Сидоров'];
  const middleNames = ['Иванович', 'Владимирович', 'Никитович', 'Викторович', 'Сергеевич'];

  return `${getRandomArrayItem(lastNames)} ${getRandomArrayItem(firstNames)} ${getRandomArrayItem(middleNames)}`;
}

function generateDriverLicenseNumber() {
  let number = '';
  for (let i = 0; i < 10; i++) {
    number += Math.floor(Math.random() * 10).toString();
  }
  return number;
}

function generateRoles() {
  const maxValue = AppConstants.rolesSystemList.length;
  const arrayLength = Math.floor(Math.random() * 4) + 1;

  const roles = [];
  while (roles.length < arrayLength) {
    const randomNumber = Math.floor(Math.random() * maxValue) + 1;

    if (!roles.includes(randomNumber)) {
      roles.push(randomNumber);
    }
  }

  return roles;
}

function randomSubset(arr, maxSize) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(shuffled.length, Math.floor(Math.random() * (maxSize + 1))));
}

function generateCarsInfo() {
  const makesAndModels = {
    Toyota: ['Camry', 'Corolla', 'Highlander'],
    Honda: ['Civic', 'Accord', 'Pilot'],
    BMW: ['X5', 'X3', '320i'],
    Audi: ['A3', 'A4', 'Q7'],
    'Mercedes-Benz': ['E-Class', 'A-Class', 'GLC'],
  };

  const getRandomMake = () => {
    const makes = Object.keys(makesAndModels);
    return makes[Math.floor(Math.random() * makes.length)];
  };
  const getRandomModel = (make) => {
    const models = makesAndModels[make];
    return models[Math.floor(Math.random() * models.length)];
  };
  const getRandomLicense = () => {
    const letters = 'АВЕКМНОРСТXУ';
    return (
      letters[Math.floor(Math.random() * letters.length)] +
      (Math.floor(Math.random() * 9) + 1) +
      (Math.floor(Math.random() * 9) + 1) +
      (Math.floor(Math.random() * 9) + 1) +
      letters[Math.floor(Math.random() * letters.length)] +
      letters[Math.floor(Math.random() * letters.length)] +
      ' ' +
      (Math.floor(Math.random() * 9) + 1) +
      (Math.floor(Math.random() * 9) + 1) +
      (Math.floor(Math.random() * 9) + 1)
    );
  };
  const getRandomYear = () => {
    return Math.floor(Math.random() * (2022 - 1990 + 1)) + 1990;
  };

  const make = getRandomMake();
  return {
    make: getRandomMake(),
    model: getRandomModel(make),
    license: getRandomLicense(),
    manufacture: getRandomYear(),
  };
}

function generatePhoneNumber() {
  let number = '+7';
  for (let i = 0; i < 10; i++) {
    number += Math.floor(Math.random() * 10).toString();
  }
  return number;
}

function generateBirthDate() {
  const currentYear = new Date().getFullYear();
  const birthYear = Math.floor(
    Math.random() * (currentYear - 20 - (currentYear - 70) + 1) + (currentYear - 70),
  );

  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const maxDaysInMonth = new Date(birthYear, +month, 0).getDate();
  const day = String(Math.floor(Math.random() * maxDaysInMonth) + 1).padStart(2, '0');

  return `${day}-${month}-${birthYear}`;
}

function generateAlkolockSerial() {
  const base = 'alcosmart';
  const randomDigits = Math.floor(1000 + Math.random() * 9000); // Генерация случайного четырехзначного числа
  return base + randomDigits;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function generateRandomCoordinatesForRussia() {
  const latitude = getRandomArbitrary(41, 82).toFixed(6);
  const longitude = getRandomArbitrary(19, 169).toFixed(6);

  return { latitude, longitude };
}
