import { ReactNode } from 'react';
import LoadingOverlay, { type LoadingOverLayProps } from 'react-loading-overlay-ts';

import CircularProgress from '@mui/material/CircularProgress';

interface LoaderProps {
  children: ReactNode;
  styles?: React.CSSProperties;
  isLoading?: boolean;
  testid?: string;
  props?: LoadingOverLayProps;
}

export const Loader = ({
  children,
  isLoading = false,
  styles = {},
  testid,
  props,
}: LoaderProps) => {
  return (
    <LoadingOverlay
      {...props}
      data-testid={testid}
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
