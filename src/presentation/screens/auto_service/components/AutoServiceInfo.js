import Info from "../../../shared/components/info/Info";
import {useEffect, useState} from "react";
import {getAutoService} from "../../../../internal/effector/auto_service/effects";
import AppConstants from "../../../../internal/app_constants";
import Formatters from "../../../../internal/utils/formatters";
import AlkozamkiServiceMode from "../../alkozamki/components/AlkozamkiServiceMode";

const AutoServiceInfo = (
  {
    selectedId,
  }) => {
  const [itemData, setItemData] = useState(null)

  useEffect(() => {
    if (!selectedId) return

    getAutoService(selectedId)
      .then(res => {

        if (res) {
          setItemData(res)
        }
      })
  }, [selectedId])

  return (
    <div className={'alcolock-info'}>
      <Info
        fields={[
          {
            label: 'Наименование:',
            value: itemData?.alcolock?.name ?? '-'
          },
          {
            label: 'Режим работы:',
            value: AppConstants.alkolockWorkModes.find(mode => mode.value === itemData?.mode)?.label ?? '-'
          },
          {
            label: 'Серийный номер:',
            value: itemData?.alcolock?.serial ?? '-'
          },
          {
            label: 'Установлен на ТС:',
            value: itemData?.alcolock?.car
              ? `${itemData.alcolock.car.make} ${itemData.alcolock.car.model} ${itemData.alcolock.car.license}`
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

      {/*{itemData &&*/}
      {/*  <AlkozamkiServiceMode*/}
      {/*    data={itemData}*/}
      {/*  />*/}
      {/*}*/}
    </div>
  )
}

export default AutoServiceInfo
