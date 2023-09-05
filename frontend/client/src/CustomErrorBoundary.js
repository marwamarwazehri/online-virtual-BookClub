import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

// ErrorFallback component to render the error UI
const ErrorFallback = ({ error }) => {
  return (
    <div>
      <h2>Something went wrong:</h2>
      <p>{error.message}</p>
      {/* You can provide additional error details or actions */}
    </div>
  );
};

// CustomErrorBoundary component to wrap your application
const CustomErrorBoundary = ({ children }) => {
  const handleError = (error, errorInfo) => {
    // You can perform additional error handling here, such as logging or reporting errors
    console.error(error, errorInfo);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      {children}
    </ErrorBoundary>
  );
};

export default CustomErrorBoundary;
