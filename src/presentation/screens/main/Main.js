import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import RoutePaths from "../../../internal/route_paths";
import Events from "../events/Events";
import {appStore, AuthStatus} from "../../../internal/effector/app/store";
import {useEffect} from "react";
import NavBar from "./components/nav_bar/NavBar";
import './Main.sass'
import Users from "../users/Users";
import Roles from "../roles/Roles";
import Vehicles from "../vehicles/Vehicles";
import Alkozamki from "../alkozamki/Alkozamki";
import Attachments from "../attachments/Attachments";
import Groups from "../groups/Groups";
import AutoService from "../auto_service/AutoService";

const Main = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isAuth = appStore.appAuthStatus.useValue() === AuthStatus.auth

  useEffect(() => {
    if (!isAuth) {
      navigate(RoutePaths.auth)
    } else {
      if (location?.pathname === '/') navigate(RoutePaths.events)
    }
  }, [isAuth])

  return (
    <div className={'main'}>
      <NavBar />
      <div className={'main__content'}>
        <div className="main__content-wrapper">
          <Routes>
            <Route
              path={RoutePaths.events}
              element={<Events />}
            />
            <Route
              path={RoutePaths.users}
              element={<Users />}
            />
            <Route
              path={RoutePaths.roles}
              element={<Roles />}
            />
            <Route
              path={RoutePaths.groups}
              element={<Groups/>}
            />
            <Route
              path={RoutePaths.tc}
              element={<Vehicles />}
            />
            <Route
              path={RoutePaths.alkozamki}
              element={<Alkozamki />}
            />
            <Route
              path={RoutePaths.autoService}
              element={<AutoService />}
            />
            <Route
              path={RoutePaths.attachments}
              element={<Attachments />}
            />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Main
