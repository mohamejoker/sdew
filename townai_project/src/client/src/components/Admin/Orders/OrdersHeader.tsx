
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Filter } from 'lucide-react';

interface OrdersHeaderProps {
  onExport?: () => void;
  onFilter?: () => void;
}

const OrdersHeader: React.FC<OrdersHeaderProps> = ({ onExport, onFilter }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">إدارة الطلبات</h1>
        <p className="text-gray-600 mt-2">متابعة ومعالجة جميع طلبات الخدمات</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="flex items-center gap-2" onClick={onExport}>
          <Download className="h-4 w-4" />
          تصدير البيانات
        </Button>
        <Button variant="outline" className="flex items-center gap-2" onClick={onFilter}>
          <Filter className="h-4 w-4" />
          تصفية
        </Button>
      </div>
    </div>
  );
};

export default OrdersHeader;
