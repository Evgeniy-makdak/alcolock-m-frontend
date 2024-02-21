import type { IAttachmentItems } from '@shared/types/BaseQueryTypes';
import { Formatters } from '@shared/utils/formatters';

export const adapterMapOptions = (item: IAttachmentItems): [string, number | string] => {
  return [`${Formatters.formatISODate(item.createdAt)}`, item.id];
};
