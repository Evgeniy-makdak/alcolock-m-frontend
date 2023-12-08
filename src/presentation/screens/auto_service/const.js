import {AutoServiceSortTypes} from "../../../internal/effector/auto_service/effects";
import Formatters from "../../../internal/utils/formatters";
import AppConstants from "../../../internal/app_constants";
import TimeCell from "./components/TimeCell";

export const HEADERS = [
  {
    label: 'Дата',
    sortType: AutoServiceSortTypes.byDate,
    style: {
      maxWidth: '170px',
      width: '170px',
    }
  },
  {
    label: 'Серийный номер',
    sortType: AutoServiceSortTypes.bySerial
  },
  {
    label: 'Установлен на ТС',
    sortType: AutoServiceSortTypes.byCar
  },
  {
    label: 'Водитель',
    sortType: AutoServiceSortTypes.byDriver
  },
  {
    label: 'Состояние',
    sortType: AutoServiceSortTypes.byState
  },
  {
    label: 'Процесс',
    sortType: AutoServiceSortTypes.byProcess,
    style: {
      maxWidth: '120px',
      width: '120px',
    }
  },
  {
    label: 'Истекает',
    style: {
      maxWidth: '120px',
      width: '120px',
    }
  },
]

export const getRowsTemplate = (item) => ({
  id: item.id,
  values: [
    {
      value: Formatters.formatISODate(item.createdAt),
      style: {
        maxWidth: '170px',
        width: '170px',
      }
    },
    {
      value: item.alcolock?.serial ?? '-',
    },
    {
      value: item.alcolock?.car
        ? `${item.alcolock.car.make} ${item.alcolock.car.model} ${item.alcolock.car.license}`
        : '-',
    },
    {
      value: item.driver?.name ?? '-',
    },
    {
      value: AppConstants.alcolockServiceTypes.find(obj => obj.value === item.state)?.label ?? '-',
    },
    {
      value: AppConstants.alcolockServiceProcesses.find(obj => obj.value === item.process)?.label ?? '-',
      style: {
        maxWidth: '120px',
        width: '120px',
      }
    },
    {
      value: <TimeCell time={item.time} id={item.id}/>,
      style: {
        maxWidth: '120px',
        width: '120px',
      }
    },
  ]
})