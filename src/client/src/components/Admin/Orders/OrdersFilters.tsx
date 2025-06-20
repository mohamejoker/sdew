
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface OrdersFiltersProps {
  searchTerm: string;
  statusFilter: string;
  onSearchChange: (term: string) => void;
  onStatusFilterChange: (status: string) => void;
}

const OrdersFilters: React.FC<OrdersFiltersProps> = ({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusFilterChange
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="البحث في الطلبات..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="تصفية حسب الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الطلبات</SelectItem>
              <SelectItem value="pending">معلقة</SelectItem>
              <SelectItem value="processing">قيد المعالجة</SelectItem>
              <SelectItem value="completed">مكتملة</SelectItem>
              <SelectItem value="cancelled">ملغية</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrdersFilters;
