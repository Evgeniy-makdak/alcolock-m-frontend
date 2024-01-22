import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { RoutePaths } from '@app';
import { AuthStatus, appStore } from '@app/model/store';
import NavBar from '@widgets/nav_bar/ui/NavBar';

import style from './Main.module.scss';

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
        <div className={style.contentWrapper}>{/* <Outlet /> */}</div>
      </div>
    </div>
  );
};

export default Main;
{
  /* <Routes>
  <Route path={RoutePaths.events} element={<Events />} />
  <Route path={RoutePaths.users} element={<Users />} />
  <Route path={RoutePaths.roles} element={<Roles />} />
  <Route path={RoutePaths.groups} element={<Groups />} />
  <Route path={RoutePaths.tc} element={<Vehicles />} />
  <Route
    path={RoutePaths.alkozamki}
    element={
      <Suspense fallback={<Spinner />}>
        <Alkozamki />
      </Suspense>
    }
  />
  <Route path={RoutePaths.autoService} element={<AutoService />} />
  <Route path={RoutePaths.attachments} element={<Attachments />} />
</Routes>; */
}
