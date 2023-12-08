import './AlkozamkiServiceMode.sass'
import {changeAlcolockService} from "../../../../internal/effector/alkozamki/effects";
import {useEffect, useState} from "react";
import {hideExpiredItems} from "../../../../internal/effector/auto_service/effects";
import {useToggle} from "../../../../internal/hooks/useToggle";
import Popup from "../../../shared/ui/popup/Popup";
import ActivateForm from "./ActivateForm";
import {alcolockActivateFormSelectors} from "../../../../internal/effector/events/forms";
import Button, {ButtonsType} from "../../../shared/ui/button/Button";
import AppConstants from "../../../../internal/app_constants";
import {activateServiceMode, cancelActivateService} from "../../../../internal/effector/events/effects";
import Formatters from "../../../../internal/utils/formatters";

const AlkozamkiServiceMode = ({data, toggleUpdateInfo, toggleUpdateTable}) => {
  const [openActivatePopup, toggleActivatePopup] = useToggle()
  const isValidForm = alcolockActivateFormSelectors.useIsFormValid()
  const onClickSubmit = alcolockActivateFormSelectors.useOnClickSubmit()
  const resetForm = alcolockActivateFormSelectors.useResetForm()
  // useEffect(() => {
  //   if (!data) return
  //
  //  // if (!['OPERATOR_WAITING', 'DRIVER_WAITING'].includes(data.state)) {
  //  //   hideExpiredItems(data.id)
  //  // }
  // }, [data])


  const handleChangeMode = (workMode, serviceStatus) => {
    changeAlcolockService({
      id: data?.id,
      workMode,
      serviceStatus
    })
      .then(() => {
        toggleUpdateInfo()
        toggleUpdateTable()
      })
  }

  const onSubmit = () => {
    if (!isValidForm) return

    onClickSubmit()
  }

  const handleCloseActivatePopup = () => {
    toggleActivatePopup()
    resetForm()
  }
  const handleCancelActivate = (id) => {
    if (!id) {
      console.log('Нет id action')
      return
    }
    cancelActivateService(id)
      .then(() => {
        toggleUpdateInfo()
        toggleUpdateTable()
      })
      .catch(err => {
        console.log('handleCancelActivate error', err?.response)
      })
  }

  const serviceModeInfoMapper = (entity) => {
    const action = (entity?.activeActions ?? []).length
      ? entity.activeActions[0]
      : null

    return {
      action,
      type: action
        ? (action.events ?? [])[0]?.eventType ?? null
        : null,
      duration: action
        ? (action.events ?? [])[0]?.extra?.duration ?? null
        : null,

    }
  }

  const getButtons = () => {
    try {
      const serviceModeInfo = serviceModeInfoMapper(data)

      if (serviceModeInfo.action) {
        if (serviceModeInfo.type === 'SERVER_REQUEST' ) {
          const time = Formatters.parseISO8601Duration(serviceModeInfo.duration)
          const timeFormat = time
            ? `${time.hours}:${time.minutes}:${time.seconds}`
            : '-'

          return (
            <>
              <span><b>Включение на {timeFormat}</b></span>
              <div className={'alcolock_service_mode__toggles'}>
                <button>
                  ожидание
                </button>
                <button
                  className={'cancel'}
                  onClick={() => handleCancelActivate(serviceModeInfo.action?.id)}
                >
                  Отменить
                </button>
              </div>
            </>
          )
        } else {
          return null
        }
      } else {
        return (
          <div className={'alcolock_service_mode__toggles'}>
            <button
              className={'active'}
              onClick={toggleActivatePopup}
            >
              Включить
            </button>
            <button>Выключить</button>
          </div>
        )
      }
    } catch (err) {
      console.log('Ошибка в отображении режима автосервиса')
    }

  }


    // switch (data.mode) {
    //   case 'NORMAL':
    //     return (
    //       <>
    //         <button
    //           className={'active'}
    //           onClick={toggleActivatePopup}
    //         >
    //           Включить
    //         </button>
    //         <button>Выключить</button>
    //       </>
    //     )
      // case 'OPERATOR_WAITING':
      //   return (
      //     <>
      //       <button
      //         className={'accept'}
      //         // onClick={() => handleChangeMode(1, AppConstants.ServiceModeTypes.on)}
      //       >
      //         Принять
      //       </button>
      //
      //       <button
      //         className={'cancel'}
      //         // onClick={() => handleChangeMode(data?.work_mode, AppConstants.ServiceModeTypes.off)}
      //       >
      //         Отклонить
      //       </button>
      //     </>
      //   )
      // case 'DRIVER_WAITING':
      //   return (
      //     <>
      //       <button>
      //         ожидание
      //       </button>
      //       <button
      //         className={'cancel'}
      //         // onClick={() => handleChangeMode(data?.work_mode, AppConstants.ServiceModeTypes.off)}
      //       >
      //         Отменить
      //       </button>
      //     </>
      //   )
    //   default:
    //     return null
    // }


  const getText = () => {
    switch (data.state) {
      case 'OFFLINE_SWITCH':
        if (data.process === 'SWITCHING_ON') {
          return <span>Включен в оффлайн-режиме на 10:10:10</span>
        } else if (data.process === 'SWITCHING_OFF') {
          return <span>Выключен в оффлайн-режиме</span>
        } else {
          return ''
        }
      case 'DRIVER_WAITING':
        if (data.process === 'SWITCHING_ON') {
          return <span><b>Включение на 10:10:10</b></span>
        } else if (data.process === 'SWITCHING_OFF') {
          return <span><b>Выключение</b></span>
        } else {
          return ''
        }
      case 'OPERATOR_WAITING':
        if (data.process === 'SWITCHING_ON') {
          return <span><b>Включение на 10:10:10</b></span>
        } else if (data.process === 'SWITCHING_OFF') {
          return <span><b>Выключение</b></span>
        } else {
          return ''
        }
      case 'DRIVER_ACCEPT':
        if (data.process === 'SWITCHING_ON') {
          return <span><b>Включение на 10:10:10 подтверждено</b> водителем</span>
        } else if (data.process === 'SWITCHING_OFF') {
          return <span><b>Выключение подтверждено</b> водителем</span>
        } else {
          return ''
        }
      case 'DRIVER_CANCEL':
        if (data.process === 'SWITCHING_ON') {
          return <span><b>Включение на 10:10:10 отклонено</b> водителем</span>
        } else if (data.process === 'SWITCHING_OFF') {
          return <span><b>Выключение отклонено</b> водителем</span>
        } else {
          return ''
        }
      default:
        return ''
    }
  }

  const handleActivate = (formData) => {
    activateServiceMode({
      data: formData,
      deviceId: data.id
    })
      .then(() => {
        handleCloseActivatePopup()
        toggleUpdateInfo()
        toggleUpdateTable()
      })
      .catch(err => {
        console.log('activateServiceMode error', err?.response)
      })
  }

  return (
    <>
      <div className={'alcolock_service_mode'}>
        <span className={'alcolock_service_mode__name'}>Режим "Автосервис": </span>
        {/*{getText()}*/}
        {getButtons()}
      </div>

      <Popup
        isOpen={openActivatePopup}
        headerTitle={'Включить режима “Автосервис”?'}
        toggleModal={toggleActivatePopup}
        closeonClickSpace={false}
        body={<ActivateForm
          formSelectors={alcolockActivateFormSelectors}
          onValidSubmit={handleActivate}
        />}
        buttons={[
          <Button
            key={'action_1'}
            type={ButtonsType.action}
            disabled={!isValidForm}
            onClick={onSubmit}
          >
            {'Включить'}
          </Button>,
          <Button
            key={'action_2'}
            type={ButtonsType.action}
            onClick={handleCloseActivatePopup}
          >
            {AppConstants.cancelTxt}
          </Button>,
        ]}
      />
    </>
  )
}

export default AlkozamkiServiceMode
