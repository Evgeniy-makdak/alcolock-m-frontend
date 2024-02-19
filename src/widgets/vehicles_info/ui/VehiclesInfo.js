import { useEffect, useState } from 'react';

// TODO => убрать связь с app
import { AppConstants } from '@app';
import { Info } from '@entities/info';
// TODO => убрать связь со страницей
import { TypeOfRows } from '@entities/info/lib/getTypeOfRowIconLabel';
import { getCar } from '@pages/vehicles/model/effects';
import { Loader } from '@shared/ui/loader';
import { Formatters } from '@shared/utils/formatters';

export const VehiclesInfo = ({ selectedCarId, updateData }) => {
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedCarId) return;
    setLoading(true);
    getCar(selectedCarId)
      .then((res) => {
        if (res) {
          setLoading(false);
          setCarData(res);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log('getCar err', err?.response);
      });
  }, [selectedCarId, updateData]);

  const vin = carData?.vin ?? '-';
  const gosNumber = carData?.registrationNumber ?? '-';
  const dateRegistry = Formatters.formatISODate(carData?.createdAt);
  return (
    <Loader isLoading={loading}>
      <Info
        fields={[
          {
            label: 'Марка',
            type: TypeOfRows.MARK,
            value: { label: carData?.manufacturer ?? '-' },
          },
          {
            label: 'Модель',
            type: TypeOfRows.CAR,
            value: { label: carData?.model ?? '-' },
          },
          {
            label: 'VIN',
            type: TypeOfRows.SERIAL_NUMBER,
            value: { label: carData?.vin ?? '-', copyble: vin === '-' ? false : true },
          },
          {
            label: 'Государственный номер',
            type: TypeOfRows.GOS_NUMBER,
            value: { label: gosNumber, copyble: gosNumber === '-' ? false : true },
          },
          {
            label: 'Год выпуска',
            type: TypeOfRows.DATE,
            value: { label: carData?.year ?? '-' },
          },
          {
            label: 'Цвет',
            type: TypeOfRows.COLOR,
            value: {
              label:
                AppConstants.carColorsList.find((color) => color.value === carData?.color)?.label ??
                '-',
            },
          },
          {
            label: 'Тип',
            type: TypeOfRows.CATEGORY,
            value: {
              label:
                AppConstants.carTypesList.find((type) => type.value === carData?.type)?.label ??
                '-',
            },
          },
          {
            label: 'Дата регистрации',
            type: TypeOfRows.DATE,
            value: {
              label: Formatters.formatISODate(carData?.createdAt),
              copyble: dateRegistry === '-' ? false : true,
            },
          },
        ]}
      />
    </Loader>
  );
};
