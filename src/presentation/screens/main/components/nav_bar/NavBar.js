import Logo from "../../../../shared/components/logo/Logo";
import './NavBar.sass'
import Const from "./const";
import {NavLink} from "react-router-dom";
import './NavBar.sass';
import MenuButton from "../../../../shared/components/menu/MenuButton";
import RoutePaths from "../../../../../internal/route_paths";
import {autoServiceStore} from "../../../../../internal/effector/auto_service/store";
import BranchSelect from "./BranchSelect";
import {userStore} from "../../../../../internal/effector/user/store";
import {useEffect} from "react";
import {checkAutoServiceCount} from "../../../../../internal/effector/auto_service/effects";

const NavBar = () => {
  const notifications = autoServiceStore.notificationsCount.useValue()
  const userData = userStore.userData.useValue()
  const updateNotificationsCount = autoServiceStore.updateNotificationsCount.useValue()

  useEffect(() => {
    checkAutoServiceCount()
      .catch(err => {
        console.log('checkAutoServiceCount error', err?.response)
      })

    setInterval(() => {
      checkAutoServiceCount()
        .catch(err => {
          console.log('checkAutoServiceCount error', err?.response)
        })
    }, 60000)
  }, [updateNotificationsCount])

  const permissionsFilter = (item) => {
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
                : true
  }

  return (
    <div className={'nav-bar'}>
      <div>
        <Logo />

        {userData?.isAdmin &&
          <BranchSelect />
        }

        <div className="nav-bar__links">
          {
            Const.NAV_LINKS.filter(permissionsFilter).map(link => {
              const notification = link.path === RoutePaths.autoService
                ? notifications
                : null

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                >
                  <span>{link.name}</span>
                  {!!notification &&
                    <span className={'nav-bar__notifications'}>{notifications}</span>
                  }
                </NavLink>
              )
            })
          }
        </div>
      </div>


      <MenuButton />
    </div>
  )
}

export default NavBar
