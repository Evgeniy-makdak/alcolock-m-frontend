import { useEffect } from 'react';

import { getUserData } from '@features/menu_button/model/effects';
import CircularProgress from '@mui/material/CircularProgress';
import { cookieManager } from '@shared/utils/cookie_manager';
import Authorization from 'pages/authorization/ui/Authorization';
import Main from 'pages/main/Main';
import { Route, Routes, useNavigate } from 'react-router-dom';

import RoutePaths from '../lib/route_paths';
import { appStore } from '../model/store';
import style from './app.module.scss';

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
    <div className={style.app}>
      {loading ? (
        <div className={style.loadingPage}>
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
