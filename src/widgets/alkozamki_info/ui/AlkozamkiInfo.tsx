import { Info } from '@entities/info';
import { AlkozamkiServiceMode } from '@features/alkozamki_service_mode';
import type { ID } from '@shared/types/BaseQueryTypes';
// TODO => убрать связь со страницей
import { Loader } from '@shared/ui/loader';

import { useAlkozamkiInfo } from '../hooks/useAlkozamkiInfo';
import style from './AlkozamkiInfo.module.scss';

export const AlkozamkiInfo = ({ selectedAlcolockId }: { selectedAlcolockId: ID }) => {
  const { alkolock, fields, isLoading } = useAlkozamkiInfo(selectedAlcolockId);
  return (
    <Loader isLoading={isLoading}>
      <div className={style.alcolockInfo}>
        <Info fields={fields} />

        {alkolock && !!alkolock.vehicleBind && <AlkozamkiServiceMode alkolock={alkolock} />}
      </div>
    </Loader>
  );
};
