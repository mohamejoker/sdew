
import React from 'react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { ErrorHandler } from '@/utils/errorHandler';

interface ErrorBoundaryWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  context?: string;
}

const ErrorBoundaryWrapper: React.FC<ErrorBoundaryWrapperProps> = ({ 
  children, 
  fallback, 
  context 
}) => {
  const handleError = (error: Error, errorInfo: any) => {
    ErrorHandler.logError(error, context);
  };

  return (
    <ErrorBoundary fallback={fallback} onError={handleError}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;
