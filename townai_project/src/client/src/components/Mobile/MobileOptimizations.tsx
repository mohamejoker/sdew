
import React from 'react';
import { Smartphone } from 'lucide-react';
import PWAInstaller from './PWAInstaller';
import MobileFeatures from './MobileFeatures';
import AppBenefits from './AppBenefits';
import PerformanceStats from './PerformanceStats';
import UserReviews from './UserReviews';
import MobileCTA from './MobileCTA';

const MobileOptimizations = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
            <Smartphone className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          تطبيق الهاتف المحمول
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          احصل على أفضل تجربة مع تطبيقنا المحمول المحسّن خصيصاً للهواتف الذكية
        </p>
        
        <PWAInstaller />
      </div>

      <MobileFeatures />
      <AppBenefits />
      <PerformanceStats />
      <UserReviews />
      <MobileCTA />
    </div>
  );
};

export default MobileOptimizations;
