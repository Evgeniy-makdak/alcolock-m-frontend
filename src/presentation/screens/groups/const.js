import {GroupsSortTypes} from "../../../internal/effector/groups/effects";
import Formatters from "../../../internal/utils/formatters";

export const HEADERS = [
  {
    label: 'Название группы',
    sortType: GroupsSortTypes.byName,
  },
  {
    label: 'Кем создана',
    sortType: GroupsSortTypes.byUser,
  },
  {
    label: 'Дата создания',
    sortType: GroupsSortTypes.byDate,
    style: {
      maxWidth: '201px',
      width: '201px',
    }
  },
]

export const getRowsTemplate = (item) => {
  return {
    id: item.id,
    disabledAction: item.systemGenerated,
    values: [
      {
        value: item.name,
      },
      {
        value: Formatters.nameFormatter(item.createdBy)
      },
      {
        value: Formatters.formatISODate(item.createdAt),
        style: {
          maxWidth: '201px',
          width: '201px',
        }
      },
    ]
  }
}

export const DELETE_POPUP_TITLE = 'Удаление группы'
export const getDeletePopupBody = (selectedItem) => {
  return <p>
    Вы действительно хотите удалить группу <b>{selectedItem?.name}</b>?
  </p>
}

export const ADD_POPUP_TITLE = 'Добавление группы'
export const EDIT_POPUP_TITLE = 'Редактирование названия группы'
