
import React from 'react';
import IntelligentAnalytics from '@/components/Dashboard/IntelligentAnalytics';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';

const IntelligentAnalyticsPage = () => {
  return (
    <ProtectedRoute requiredRole="admin">
      <IntelligentAnalytics />
    </ProtectedRoute>
  );
};

export default IntelligentAnalyticsPage;
