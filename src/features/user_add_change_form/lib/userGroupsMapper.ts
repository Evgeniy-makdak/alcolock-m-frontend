import type { IUser } from '@shared/types/BaseQueryTypes';
import type { Values } from '@shared/ui/search_multiple_select';

export const userGroupsMapper = (user: IUser | null): Values => {
  if (!user) return [];
  return user.groupMembership.map((item) => ({ value: item?.group?.id, label: item?.group?.name }));
};
