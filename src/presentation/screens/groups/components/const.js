import {UsersSortTypes} from "../../../../internal/effector/users/effects";
import Formatters from "../../../../internal/utils/formatters";
import {AlcolocksSortTypes} from "../../../../internal/effector/alkozamki/effects";
import {CarsSortTypes} from "../../../../internal/effector/vehicles/effects";

export const USERS_TABLE_HEADERS = [
  {
    label: 'Пользователь',
    sortType: UsersSortTypes.byName,
  },
  {
    label: 'Почта',
    sortType: UsersSortTypes.byEmail,
  },
  {
    label: 'Привязанные ТС'
  }
]

export const getUsersRowsTemplate = (item) => {
  return {
    id: item.id,
    values: [
      {
        value: Formatters.nameFormatter(item),
      },
      {
        value: item.email,
      },
      {
        value: !!item.driver?.vehicleAllotments?.length
          ? (
            <span
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {item.driver.vehicleAllotments.map(vehicleAllotment => <span key={vehicleAllotment.id}>{Formatters.carNameFormatter(vehicleAllotment.vehicle)}</span>)}
            </span>
          )
          : '-'
      }
    ]
  }
}


export const ADD_USER_POPUP_TITLE = 'Добавить пользователей в группу'

export const ALCOLOCKS_TABLE_HEADERS = [
  {
    label: 'Наименование',
    sortType: AlcolocksSortTypes.byName,
  },
  {
    label: 'Серийный номер',
    sortType: AlcolocksSortTypes.bySerial,
  },
  {
    label: 'Установлен на ТС',
    sortType: AlcolocksSortTypes.byCar,
  },
]

export const getAlcolocksRowsTemplate = (item) => ({
  id: item.id,
  values: [
    {
      value: item.name ?? '-',
    },
    {
      value: item.serialNumber ?? '-',
    },
    {
      value: Formatters.carNameFormatter(item.vehicleBind?.vehicle)
    },
  ]
})

export const ADD_ALCOLOCK_POPUP_TITLE = 'Добавить алкозамки в группу'

export const CARS_TABLE_HEADERS = [
  {
    label: 'Марка',
    sortType: CarsSortTypes.byMake,
  },
  {
    label: 'Модель',
    sortType: CarsSortTypes.byModel,
  },
  {
    label: 'VIN',
    sortType: CarsSortTypes.byVin,
  },
  {
    label: 'Государственный номер',
    sortType: CarsSortTypes.byLicense,
    style: {
      maxWidth: '288px',
      width: '288px',
    },
  },
]

export const getCarsRowsTemplate = (car) => ({
  id: car.id,
  values: [
    {
      value: car.manufacturer ?? '-'
    },
    {
      value: car.model ?? '-'
    },
    {
      value: car.vin ?? '-',
    },
    {
      value: car.registrationNumber ?? '-',
      style: {
        maxWidth: '288px',
        width: '288px',
      }
    },
  ]
})


export const ADD_CAR_POPUP_TITLE = 'Добавить ТС в группу'
