import { useEffect, useState } from 'react';

import { AppConstants } from '@app';
import { Info } from '@entities/info';
import { TypeOfRows } from '@entities/info/lib/getTypeOfRowIconLabel';
import { AlkozamkiServiceMode } from '@features/alkozamki_service_mode';
// TODO => убрать связь со страницей
import { getItem } from '@pages/alkozamki/model/effects';
import { Loader } from '@shared/ui/loader';
import { Formatters } from '@shared/utils/formatters';

import style from './AlkozamkiInfo.module.scss';

export const AlkozamkiInfo = ({ updateData, selectedAlcolockId }) => {
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedAlcolockId) return;
    setLoading(true);
    getItem(selectedAlcolockId)
      .then((res) => {
        if (res) {
          setLoading(false);
          setItemData(res);
        }
      })
      .catch((err) => {
        console.log('AlkozamkiInfo getItem error', err.response);
        setLoading(false);
      });
  }, [selectedAlcolockId, updateData]);
  const naming = itemData?.name ?? '-';
  const serialNumber = itemData?.serialNumber ?? '-';
  const car = Formatters.carNameFormatter(itemData?.vehicleBind?.vehicle);
  const carForCopy = Formatters.carNameFormatter(itemData?.vehicleBind?.vehicle, false, false);
  const name = Formatters.nameFormatter(itemData?.createdBy);
  const date = Formatters.formatISODate(itemData?.createdAt);
  return (
    <Loader isLoading={loading} styles={{ wrapper: (base) => ({ ...base, height: '100%' }) }}>
      <div className={style.alcolockInfo}>
        <Info
          fields={[
            {
              label: 'Наименование',
              type: TypeOfRows.NAMING,
              value: {
                label: naming,
                copyble: naming === '-' ? false : true,
              },
            },
            {
              label: 'Режим работы',
              type: TypeOfRows.MODE,
              value: {
                label:
                  AppConstants.alkolockWorkModes.find((mode) => mode.value === itemData?.mode)
                    ?.label ?? '-',
              },
            },
            {
              label: 'Серийный номер',
              type: TypeOfRows.SERIAL_NUMBER,
              value: {
                label: serialNumber,
                copyble: serialNumber === '-' ? false : true,
              },
            },
            {
              label: 'Установлен на ТС',
              type: TypeOfRows.CAR,
              value: {
                copyText: carForCopy,
                label: car,
                copyble: car === '-' ? false : true,
              },
            },
            {
              label: 'Кем привязан',
              type: TypeOfRows.USER,
              value: {
                label: name,
                copyble: name === '-' ? false : true,
              },
            },
            {
              label: 'Дата установки',
              type: TypeOfRows.DATE,
              value: {
                label: date,
                copyble: date === '-' ? false : true,
              },
            },
          ]}
        />

        {itemData && !!itemData.vehicleBind && <AlkozamkiServiceMode alkolock={itemData} />}
      </div>
    </Loader>
  );
};
