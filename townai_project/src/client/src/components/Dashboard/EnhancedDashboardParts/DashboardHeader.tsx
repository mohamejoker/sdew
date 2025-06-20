
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Download, RefreshCw } from 'lucide-react';

interface DashboardHeaderProps {
  isLive: boolean;
  lastUpdate: Date;
  onRefresh: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ isLive, lastUpdate, onRefresh }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div className="flex items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم المتقدمة</h1>
        <div className="flex items-center gap-2 mt-2">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${isLive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500' : 'bg-red-500'} ${isLive ? 'animate-pulse' : ''}`}></div>
            {isLive ? 'مباشر' : 'غير متصل'}
          </div>
          <span className="text-sm text-gray-500">
            آخر تحديث: {lastUpdate.toLocaleTimeString('ar-SA')}
          </span>
        </div>
      </div>
    </div>
    <div className="flex gap-2">
      <Button variant="outline" className="flex items-center gap-2">
        <Eye className="h-4 w-4" />
        عرض مفصل
      </Button>
      <Button variant="outline" className="flex items-center gap-2">
        <Download className="h-4 w-4" />
        تصدير التقرير
      </Button>
      <Button onClick={onRefresh} className="bg-gradient-to-r from-blue-500 to-purple-600 flex items-center gap-2">
        <RefreshCw className="h-4 w-4" />
        تحديث
      </Button>
    </div>
  </div>
);

export default DashboardHeader;
