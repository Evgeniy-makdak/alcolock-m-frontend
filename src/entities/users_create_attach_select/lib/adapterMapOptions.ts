import type { IAttachmentItems } from '@shared/types/BaseQueryTypes';

export const adapterMapOptions = (
  item: IAttachmentItems,
  arr: number[],
): [string, number | string] | [] => {
  if (arr.find((val) => val === item.createdBy.id)) return [];
  arr.push(item.createdBy.id);
  return [
    `${item.createdBy.middleName} ${item.createdBy.firstName} ${item.createdBy.lastName} ${item.createdBy.email}`,
    item.createdBy.id,
  ];
};
