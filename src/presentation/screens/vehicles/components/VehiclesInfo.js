import { useEffect, useState } from 'react';

import AppConstants from '../../../../internal/app_constants';
import { getCar } from '../../../../internal/effector/vehicles/effects';
import Formatters from '../../../../internal/utils/formatters';
import Info from '../../../shared/components/info/Info';
import Loader from '../../../shared/components/loader/Loader';

const VehiclesInfo = ({ selectedCarId, updateData }) => {
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

  return (
    <Loader isLoading={loading}>
      <Info
        fields={[
          {
            label: 'Марка:',
            value: carData?.manufacturer ?? '-',
          },
          {
            label: 'Модель:',
            value: carData?.model ?? '-',
          },
          {
            label: 'VIN:',
            value: carData?.vin ?? '-',
          },
          {
            label: 'Государственный номер:',
            value: carData?.registrationNumber ?? '-',
          },
          {
            label: 'Год выпуска:',
            value: carData?.year ?? '-',
          },
          {
            label: 'Цвет:',
            value: AppConstants.carColorsList.find((color) => color.value === carData?.color)?.label ?? '-',
          },
          {
            label: 'Тип:',
            value: AppConstants.carTypesList.find((type) => type.value === carData?.type)?.label ?? '-',
          },
          {
            label: 'Дата регистрации:',
            value: Formatters.formatISODate(carData?.createdAt),
          },
        ]}
      />
    </Loader>
  );
};

export default VehiclesInfo;
