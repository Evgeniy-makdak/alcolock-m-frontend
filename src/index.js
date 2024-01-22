import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import StyledEngineProvider from '@mui/material/StyledEngineProvider';

import { routers } from '@app/lib/routers';
import { ErrorBoundary } from '@layout/error_boundary';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <StyledEngineProvider injectFirst>
      <RouterProvider router={routers} />
    </StyledEngineProvider>
  </ErrorBoundary>,
);
