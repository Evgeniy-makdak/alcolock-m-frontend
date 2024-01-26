import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { RoutePaths } from '@app/index';
import { MenuButton } from '@features/menu_button';
import { userStore } from '@features/menu_button/model/store';
import { BranchSelect } from '@features/nav_bar_branch_select';
// TODO => убрать связь со страницей
import { checkAutoServiceCount } from '@pages/auto_service/model/effects';
import { autoServiceStore } from '@pages/auto_service/model/store';
import { Logo } from '@shared/ui/logo';

import { NAV_LINKS, TypeNavLink } from '../lib/const';
import style from './NavBar.module.scss';

export const NavBar = () => {
  const notifications = autoServiceStore.notificationsCount.useValue();
  const userData = userStore.userData.useValue();
  const updateNotificationsCount = autoServiceStore.updateNotificationsCount.useValue();

  useEffect(() => {
    checkAutoServiceCount().catch((err) => {
      console.log('checkAutoServiceCount error', err?.response);
    });

    setInterval(() => {
      checkAutoServiceCount().catch((err) => {
        console.log('checkAutoServiceCount error', err?.response);
      });
    }, 60000);
  }, [updateNotificationsCount]);

  const permissionsFilter = (item: TypeNavLink) => {
    // TODO => убрать столько условий, слишком сложен для понимания и редактирования
    return item.path === RoutePaths.groups || item.path === RoutePaths.roles
      ? userData?.isAdmin
      : item.path === RoutePaths.users
        ? !!userData?.permissions.users
        : item.path === RoutePaths.tc
          ? !!userData?.permissions.cars
          : item.path === RoutePaths.alkozamki
            ? !!userData?.permissions.alcolocks
            : item.path === RoutePaths.attachments
              ? !!userData?.permissions.attachments
              : item.path === RoutePaths.autoService
                ? !!userData?.permissions.alkozamki || userData?.isAdmin
                : true;
  };

  return (
    <div className={style.navBar}>
      <div>
        <div className={style.logo}>
          <Logo />
        </div>
        {userData?.isAdmin && <BranchSelect />}

        <div className={style.links}>
          {NAV_LINKS.filter(permissionsFilter).map((link) => {
            const notification = link.path === RoutePaths.autoService ? notifications : null;

            return (
              <NavLink key={link.path} to={link.path}>
                <span>{link.name}</span>
                {!!notification && <span className={style.notifications}>{notifications}</span>}
              </NavLink>
            );
          })}
        </div>
      </div>

      <MenuButton />
    </div>
  );
};
