import {Route, Routes, useNavigate} from "react-router-dom";
import {appStore} from "./effector/app/store";
import {useEffect} from "react";
import Main from "../presentation/screens/main/Main";
import RoutePaths from "./route_paths";
import Authorization from "../presentation/screens/authorization/Authorization";
import {cookieManager} from "./utils/cookie_manager";
import {getUserData} from "./effector/user/effects";
import CircularProgress from '@mui/material/CircularProgress';

function App() {
  const navigate = useNavigate()
  const loading = appStore.appLoading.useValue()
  const token = appStore.appToken.useValue()

  useEffect(() => {
    const bar = token ?? cookieManager.get('bearer')
    getUserData({
      token: bar,
      navigate
    })
      .catch(err => {
        console.log('getUserData error', err?.response)
      })
  }, [token])

  return (
    <div className="app">
      {
        loading
          ? (
            <div className={'loading-page'}>
              <CircularProgress />
            </div>
          )
          : (
            <Routes>
              <Route
                path={RoutePaths.auth}
                element={<Authorization />}
              />
              <Route
                path={'/*'}
                element={<Main />}
              />
            </Routes>
          )
      }
    </div>
  );
}

export default App
