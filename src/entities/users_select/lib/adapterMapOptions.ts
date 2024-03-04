import type { IUser } from '@shared/types/BaseQueryTypes';
import { Formatters } from '@shared/utils/formatters';

export const adapterMapOptions = (driver: IUser, vieBranch = false): [string, number | string] => {
  const branch =
    vieBranch && driver?.assignment?.branch?.name ? `(${driver?.assignment?.branch?.name})` : '';

  return [`${Formatters.nameFormatter(driver)} ${driver.email} ${branch}`, driver.id];
};
