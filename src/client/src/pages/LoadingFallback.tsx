
import React from 'react';
import LoadingSpinner from '@/components/Common/LoadingSpinner';

const LoadingFallback: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoadingSpinner size="lg" text="جاري التحميل..." />
    </div>
  );
};

export default LoadingFallback;
