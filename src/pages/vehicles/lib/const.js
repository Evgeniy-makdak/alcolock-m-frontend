import { Formatters } from '@shared/utils/formatters';

import { CarsSortTypes } from '../model/effects';

export const HEADERS = [
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
    style: {
      maxWidth: '288px',
      width: '288px',
    },
    sortType: CarsSortTypes.byLicense,
  },
  {
    label: 'Год выпуска',
    style: {
      maxWidth: '201px',
      width: '201px',
    },
    sortType: CarsSortTypes.byManufacture,
  },
  {
    label: 'Дата регистрации',
    style: {
      maxWidth: '201px',
      width: '201px',
    },
    sortType: CarsSortTypes.byDate,
  },
];

export const getRowsTemplate = (car) => ({
  id: car.id,
  values: [
    {
      value: car.manufacturer ?? '-',
    },
    {
      value: car.model ?? '-',
    },
    {
      value: car.vin,
    },
    {
      value: car.registrationNumber,
      style: {
        maxWidth: '288px',
        width: '288px',
      },
    },
    {
      value: car.year,
      style: {
        maxWidth: '201px',
        width: '201px',
      },
    },
    {
      value: Formatters.formatISODate(car.createdAt),
      style: {
        maxWidth: '201px',
        width: '201px',
      },
    },
  ],
});

export const DELETE_POPUP_TITLE = 'Удаление ТС';
export const getDeletePopupBody = (selectedItem) => {
  return (
    <p>
      Вы действительно хотите удалить транспортное средство{' '}
      <b>
        {selectedItem?.manufacturer} {selectedItem?.model}, {selectedItem?.year},{' '}
        {selectedItem?.registrationNumber}
      </b>
      ?
    </p>
  );
};

export const ADD_POPUP_TITLE = 'Добавление ТС';
export const EDIT_POPUP_TITLE = 'Редактирование ТС';
