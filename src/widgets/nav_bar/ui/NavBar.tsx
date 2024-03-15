import { NavLink } from 'react-router-dom';

import { RoutePaths } from '@app/index';
import { MenuButton } from '@features/menu_button';
import { NavbarBranchSelect } from '@features/nav_bar_branch_select';
import { PasswordForm } from '@features/password_form';
// TODO => убрать связь со страницей
import { testids } from '@shared/const/testid';
import { useToggle } from '@shared/hooks/useToggle';
import { Logo } from '@shared/ui/logo';
import { Popup } from '@shared/ui/popup';

import { useNavBar } from '../hooks/useNavBar';
import { NAV_LINKS } from '../lib/const';
import style from './NavBar.module.scss';

export const NavBar = () => {
  const [open, toggle, close] = useToggle();
  const { permissionsFilter, length } = useNavBar();

  return (
    <>
      <div className={style.navBar}>
        <div>
          <div className={style.logo}>
            <Logo />
          </div>
          <NavbarBranchSelect />

          <div className={style.links}>
            {NAV_LINKS.filter(permissionsFilter).map((link, i) => {
              const notification = link.path === RoutePaths.autoService ? length : null;

              return (
                <NavLink
                  // использую индексы потому, что test атрибуты статичны и не должны меняться
                  data-testid={testids.widget_navbar.NAVBAR_LINK[i]}
                  key={link.path}
                  to={link.path}>
                  <span>{link.name}</span>
                  {!!notification && <span className={style.notifications}>{notification}</span>}
                </NavLink>
              );
            })}
          </div>
        </div>

        <MenuButton close={close} toggleModal={toggle} />
      </div>
      <Popup
        isOpen={open}
        toggleModal={toggle}
        closeonClickSpace={false}
        body={<PasswordForm close={close} />}
        onCloseModal={close}
      />
    </>
  );
};
