import {
  SearchMultipleSelect,
  type SearchMultipleSelectProps,
} from '@shared/ui/search_multiple_select';

import { useRolesSelect } from '../hooks/useRolesSelect';

type RolesSelectProps<T> = Omit<SearchMultipleSelectProps<T>, 'values'>;

export const RolesSelect = <T,>(props: RolesSelectProps<T>): JSX.Element => {
  const { onChange, isLoading, onReset, roles } = useRolesSelect();
  return (
    <SearchMultipleSelect
      onReset={onReset}
      onInputChange={onChange}
      isLoading={isLoading}
      values={roles}
      {...props}
    />
  );
};
