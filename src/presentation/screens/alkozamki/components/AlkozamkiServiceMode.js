import { useEffect } from 'react';

import AppConstants from '../../../../internal/app_constants';
import { autoServiceStore } from '../../../../internal/effector/auto_service/store';
import {
  acceptActivateService,
  activateServiceMode,
  cancelActivateService,
  rejectActivateService,
  seenAutoService,
} from '../../../../internal/effector/events/effects';
import { alcolockActivateFormSelectors } from '../../../../internal/effector/events/forms';
import { useToggle } from '../../../../internal/hooks/useToggle';
import Formatters from '../../../../internal/utils/formatters';
import SearchMethods from '../../../../internal/utils/global_methods';
import Button, { ButtonsType } from '../../../shared/ui/button/Button';
import Popup from '../../../shared/ui/popup/Popup';
import ActivateForm from './ActivateForm';
import './AlkozamkiServiceMode.sass';

const AlkozamkiServiceMode = ({ data, toggleUpdateInfo, toggleUpdateTable, outerActionData = null }) => {
  const [openActivatePopup, toggleActivatePopup] = useToggle();
  const [openDeactivatePopup, toggleDeactivatePopup] = useToggle();
  const isValidForm = alcolockActivateFormSelectors.useIsFormValid();
  const onClickSubmit = alcolockActivateFormSelectors.useOnClickSubmit();
  const resetForm = alcolockActivateFormSelectors.useResetForm();
  const [updateNotificationsCount, setUpdateNotificationsCount] = autoServiceStore.updateNotificationsCount.useState();

  useEffect(() => {
    if (!outerActionData || outerActionData?.seen) return;
    const lastEvent = SearchMethods.findMostRecentEvent(outerActionData.events);
    const requestType = SearchMethods.findFirstRequestEvent(outerActionData.events)?.eventType;
    const isAcknowledged = !!(outerActionData.events ?? []).find((event) => event.eventType === 'APP_ACKNOWLEDGED');

    if (
      ['OFFLINE_DEACTIVATION', 'OFFLINE_ACTIVATION'].includes(lastEvent?.eventType) ||
      isAcknowledged ||
      (['REJECTED', 'ACCEPTED'].includes(lastEvent?.eventType) && requestType === 'SERVER_REQUEST')
    ) {
      seenAutoService(outerActionData?.id)
        .then(() => {
          toggleUpdateInfo();
          toggleUpdateTable();
        })
        .catch((err) => {
          console.log('seenAutoService error', err?.response);
        });
    }
  }, [outerActionData]);

  const onSubmit = () => {
    if (!isValidForm) return;

    onClickSubmit();
  };

  const handleCloseActivatePopup = () => {
    toggleActivatePopup();
    resetForm();
  };
  const handleCancelActivate = (id) => {
    if (!id) {
      console.log('Нет id action');
      return;
    }
    cancelActivateService(id)
      .then(() => {
        toggleUpdateInfo();
        toggleUpdateTable();
        setUpdateNotificationsCount(!updateNotificationsCount);
      })
      .catch((err) => {
        console.log('handleCancelActivate error', err?.response);
      });
  };

  const handleRejectActivateService = (id) => {
    if (!id) {
      console.log('Нет id action');
      return;
    }
    rejectActivateService(id)
      .then(() => {
        toggleUpdateInfo();
        toggleUpdateTable();
        setUpdateNotificationsCount(!updateNotificationsCount);
      })
      .catch((err) => {
        console.log('handleRejectActivateService error', err?.response);
      });
  };

  const handleAcceptActivateService = (id) => {
    if (!id) {
      console.log('Нет id action');
      return;
    }
    acceptActivateService(id)
      .then(() => {
        toggleUpdateInfo();
        toggleUpdateTable();
        setUpdateNotificationsCount(!updateNotificationsCount);
      })
      .catch((err) => {
        console.log('handleRejectActivateService error', err?.response);
      });
  };

  const serviceModeInfoMapper = (entity) => {
    const action = outerActionData ?? ((entity?.activeActions ?? []).length ? entity.activeActions[0] : null);
    const lastEvent = SearchMethods.findMostRecentEvent(action?.events);
    const requestEvent = SearchMethods.findFirstRequestEvent(action?.events);

    return {
      action,
      type: lastEvent?.eventType ?? null,
      duration: action ? (action?.events ?? [])[0]?.extra?.duration ?? null : null,
      requestType: requestEvent?.eventType ?? null,
      isAcknowledged: !!(action?.events ?? []).find((event) => event.eventType === 'APP_ACKNOWLEDGED'),
    };
  };

  const handleActivate = (formData) => {
    activateServiceMode({
      data: formData,
      deviceId: data.id,
    })
      .then(() => {
        handleCloseActivatePopup();
        toggleUpdateInfo();
        toggleUpdateTable();
        setUpdateNotificationsCount(!updateNotificationsCount);
      })
      .catch((err) => {
        console.log('activateServiceMode error', err?.response);
      });
  };

  const handleDeactivate = () => {
    activateServiceMode({
      isDeactivate: true,
      deviceId: data.id,
    })
      .then(() => {
        toggleDeactivatePopup();
        toggleUpdateInfo();
        toggleUpdateTable();
        setUpdateNotificationsCount(!updateNotificationsCount);
      })
      .catch((err) => {
        console.log('handleDeactivate error', err?.response);
      });
  };

  const getButtons = () => {
    try {
      const serviceModeInfo = serviceModeInfoMapper(data);
      console.log('serviceModeInfo', serviceModeInfo);
      const isServiceMode = data?.mode === 'MAINTENANCE';
      if (serviceModeInfo.action) {
        const time = Formatters.parseISO8601Duration(serviceModeInfo.duration);
        const timeFormat = time ? `${time.hours}:${time.minutes}:${time.seconds}` : '-';

        switch (serviceModeInfo.type) {
          case 'SERVER_REQUEST':
            const servText =
              serviceModeInfo.action.type === 'SERVICE_MODE_DEACTIVATE' ? (
                <span>
                  <b>Выключение</b>
                </span>
              ) : serviceModeInfo.action.type === 'SERVICE_MODE_ACTIVATE' ? (
                <span>
                  <b>Включение на {timeFormat}</b>
                </span>
              ) : (
                '-'
              );
            return (
              <>
                {servText}
                <div className={'alcolock_service_mode__toggles'}>
                  <button>ожидание</button>
                  <button className={'cancel'} onClick={() => handleCancelActivate(serviceModeInfo.action?.id)}>
                    Отменить
                  </button>
                </div>
              </>
            );
          case 'APP_REQUEST':
            const appText =
              serviceModeInfo.action.type === 'SERVICE_MODE_DEACTIVATE' ? (
                <span>
                  <b>Выключение</b>
                </span>
              ) : serviceModeInfo.action.type === 'SERVICE_MODE_ACTIVATE' ? (
                <span>
                  <b>Включение на {timeFormat}</b>
                </span>
              ) : (
                '-'
              );
            return (
              <>
                {appText}
                <div className={'alcolock_service_mode__toggles'}>
                  <button className={'accept'} onClick={() => handleAcceptActivateService(serviceModeInfo.action?.id)}>
                    Принять
                  </button>

                  <button className={'cancel'} onClick={() => handleRejectActivateService(serviceModeInfo.action?.id)}>
                    Отклонить
                  </button>
                </div>
              </>
            );
          case 'REJECTED':
            if (serviceModeInfo.requestType === 'SERVER_REQUEST') {
              return serviceModeInfo.action.type === 'SERVICE_MODE_DEACTIVATE' ? (
                <span>
                  <b>Выключение отклонено</b> водителем
                </span>
              ) : serviceModeInfo.action.type === 'SERVICE_MODE_ACTIVATE' ? (
                <span>
                  <b>Включение отклонено</b> водителем
                </span>
              ) : (
                '-'
              );
            } else if (serviceModeInfo.requestType === 'APP_REQUEST') {
              if (serviceModeInfo.isAcknowledged) {
                return <span>Отклонение подтвержденно приложением</span>;
              } else {
                return <span>Ожидание подтверждения приложения</span>;
              }
            } else {
              return <span>Ожидание подтверждения приложения</span>;
            }
          case 'ACCEPTED':
            if (serviceModeInfo.requestType === 'SERVER_REQUEST') {
              return serviceModeInfo.action.type === 'SERVICE_MODE_DEACTIVATE' ? (
                <span>
                  <b>Выключение подтверждено</b> водителем
                </span>
              ) : serviceModeInfo.action.type === 'SERVICE_MODE_ACTIVATE' ? (
                <span>
                  <b>Включение подтверждено</b> водителем
                </span>
              ) : (
                '-'
              );
            } else if (serviceModeInfo.requestType === 'APP_REQUEST') {
              if (serviceModeInfo.isAcknowledged) {
                return <span>Подтвержденно приложением</span>;
              } else {
                return <span>Ожидание подтверждения приложения</span>;
              }
            } else {
              return <span>Ожидание подтверждения приложения</span>;
            }
          case 'OFFLINE_DEACTIVATION':
            return <span>Выключен в оффлайн-режиме</span>;
          case 'OFFLINE_ACTIVATION':
            return <span>Включен в оффлайн-режиме на {timeFormat}</span>;
          default:
            return null;
        }
      } else {
        return (
          <div className={'alcolock_service_mode__toggles'}>
            <button className={!isServiceMode ? 'active' : ''} onClick={!isServiceMode ? toggleActivatePopup : null}>
              Включить
            </button>
            <button className={isServiceMode ? 'active' : ''} onClick={isServiceMode ? toggleDeactivatePopup : null}>
              Выключить
            </button>
          </div>
        );
      }
    } catch (err) {
      console.log('Ошибка в отображении режима автосервиса', err);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const getText = () => {
    switch (data.state) {
      case 'OFFLINE_SWITCH':
        if (data.process === 'SWITCHING_ON') {
          return <span>Включен в оффлайн-режиме на 10:10:10</span>;
        } else if (data.process === 'SWITCHING_OFF') {
          return <span>Выключен в оффлайн-режиме</span>;
        } else {
          return '';
        }
      case 'DRIVER_WAITING':
        if (data.process === 'SWITCHING_ON') {
          return (
            <span>
              <b>Включение на 10:10:10</b>
            </span>
          );
        } else if (data.process === 'SWITCHING_OFF') {
          return (
            <span>
              <b>Выключение</b>
            </span>
          );
        } else {
          return '';
        }
      case 'OPERATOR_WAITING':
        if (data.process === 'SWITCHING_ON') {
          return (
            <span>
              <b>Включение на 10:10:10</b>
            </span>
          );
        } else if (data.process === 'SWITCHING_OFF') {
          return (
            <span>
              <b>Выключение</b>
            </span>
          );
        } else {
          return '';
        }
      case 'DRIVER_ACCEPT':
        if (data.process === 'SWITCHING_ON') {
          return (
            <span>
              <b>Включение на 10:10:10 подтверждено</b> водителем
            </span>
          );
        } else if (data.process === 'SWITCHING_OFF') {
          return (
            <span>
              <b>Выключение подтверждено</b> водителем
            </span>
          );
        } else {
          return '';
        }
      case 'DRIVER_CANCEL':
        if (data.process === 'SWITCHING_ON') {
          return (
            <span>
              <b>Включение на 10:10:10 отклонено</b> водителем
            </span>
          );
        } else if (data.process === 'SWITCHING_OFF') {
          return (
            <span>
              <b>Выключение отклонено</b> водителем
            </span>
          );
        } else {
          return '';
        }
      default:
        return '';
    }
  };

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
        body={<ActivateForm formSelectors={alcolockActivateFormSelectors} onValidSubmit={handleActivate} />}
        buttons={[
          <Button key={'action_1'} type={ButtonsType.action} disabled={!isValidForm} onClick={onSubmit}>
            {'Включить'}
          </Button>,
          <Button key={'action_2'} type={ButtonsType.action} onClick={handleCloseActivatePopup}>
            {AppConstants.cancelTxt}
          </Button>,
        ]}
      />

      <Popup
        isOpen={openDeactivatePopup}
        headerTitle={'Отключить режим “Автосервис”?'}
        toggleModal={toggleDeactivatePopup}
        buttons={[
          <Button key={'action_1'} type={ButtonsType.action} onClick={handleDeactivate}>
            {'Отключть'}
          </Button>,
          <Button key={'action_2'} type={ButtonsType.action} onClick={toggleDeactivatePopup}>
            {AppConstants.cancelTxt}
          </Button>,
        ]}
      />
    </>
  );
};

export default AlkozamkiServiceMode;
