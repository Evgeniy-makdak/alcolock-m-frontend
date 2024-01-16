import CircularProgress from '@mui/material/CircularProgress';
import LoadingOverlay from 'react-loading-overlay';

const Loader = ({ children, isLoading = false, styles = {} }) => {
  return (
    <LoadingOverlay
      active={isLoading}
      spinner={<CircularProgress />}
      styles={{
        overlay: (base) => ({
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

export default Loader;
