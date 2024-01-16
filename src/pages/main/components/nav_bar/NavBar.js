import { useEffect } from 'react';

import RoutePaths from '@app/lib/route_paths';
import { userStore } from '@features/menu_button/model/store';
import MenuButton from '@features/menu_button/ui/MenuButton';
import Logo from '@shared/ui/logo/Logo';
import { NavLink } from 'react-router-dom';

import { checkAutoServiceCount } from '../../../auto_service/model/effects';
import { autoServiceStore } from '../../../auto_service/model/store';
import BranchSelect from './BranchSelect';
import './NavBar.sass';
import './NavBar.sass';
import Const from './const';

const NavBar = () => {
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

  const permissionsFilter = (item) => {
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
    <div className={'nav-bar'}>
      <div>
        <Logo />

        {userData?.isAdmin && <BranchSelect />}

        <div className="nav-bar__links">
          {Const.NAV_LINKS.filter(permissionsFilter).map((link) => {
            const notification = link.path === RoutePaths.autoService ? notifications : null;

            return (
              <NavLink key={link.path} to={link.path}>
                <span>{link.name}</span>
                {!!notification && (
                  <span className={'nav-bar__notifications'}>{notifications}</span>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      <MenuButton />
    </div>
  );
};

export default NavBar;
