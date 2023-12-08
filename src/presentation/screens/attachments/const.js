import Formatters from "../../../internal/utils/formatters";
import {AttachmentsSortTypes} from "../../../internal/effector/attachments/effects";

export const HEADERS = [
  {
    label: 'Алкозамок',
    sortType: AttachmentsSortTypes.byName
  },
  {
    label: 'Серийный номер',
    sortType: AttachmentsSortTypes.bySerial
  },
  {
    label: 'ТС',
    sortType: AttachmentsSortTypes.byCar
  },
  {
    label: 'Водитель',
    sortType: AttachmentsSortTypes.byDriver
  },
  {
    label: 'Кем привязан',
    sortType: AttachmentsSortTypes.byUser
  },
  {
    label: 'Дата привязки',
    sortType: AttachmentsSortTypes.byDate,
    style: {
      maxWidth: '201px',
      width: '201px',
    }
  },
]

export const getRowsTemplate = (item) => ({
  id: item.id,
  values: [
    {
      value: item.vehicle?.monitoringDevice?.name ?? '-'
    },
    {
      value: item.vehicle?.monitoringDevice?.serialNumber ?? '-'
    },
    {
      value: item.vehicle
        ? Formatters.carNameFormatter(item.vehicle)
        : '-'
    },
    {
      value: item.driver?.userAccount
        ? Formatters.nameFormatter(item.driver.userAccount)
        : '-'
    },
    {
      value: item.createdBy
        ? Formatters.nameFormatter(item.createdBy)
        : '-'
    },
    {
      value: Formatters.formatISODate(item.createdAt),
      style: {
        maxWidth: '201px',
        width: '201px',
      }
    }
  ]
})

export const DELETE_POPUP_TITLE = 'Удаление привязки Алкозамка'
export const getDeletePopupBody = (selectedItem) => {
  return <p>
    Вы действительно хотите удалить привязку <b>{selectedItem?.vehicle?.monitoringDevice?.name ?? ''}</b>?
  </p>
}

export const ADD_POPUP_TITLE = 'Привязка Алкозамка'
export const EDIT_POPUP_TITLE = 'Редактирование привязки Алкозамка'

