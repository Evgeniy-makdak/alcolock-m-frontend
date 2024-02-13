import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { SnackbarProvider, closeSnackbar } from 'notistack';

import CloseIcon from '@mui/icons-material/Close';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';

import { routers } from '@app/lib/routers';
import { ErrorBoundary } from '@layout/error_boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.scss';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <SnackbarProvider
          action={(snackbarId) => (
            <CloseIcon className="CloseIcon" onClick={() => closeSnackbar(snackbarId)} />
          )}
          maxSnack={3}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
          <RouterProvider router={routers} />
        </SnackbarProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  </ErrorBoundary>,
);
