import type { IAttachmentItems } from '@shared/api/baseQuerys';
import type { Value } from '@shared/ui/search_multiple_select/SearchMultipleSelect';

export const mapUsersCreateAttach = (data: IAttachmentItems[]): Value[] => {
  const array: Value[] = [];

  data.map((item) => {
    if (array.find((val) => val.value === item.createdBy.id)) return;
    array.push({
      label: `${item.createdBy.middleName} ${item.createdBy.firstName} ${item.createdBy.lastName} ${item.createdBy.email}`,
      value: item.createdBy.id,
    });
  });
  return array;
};
