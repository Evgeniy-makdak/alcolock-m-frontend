import { useEffect, useState } from 'react';

import { AppConstants } from '@app';
import { Info } from '@entities/info';
import { TypeOfRows } from '@entities/info/lib/getTypeOfRowIconLabel';
import { AlkozamkiServiceMode } from '@features/alkozamki_service_mode';
// TODO => убрать связь со страницей
import { autoServiceStore } from '@pages/auto_service/model/store';
import { getEvent } from '@pages/events/model/effects';
import { Loader } from '@shared/ui/loader';
import { Formatters } from '@shared/utils/formatters';

import style from './AutoServiceInfo.module.scss';

export const AutoServiceInfo = ({
  selectedId,
  toggleUpdateInfo,
  toggleUpdateTable,
  updateData,
}) => {
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(false);
  const setSelectedDeviceId = autoServiceStore.selectedDeviceId.useSetValue();

  useEffect(() => {
    if (!selectedId) {
      setSelectedDeviceId(null);
      return;
    }
    setLoading(true);
    getEvent(selectedId)
      .then((res) => {
        if (res) {
          setItemData(res);
          setLoading(false);
          setSelectedDeviceId(res.device?.id ?? null);
        }
      })
      .catch((err) => {
        console.log('AutoServiceInfo getEvent error', err?.response);
        setLoading(false);
      });
  }, [selectedId, updateData]);
  const naming = itemData?.device?.name ?? '-';
  const serialNumber = itemData?.device?.serialNumber ?? '-';
  const car = Formatters.carNameFormatter(itemData?.device?.vehicleBind?.vehicle);
  const carForCopy = Formatters.carNameFormatter(
    itemData?.device?.vehicleBind?.vehicle,
    false,
    false,
  );
  const name = Formatters.nameFormatter(itemData?.device?.createdBy);
  const date = Formatters.formatISODate(itemData?.device?.createdAt);

  return (
    <Loader isLoading={loading} styles={{ wrapper: (base) => ({ ...base, height: '100%' }) }}>
      <div className={style.alcolockInfo}>
        <Info
          // TODO => вынести массив с заголовками для таблиц из верстки в константы
          fields={[
            {
              label: 'Наименование',
              type: TypeOfRows.NAMING,
              value: { label: naming, copyble: naming === '-' ? false : true },
            },
            {
              label: 'Режим работы',
              type: TypeOfRows.MODE,
              value: {
                label:
                  AppConstants.alkolockWorkModes.find(
                    (mode) => mode.value === itemData?.device?.mode,
                  )?.label ?? '-',
              },
            },
            {
              label: 'Серийный номер',
              type: TypeOfRows.SERIAL_NUMBER,
              value: { label: serialNumber, copyble: serialNumber === '-' ? false : true },
            },
            {
              label: 'Установлен на ТС',
              type: TypeOfRows.CAR,
              value: {
                label: car,
                copyText: carForCopy,
                copyble: car === '-' ? false : true,
              },
            },
            {
              label: 'Кем привязан',
              type: TypeOfRows.USER,
              value: { label: name, copyble: name === '-' ? false : true },
            },
            {
              label: 'Дата установки',
              type: TypeOfRows.DATE,
              value: { label: date, copyble: date === '-' ? false : true },
            },
          ]}
        />

        {itemData?.device && (
          <AlkozamkiServiceMode
            data={itemData.device}
            toggleUpdateInfo={toggleUpdateInfo}
            toggleUpdateTable={toggleUpdateTable}
            outerActionData={itemData}
          />
        )}
      </div>
    </Loader>
  );
};
