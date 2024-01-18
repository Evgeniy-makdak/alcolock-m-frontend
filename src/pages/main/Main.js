import { useEffect } from 'react';

import RoutePaths from '@app/lib/route_paths';
import { AuthStatus, appStore } from '@app/model/store';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Alkozamki from '../alkozamki/ui/Alkozamki';
import Attachments from '../attachments/ui/Attachments';
import AutoService from '../auto_service/ui/AutoService';
import Events from '../events/ui/Events';
import Groups from '../groups/ui/Groups';
import Roles from '../roles/ui/Roles';
import Users from '../users/ui/Users';
import Vehicles from '../vehicles/ui/Vehicles';
import style from './Main.module.scss';
import NavBar from './components/nav_bar/NavBar';

// TODO => вынести Main после разбора с роутерами
const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = appStore.appAuthStatus.useValue() === AuthStatus.auth;

  useEffect(() => {
    if (!isAuth) {
      navigate(RoutePaths.auth);
    } else {
      if (location?.pathname === '/') navigate(RoutePaths.events);
    }
  }, [isAuth]);
  // TODO => сделать массив с роутарами и инициализацию в App.tsx
  return (
    <div className={style.main}>
      <NavBar />
      <div className={style.content}>
        <div className={style.contentWrapper}>
          <Routes>
            <Route path={RoutePaths.events} element={<Events />} />
            <Route path={RoutePaths.users} element={<Users />} />
            <Route path={RoutePaths.roles} element={<Roles />} />
            <Route path={RoutePaths.groups} element={<Groups />} />
            <Route path={RoutePaths.tc} element={<Vehicles />} />
            <Route path={RoutePaths.alkozamki} element={<Alkozamki />} />
            <Route path={RoutePaths.autoService} element={<AutoService />} />
            <Route path={RoutePaths.attachments} element={<Attachments />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Main;
