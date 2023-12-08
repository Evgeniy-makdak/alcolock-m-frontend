import Info from "../../../shared/components/info/Info";
import {useEffect, useState} from "react";
import {getItem} from "../../../../internal/effector/alkozamki/effects";
import AppConstants from "../../../../internal/app_constants";
import Formatters from "../../../../internal/utils/formatters";
import './AlkozamkiInfo.sass'
import AlkozamkiServiceMode from "./AlkozamkiServiceMode";
import Loader from "../../../shared/components/loader/Loader";

const AlkozamkiInfo = (
  {
    updateData,
    selectedAlcolockId,
    toggleUpdateInfo,
    toggleUpdateTable
  }) => {
  const [itemData, setItemData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!selectedAlcolockId) return
    setLoading(true)
    getItem(selectedAlcolockId)
      .then(res => {
        if (res) {
          setLoading(false)
          setItemData(res)
        }
      })
  }, [selectedAlcolockId, updateData])


  return (
    <Loader isLoading={loading} styles={{wrapper: (base) => ({...base, height: '100%'})}}>
      <div className={'alcolock-info'}>
        <Info
          fields={[
            {
              label: 'Наименование:',
              value: itemData?.name ?? '-'
            },
            {
              label: 'Режим работы:',
              value: AppConstants.alkolockWorkModes.find(mode => mode.value === itemData?.mode)?.label ?? '-'
            },
            {
              label: 'Серийный номер:',
              value: itemData?.serialNumber ?? '-'
            },
            {
              label: 'Установлен на ТС:',
              value: itemData?.vehicleBind?.vehicle
                ? `${itemData.vehicleBind.vehicle.manufacturer} ${itemData.vehicleBind.vehicle.model} ${itemData.vehicleBind.vehicle.registrationNumber}`
                : '-'
            },
            {
              label: 'Кем привязан:',
              value: itemData?.createdBy
                ? `${itemData.createdBy.firstName} ${itemData.createdBy.lastName}`
                : '-'
            },
            {
              label: 'Дата установки:',
              value: Formatters.formatISODate(itemData?.createdAt)
            },
          ]}
        />

        {itemData && !!itemData.vehicleBind &&
          <AlkozamkiServiceMode
            data={itemData}
            toggleUpdateInfo={toggleUpdateInfo}
            toggleUpdateTable={toggleUpdateTable}
          />
        }
      </div>
    </Loader>
  )
}

export default AlkozamkiInfo
