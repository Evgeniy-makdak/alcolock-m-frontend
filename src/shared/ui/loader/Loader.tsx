import { ReactNode } from 'react';
import LoadingOverlay from 'react-loading-overlay-ts';

import CircularProgress from '@mui/material/CircularProgress';

interface LoaderProps {
  children: ReactNode;
  styles: React.CSSProperties;
  isLoading: boolean;
}

export const Loader = ({ children, isLoading = false, styles = {} }: LoaderProps) => {
  return (
    <LoadingOverlay
      active={isLoading}
      spinner={<CircularProgress />}
      styles={{
        overlay: (base: React.CSSProperties) => ({
          ...base,
          background: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(1px)',
          minHeight: '88px',
        }),
        ...styles,
      }}
      fadeSpeed={100}>
      {children}
    </LoadingOverlay>
  );
};
