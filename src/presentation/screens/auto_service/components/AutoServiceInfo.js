import { useEffect, useState } from 'react';

import AppConstants from '../../../../internal/app_constants';
import { autoServiceStore } from '../../../../internal/effector/auto_service/store';
import { getEvent } from '../../../../internal/effector/events/effects';
import Formatters from '../../../../internal/utils/formatters';
import Info from '../../../shared/components/info/Info';
import Loader from '../../../shared/components/loader/Loader';
import AlkozamkiServiceMode from '../../alkozamki/components/AlkozamkiServiceMode';

const AutoServiceInfo = ({ selectedId, toggleUpdateInfo, toggleUpdateTable, updateData }) => {
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

  return (
    <Loader isLoading={loading} styles={{ wrapper: (base) => ({ ...base, height: '100%' }) }}>
      <div className={'alcolock-info'}>
        <Info
          fields={[
            {
              label: 'Наименование:',
              value: itemData?.device?.name ?? '-',
            },
            {
              label: 'Режим работы:',
              value: AppConstants.alkolockWorkModes.find((mode) => mode.value === itemData?.device?.mode)?.label ?? '-',
            },
            {
              label: 'Серийный номер:',
              value: itemData?.device?.serialNumber ?? '-',
            },
            {
              label: 'Установлен на ТС:',
              value: Formatters.carNameFormatter(itemData?.device?.vehicleBind?.vehicle),
            },
            {
              label: 'Кем привязан:',
              value: Formatters.nameFormatter(itemData?.device?.createdBy),
            },
            {
              label: 'Дата установки:',
              value: Formatters.formatISODate(itemData?.device?.createdAt),
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

export default AutoServiceInfo;
