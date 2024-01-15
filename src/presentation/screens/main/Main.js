import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { AuthStatus, appStore } from '../../../internal/effector/app/store';
import RoutePaths from '../../../internal/route_paths';
import Alkozamki from '../alkozamki/Alkozamki';
import Attachments from '../attachments/Attachments';
import AutoService from '../auto_service/AutoService';
import Events from '../events/Events';
import Groups from '../groups/Groups';
import Roles from '../roles/Roles';
import Users from '../users/Users';
import Vehicles from '../vehicles/Vehicles';
import './Main.sass';
import NavBar from './components/nav_bar/NavBar';

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

  return (
    <div className={'main'}>
      <NavBar />
      <div className={'main__content'}>
        <div className="main__content-wrapper">
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
