import { AlcolockSelect } from '@entities/alcolock_select';
import { CarsSelect } from '@entities/cars_select';
import { DateOfLinkSelect } from '@entities/date_of_link_select';
import { FilterPanel } from '@entities/filter_panel';
import { UsersCreateAttachSelect } from '@entities/users_create_attach_select';
import { UsersSelect } from '@entities/users_select';
import { testids } from '@shared/const/testid';

import {
  AttachmentsFilterPanelProps,
  useAttachmentsFilterPanel,
} from '../hooks/useAttachmentsFilterPanel';

export const AttachmentsFilterPanel = ({ listener }: AttachmentsFilterPanelProps) => {
  const {
    register,
    onChangeDriver,
    onChangeCar,
    onChangeAlcolocks,
    onChangeCreateLink,
    onChangeDateLink,
  } = useAttachmentsFilterPanel({
    listener,
  });

  return (
    <FilterPanel>
      <UsersSelect
        testid={
          testids.page_attachments.attachments_widget_header
            .ATTACHMENTS_WIDGET_HEADER_FILTER_INPUT_DRIVER
        }
        label="Поиск по водителю"
        onSelectDriver={onChangeDriver}
        register={register}
      />
      <CarsSelect
        testid={
          testids.page_attachments.attachments_widget_header
            .ATTACHMENTS_WIDGET_HEADER_FILTER_INPUT_CAR
        }
        register={register}
        onSelectCar={onChangeCar}
        label="Поиск по ТС"
      />
      <UsersCreateAttachSelect
        testid={
          testids.page_attachments.attachments_widget_header
            .ATTACHMENTS_WIDGET_HEADER_FILTER_INPUT_CREATE_LINK
        }
        label="Поиск по создавшему привязку"
        onSelectUserCreateAttach={onChangeCreateLink}
        register={register}
      />
      <AlcolockSelect
        label="Поиск по алкозамку"
        onSelectAlcolock={onChangeAlcolocks}
        register={register}
        testid={
          testids.page_attachments.attachments_widget_header
            .ATTACHMENTS_WIDGET_HEADER_FILTER_INPUT_ALCOLOKS
        }
      />
      <DateOfLinkSelect
        register={register}
        onSelectDate={onChangeDateLink}
        label="Поиск по дате привязки"
        testid={
          testids.page_attachments.attachments_widget_header
            .ATTACHMENTS_WIDGET_HEADER_FILTER_INPUT_DATE_LINK
        }
      />
    </FilterPanel>
  );
};
