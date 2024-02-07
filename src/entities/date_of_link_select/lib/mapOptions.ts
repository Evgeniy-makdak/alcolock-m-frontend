import type { IAttachmentItems } from '@shared/api/baseQuerys';
import type { Value } from '@shared/ui/search_multiple_select/SearchMultipleSelect';
import { Formatters } from '@shared/utils/formatters';

export const mapOptions = (data: IAttachmentItems[]): Value[] => {
  return data.map((item) => ({
    label: `${Formatters.formatISODate(item.createdAt)}`,
    value: item.id,
  }));
};
