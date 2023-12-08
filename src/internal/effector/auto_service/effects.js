import {createEffect} from "effector";
import {allAutoServiceListState, updateTableState} from "./store";
import Sorts from "../../utils/sortes";
import AppConstants from "../../app_constants";

export const AutoServiceSortTypes = {
  byState: 'byState',
  byProcess: 'byProcess',
  byDriver: 'byDriver',
  byCar: 'byCar',
  bySerial: 'bySerial',
  byDate: 'byDate'
}

const sort = (list, orderType) => {
  switch (orderType) {
    case AutoServiceSortTypes.byState:
      return list.sort((a, b) => Sorts.sortByLocaleCompare(
        AppConstants.alcolockServiceTypes.find(item => item.value === a.state).label,
        AppConstants.alcolockServiceTypes.find(item => item.value === b.state).label,
      ))
    case AutoServiceSortTypes.byProcess:
      return list.sort((a, b) => Sorts.sortByLocaleCompare(
        AppConstants.alcolockServiceProcesses.find(item => item.value === a.process).label,
        AppConstants.alcolockServiceProcesses.find(item => item.value === b.process).label
      ))
    case AutoServiceSortTypes.byDriver:
      return list.sort((a, b) => {
        const aCar = `${a.alcolock.car.make} ${a.alcolock.car.model} ${a.alcolock.car.license}`
        const bCar = `${b.alcolock.car.make} ${b.alcolock.car.model} ${b.alcolock.car.license}`
        return Sorts.sortByLocaleCompare(a.driver.name, b.driver.name)
      })
    case AutoServiceSortTypes.byCar:
      return list.sort((a, b) => {
        const aCar = `${a.alcolock.car.make} ${a.alcolock.car.model} ${a.alcolock.car.license}`
        const bCar = `${b.alcolock.car.make} ${b.alcolock.car.model} ${b.alcolock.car.license}`
        return Sorts.sortByLocaleCompare(aCar, bCar)
      })
    case AutoServiceSortTypes.bySerial:
      return list.sort((a, b) => Sorts.sortByLocaleCompare(a.alcolock.serial, b.alcolock.serial))
    case AutoServiceSortTypes.byDate:
      return list.sort((a, b) => Sorts.sortByDate(a.date, b.date))
    default:
      return list
  }
}


export const uploadAutoServiceList = createEffect((
  {
    page,
    limit,
    sortBy,
    order,
    query,
    startDate,
    endDate
  }) => {
  const allList = [...allAutoServiceListState.$store.getState()]
  let resultList = [...allList]

  if (sortBy && order) {
    resultList = order === AppConstants.OrderTypes.desc
      ? sort(resultList, sortBy).reverse()
      : sort(resultList, sortBy)
  }

  const startIndex = (page - 1) * limit
  const endIndex = Math.min(startIndex + limit, resultList.length)

  return {
    count: resultList.length,
    list: resultList.slice(startIndex, endIndex)
  }
  // const queryTrimmed = (query?? '').trim()
})

export const hideExpiredItems = createEffect((id) => {
  const allList = allAutoServiceListState.$store.getState()

  allAutoServiceListState.setState(allList.filter(item => item.id !== id))
  updateTableState.setState(!updateTableState.$store.getState())
})

export const getAutoService = createEffect((id) => {
  return allAutoServiceListState.$store.getState().find(elem => elem.id === id)
})