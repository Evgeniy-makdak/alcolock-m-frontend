import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';

import Authorization from '../presentation/screens/authorization/Authorization';
import Main from '../presentation/screens/main/Main';
import { appStore } from './effector/app/store';
import { getUserData } from './effector/user/effects';
import RoutePaths from './route_paths';
import { cookieManager } from './utils/cookie_manager';

function App() {
  const navigate = useNavigate();
  const loading = appStore.appLoading.useValue();
  const token = appStore.appToken.useValue();

  useEffect(() => {
    const bar = token ?? cookieManager.get('bearer');
    getUserData({
      token: bar,
      navigate,
    }).catch((err) => {
      console.log('getUserData error', err?.response);
    });
  }, [token]);

  return (
    <div className="app">
      {loading ? (
        <div className={'loading-page'}>
          <CircularProgress />
        </div>
      ) : (
        <Routes>
          <Route path={RoutePaths.auth} element={<Authorization />} />
          <Route path={'/*'} element={<Main />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
