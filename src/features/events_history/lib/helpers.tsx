import { AppConstants } from '@app/index';
import { StyledTable } from '@shared/styled_components/styledTable';
import type { ID, IDeviceAction } from '@shared/types/BaseQueryTypes';
import { Formatters } from '@shared/utils/formatters';

export const ItemButton = (event: IDeviceAction, expandRowId: ID) =>
  expandRowId === event.id ? <StyledTable.CollapseIcon /> : <StyledTable.ExpandIcon />;

export const date = (event: IDeviceAction) => Formatters.formatISODate(event.createdAt);

export const typeEvent = (event: IDeviceAction) => {
  return AppConstants.eventTypesList.find((item) => item.value === event.type)?.label ?? '-';
};

export const isTheSameRow = (event: IDeviceAction, expandRowId: ID) => expandRowId === event.id;
