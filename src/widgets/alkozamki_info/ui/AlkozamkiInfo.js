import { useEffect, useState } from 'react';

import { AppConstants } from '@app';
import { Info } from '@entities/info';
import { AlkozamkiServiceMode } from '@features/alkozamki_service_mode';
// TODO => убрать связь со страницей
import { getItem } from '@pages/alkozamki/model/effects';
import { Loader } from '@shared/ui/loader';
import { Formatters } from '@shared/utils/formatters';

import style from './AlkozamkiInfo.module.scss';

export const AlkozamkiInfo = ({
  updateData,
  selectedAlcolockId,
  toggleUpdateInfo,
  toggleUpdateTable,
}) => {
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

  return (
    <Loader isLoading={loading} styles={{ wrapper: (base) => ({ ...base, height: '100%' }) }}>
      <div className={style.alcolockInfo}>
        <Info
          fields={[
            {
              label: 'Наименование:',
              value: itemData?.name ?? '-',
            },
            {
              label: 'Режим работы:',
              value:
                AppConstants.alkolockWorkModes.find((mode) => mode.value === itemData?.mode)
                  ?.label ?? '-',
            },
            {
              label: 'Серийный номер:',
              value: itemData?.serialNumber ?? '-',
            },
            {
              label: 'Установлен на ТС:',
              value: itemData?.vehicleBind?.vehicle
                ? `${itemData.vehicleBind.vehicle.manufacturer} ${itemData.vehicleBind.vehicle.model} ${itemData.vehicleBind.vehicle.registrationNumber}`
                : '-',
            },
            {
              label: 'Кем привязан:',
              value: Formatters.nameFormatter(itemData?.createdBy),
            },
            {
              label: 'Дата установки:',
              value: Formatters.formatISODate(itemData?.createdAt),
            },
          ]}
        />

        {itemData && !!itemData.vehicleBind && (
          <AlkozamkiServiceMode
            data={itemData}
            toggleUpdateInfo={toggleUpdateInfo}
            toggleUpdateTable={toggleUpdateTable}
          />
        )}
      </div>
    </Loader>
  );
};
