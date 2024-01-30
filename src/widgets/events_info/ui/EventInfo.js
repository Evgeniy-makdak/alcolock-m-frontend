import { useEffect, useState } from 'react';

import { Image } from '@entities/image';
import { Info } from '@entities/info';
// TODO => убрать связь со страницей
import { getEvent } from '@pages/events/model/effects';
import { testids } from '@shared/const/testid';
import { Loader } from '@shared/ui/loader';
import { MapLink } from '@shared/ui/map_link';
import { Formatters } from '@shared/utils/formatters';

import style from './EventInfo.module.scss';

export const EventInfo = ({ selectedEventId }) => {
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedEventId) return;
    setLoading(true);
    getEvent(selectedEventId)
      .then((res) => {
        if (res) {
          setLoading(false);
          setEventData(res);
        }
      })
      .catch((err) => {
        console.log('EventInfo err', err?.response ?? err);
      });
  }, [selectedEventId]);

  return (
    <Loader isLoading={loading}>
      <div className={style.eventInfo}>
        {!!eventData?.summary?.photoFileName && (
          <div className={style.img}>
            <Image url={eventData.summary.photoFileName} />
          </div>
        )}

        <Info
          withoutPaddings
          //TODO => вынести все массивы в константы или функции
          fields={[
            {
              label: 'Пользователь:',
              value: Formatters.nameFormatter(eventData?.createdBy),
            },
            {
              label: 'Серийный номер алкозамка:',
              value: eventData?.device?.serialNumber ?? '-',
            },
            (eventData?.summary?.stateErrorCode ?? null) !== null
              ? {
                  label: 'Код ошибка:',
                  value: eventData.summary.stateErrorCode,
                }
              : null,
            (eventData?.summary?.stateError ?? null) !== null
              ? {
                  label: 'Ошибка:',
                  value: eventData.summary.stateError.replace('ALCOLOCK_STATE_', ''),
                }
              : null,
            {
              label: 'Координаты:',
              value:
                !!(eventData?.events ?? [])[0] &&
                !!eventData?.events[0].latitude &&
                !!eventData?.events[0].longitude ? (
                  <MapLink
                    testid={testids.page_events.events_widget_info.EVENTS_WIDGET_INFO_MAPLINK}
                    latitude={eventData.events[0].latitude}
                    longitude={eventData.events[0].longitude}
                  />
                ) : (
                  '-'
                ),
            },
            eventData?.type === 'SOBRIETY_TEST'
              ? {
                  label: 'Количественный результат:',
                  value: `${eventData?.summary?.testResult ?? '-'} мг/л`,
                }
              : null,
            eventData?.type === 'SOBRIETY_TEST'
              ? {
                  label: 'Качественный результат:',
                  value:
                    eventData.summary?.exhaleError === 'DEVICE_TEST_ERROR_HIGH_CONCENTRATION' ? (
                      <span style={{ color: '#EB5757' }}>Нетрезвый</span>
                    ) : eventData.summary?.exhaleError === 'DEVICE_TEST_ERROR_INTERRUPTED' ? (
                      <span style={{ color: '#FF8C00' }}>Прерван</span>
                    ) : eventData.summary?.exhaleError === 'DEVICE_TEST_ERROR_FALSIFICATION' ? (
                      <span style={{ color: '#FF8C00' }}>Фальсификация выдоха</span>
                    ) : eventData.summary?.result === 'PASSED' ? (
                      <span style={{ color: '#219653' }}>Трезвый</span>
                    ) : eventData.summary?.result === 'FAILED' ? (
                      <span style={{ color: '#EB5757' }}>Нетрезвый</span>
                    ) : (
                      '-'
                    ),
                }
              : null,
          ]}
        />
      </div>
    </Loader>
  );
};
