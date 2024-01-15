import Formatters from '../../../../../internal/utils/formatters';
import MapLink from '../../map_link/MapLink';
import { HistoryTypes } from '../EventsHistory';
import './EventData.sass';

const EventData = ({ event, type }) => {
  return (
    <div className={'event-data'}>
      {type !== HistoryTypes.byUser && (
        <div className="event-data__row">
          <span>Водитель</span>

          <span>{Formatters.nameFormatter((event?.events ?? [])[0]?.userRecord)}</span>
        </div>
      )}

      {type !== HistoryTypes.byUser && (
        <div className="event-data__row">
          <span>Почта</span>

          <span>{(event?.events ?? [])[0]?.userRecord?.email}</span>
        </div>
      )}

      {type === HistoryTypes.byCar && (
        <div className="event-data__row">
          <span>Наименование алкозамка</span>

          <span>{event?.device?.name ?? '-'}</span>
        </div>
      )}

      {type === HistoryTypes.byCar && (
        <div className="event-data__row">
          <span>Серийный номер алкозамка</span>

          <span>{event?.device?.serialNumber ?? '-'}</span>
        </div>
      )}

      {type !== HistoryTypes.byCar && (
        <div className="event-data__row">
          <span>Марка ТС</span>

          <span>{event?.vehicleRecord?.manufacturer ?? '-'}</span>
        </div>
      )}

      {type !== HistoryTypes.byCar && (
        <div className="event-data__row">
          <span>Модель ТС</span>

          <span>{event?.vehicleRecord?.model ?? '-'}</span>
        </div>
      )}

      {type !== HistoryTypes.byCar && (
        <div className="event-data__row">
          <span>Государственный номер</span>

          <span>{event?.vehicleRecord?.registrationNumber ?? '-'}</span>
        </div>
      )}

      {event.action?.type === 'SOBRIETY_TEST' && type !== HistoryTypes.byAlcolock && (
        <div className="event-data__row">
          <span>Результат тестирования</span>

          <span>
            {event.summary?.testResult ?? '-'} мг/л
            {/*({AppConstants.sobrietyTypesList.find(item => item.value === event.event.sobriety)?.label ?? '-'})*/}
          </span>
        </div>
      )}

      <div className="event-data__row">
        <span>Координаты</span>

        <span>
          {!!(event?.events ?? [])[0] && !!event?.events[0].latitude && !!event?.events[0].longitude ? (
            <MapLink latitude={event.events[0].latitude} longitude={event.events[0].longitude} />
          ) : (
            '-'
          )}
        </span>
      </div>
    </div>
  );
};

export default EventData;
