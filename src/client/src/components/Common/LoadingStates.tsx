
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import LoadingSpinner from './LoadingSpinner';

export const TableLoading: React.FC = () => (
  <div className="space-y-4">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    ))}
  </div>
);

export const CardLoading: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="bg-white p-6 rounded-lg shadow">
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    ))}
  </div>
);

export const ChartLoading: React.FC = () => (
  <div className="bg-white p-6 rounded-lg shadow">
    <Skeleton className="h-6 w-1/3 mb-4" />
    <div className="space-y-2">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex items-center space-x-2">
          <Skeleton className="h-2 flex-1" />
          <Skeleton className="h-4 w-12" />
        </div>
      ))}
    </div>
  </div>
);

export const PageLoading: React.FC<{ message?: string }> = ({ 
  message = "جاري التحميل..." 
}) => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="lg" text={message} />
  </div>
);
