import { RoutePaths } from '@app/index';
import { ExtractTypeFromArray } from '@shared/types/utility';

export const NAV_LINKS = [
  {
    path: RoutePaths.events,
    name: 'События',
  },
  {
    path: RoutePaths.users,
    name: 'Пользователи',
  },
  {
    path: RoutePaths.roles,
    name: 'Роли',
  },
  {
    path: RoutePaths.groups,
    name: 'Группы',
  },
  {
    path: RoutePaths.tc,
    name: 'Транспорт',
  },
  {
    path: RoutePaths.alkozamki,
    name: 'Алкозамки',
  },
  {
    path: RoutePaths.autoService,
    name: 'Автосервис',
  },
  {
    path: RoutePaths.attachments,
    name: 'Привязки',
  },
];

export type TypeNavLinks = typeof NAV_LINKS;
export type TypeNavLink = ExtractTypeFromArray<TypeNavLinks>;
