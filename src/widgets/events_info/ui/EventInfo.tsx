import { Stack } from '@mui/material';

import { Image } from '@entities/image';
import { Info } from '@entities/info';
// TODO => убрать связь со страницей
import { Loader } from '@shared/ui/loader';

import { useEventInfo } from '../hooks/useEventInfo';
import style from './EventInfo.module.scss';

interface EventInfo {
  selectedEventId: string | number;
}

export const EventInfo = ({ selectedEventId }: EventInfo) => {
  const { data, isLoading, fields } = useEventInfo(selectedEventId);
  return (
    <Loader isLoading={isLoading}>
      <div className={style.eventInfo}>
        {!!data?.summary?.photoFileName && (
          <Stack alignItems={'center'} justifyContent={'center'} minHeight={410}>
            <Image url={data.summary.photoFileName} />
          </Stack>
        )}
        <Info withoutPaddings fields={fields} />
      </div>
    </Loader>
  );
};
