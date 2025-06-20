
import React, { useState, useEffect } from 'react';
import { realTimeDataService, RealTimeMetrics } from '@/services/dashboard/realTimeDataService';
import InteractiveCharts from './InteractiveCharts';
import DashboardHeader from './EnhancedDashboardParts/DashboardHeader';
import QuickStats from './EnhancedDashboardParts/QuickStats';
import PerformanceMetrics from './EnhancedDashboardParts/PerformanceMetrics';
import RecentAlerts from './EnhancedDashboardParts/RecentAlerts';

const EnhancedDashboard = () => {
  const [metrics, setMetrics] = useState<RealTimeMetrics | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    realTimeDataService.startRealTimeUpdates();
    setIsLive(true);

    const unsubscribe = realTimeDataService.subscribeToMetrics((data) => {
      setMetrics(data);
      setLastUpdate(new Date());
    });

    return () => {
      unsubscribe();
      realTimeDataService.stopRealTimeUpdates();
      setIsLive(false);
    };
  }, []);

  const handleRefresh = () => {
    realTimeDataService.stopRealTimeUpdates();
    realTimeDataService.startRealTimeUpdates();
    setLastUpdate(new Date());
  };

  return (
    <div className="space-y-6">
      <DashboardHeader 
        isLive={isLive}
        lastUpdate={lastUpdate}
        onRefresh={handleRefresh}
      />

      <QuickStats metrics={metrics} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PerformanceMetrics metrics={metrics} />
        <RecentAlerts />
      </div>

      <InteractiveCharts />
    </div>
  );
};

export default EnhancedDashboard;
