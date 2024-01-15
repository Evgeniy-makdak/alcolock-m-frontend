import MockGenerators from './utils/mock_generators';

export default class AppConstants {
  static rolesSystemList = [
    {
      value: 1,
      label: 'Администратор системы',
    },
    {
      value: 2,
      label: 'Администратор филиала',
    },
    {
      value: 3,
      label: 'Оператор',
    },
    {
      value: 4,
      label: 'Диспетчер',
    },
    {
      value: 5,
      label: 'Водитель',
    },
    {
      value: 6,
      label: 'Сервисный работник',
    },
  ];

  static permissionsList = [
    {
      value: 1,
      label: 'Чтение и Запись',
    },
    {
      value: 2,
      label: 'Чтение',
    },
    {
      value: 3,
      label: 'Недоступно',
    },
  ];

  static accessList = [
    {
      value: false,
      label: 'Разрешен',
    },
    {
      value: true,
      label: 'Запрещен',
    },
  ];

  static carColorsList = [
    {
      value: 'BLACK',
      label: 'Черный',
    },
    {
      value: 'BLUE',
      label: 'Синий',
    },
    {
      value: 'GREEN',
      label: 'Зеленый',
    },
    {
      value: 'BEIGE',
      label: 'Бежевый',
    },
    {
      value: 'RED',
      label: 'Красный',
    },
    {
      value: 'VIOLET',
      label: 'Фиолетовый',
    },
    {
      value: 'ORANGE',
      label: 'Оранжевый',
    },
    {
      value: 'YELLOW',
      label: 'Желтый',
    },
    {
      value: 'WHITE',
      label: 'Белый',
    },
    {
      value: 'BROWN',
      label: 'Коричневый',
    },
    {
      value: 'GREY',
      label: 'Серый',
    },
  ];

  static carTypesList = [
    {
      value: 'PERSONAL',
      label: 'Автомобиль',
    },
    {
      value: 'PASSENGER',
      label: 'Автобус',
    },
    {
      value: 'FREIGHT',
      label: 'Грузовое ТС',
    },
    {
      value: 'AGRICULTURAL',
      label: 'С/х техника',
    },
    {
      value: 'TAXI',
      label: 'Такси',
    },
    {
      value: 'SHARED',
      label: 'Каршеринг',
    },
    {
      value: 'OTHER',
      label: 'Прочее',
    },
  ];

  static categoryTypesList = [
    {
      value: 'A',
      label: 'A',
    },
    {
      value: 'B',
      label: 'B',
    },
    {
      value: 'C',
      label: 'C',
    },
    {
      value: 'D',
      label: 'D',
    },
    {
      value: 'E',
      label: 'E',
    },
    {
      value: 'BE',
      label: 'BE',
    },
    {
      value: 'CE',
      label: 'CE',
    },
    {
      value: 'DE',
      label: 'DE',
    },
    {
      value: 'C1E',
      label: 'C1E',
    },
    {
      value: 'D1E',
      label: 'D1E',
    },
    {
      value: 'M',
      label: 'M',
    },
    {
      value: 'A1',
      label: 'A1',
    },
    {
      value: 'B1',
      label: 'B1',
    },
    {
      value: 'C1',
      label: 'C1',
    },
    {
      value: 'D1',
      label: 'D1',
    },
  ];

  static ServiceModeTypes = {
    pending_by_driver: 'pending_by_driver',
    pending_by_system: 'pending_by_system',
    on: 'on',
    off: 'off',
    driver_accept: 'driver_accept',
  };

  static alkolockWorkModes = [
    {
      value: 'MAINTENANCE',
      label: 'Автосервис',
    },
    {
      value: 'NORMAL',
      label: 'Рабочий',
    },
    {
      value: 'EMERGENCY',
      label: 'Аварийный',
    },
  ];

  static alcolockServiceProcesses = [
    {
      value: 'SWITCHING_ON',
      label: 'Включение',
    },
    {
      value: 'SWITCHING_OFF',
      label: 'Выключение',
    },
  ];

  static alcolockServiceTypes = [
    {
      value: 'OFFLINE_SWITCH',
      label: 'Офлайн-переключение',
    },
    {
      value: 'DRIVER_WAITING',
      label: 'Ожидание водителя',
    },
    {
      value: 'OPERATOR_WAITING',
      label: 'Ожидание оператора',
    },
    {
      value: 'DRIVER_ACCEPT',
      label: 'Водитель подтвердил',
    },
    {
      value: 'DRIVER_CANCEL',
      label: 'Водитель отклонил',
    },
  ];

  static eventTypesList = [
    // {
    //   value: 'q',
    //   label: 'Включение зажигания',
    // },
    // {
    //   value: 'w',
    //   label: 'Выключение зажигания',
    // },
    // {
    //   value: 'e',
    //   label: 'Блокировка двигателя',
    // },
    // {
    //   value: 'r',
    //   label: 'Разблокировка двигателя',
    // },
    {
      value: 'SERVICE_MODE_ACTIVATE',
      label: 'Переход в сервисный режим',
    },
    {
      value: 'SERVICE_MODE_DEACTIVATE',
      label: 'Выход из сервисного режима',
    },
    // {
    //   value: 'y',
    //   label: 'Переход в аварийный режим',
    // },
    // {
    //   value: 'u',
    //   label: 'Выход из аварийного режима',
    // },
    // {
    //   value: 'i',
    //   label: 'Открытие двери',
    // },
    // {
    //   value: 'a',
    //   label: 'Закрытие двери',
    // },
    // {
    //   value: 'b',
    //   label: 'Блокировка при неразрешенном движении',
    // },
    // {
    //   value: 'c',
    //   label: 'Блокировка по истечении таймера',
    // },
    {
      value: 'SOBRIETY_TEST',
      label: 'Тестирование',
    },
    // {
    //   value: 'd',
    //   label: 'Ошибка устройства',
    // },
  ];

  static sobrietyTypesList = [
    {
      value: 1,
      label: 'Трезвый',
    },
    {
      value: 2,
      label: 'Нетрезвый',
    },
    {
      value: 3,
      label: 'Слабый выдох',
    },
    {
      value: 4,
      label: 'Фальсификация выдоха',
    },
  ];

  static usersList = MockGenerators.generateUsersList(100);
  static carList = MockGenerators.generateCars(100);
  static alkozamkiList = MockGenerators.generateAlcoLocks(
    70,
    this.carList,
    this.usersList.filter((user) => !user.roles.includes(5)),
  );
  static eventsList = MockGenerators.generateEventsList(
    this.usersList.filter((user) => user.roles.includes(5)),
    this.alkozamkiList.filter((item) => item.car),
  );
  static attachmentsList = MockGenerators.generateAttachments(
    this.usersList,
    this.alkozamkiList.filter((item) => item.car),
  );
  static rolesList = MockGenerators.getRoles(6);
  static groupsList = MockGenerators.generateGroups(10, this.usersList, this.alkozamkiList, this.carList);

  static autoServiceList = MockGenerators.generateAutoService(10, this.alkozamkiList, this.usersList);

  static cancelTxt = 'Отмена';
  static deleteTxt = 'Удалить';
  static saveTxt = 'Сохранить';
  static addTxt = 'Добавить';

  static notSelectedOption = {
    value: 0,
    label: 'Не выбрано',
  };

  static OrderTypes = {
    asc: 'asc',
    desc: 'desc',
  };
}
