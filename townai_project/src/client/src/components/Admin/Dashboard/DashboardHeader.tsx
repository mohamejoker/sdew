
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';

interface DashboardHeaderProps {
  onExport?: () => void;
  onRefresh?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onExport, onRefresh }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          لوحة التحكم الإدارية
        </h1>
        <p className="text-gray-600 mt-2">نظرة شاملة على أداء المنصة والإحصائيات</p>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" className="flex items-center gap-2" onClick={onExport}>
          <Download className="h-4 w-4" />
          تصدير التقرير
        </Button>
        <Button 
          onClick={onRefresh} 
          className="bg-gradient-to-r from-blue-500 to-purple-600 flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          تحديث
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
