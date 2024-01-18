import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './app/ui/App';
import './index.scss';
import ErrorBoundary from './pages/error_boundary/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <StyledEngineProvider injectFirst>
      <Router>
        <App />
      </Router>
    </StyledEngineProvider>
  </ErrorBoundary>,
);
