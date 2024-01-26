import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

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
        <RouterProvider router={routers} />
      </StyledEngineProvider>
    </QueryClientProvider>
  </ErrorBoundary>,
);
