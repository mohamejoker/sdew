
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface FilterControlsProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  selectedPeriod: string;
  setSelectedPeriod: (value: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  selectedPeriod,
  setSelectedPeriod,
}) => {
  const isMobile = useIsMobile();

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6">
        <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'flex-row items-center space-x-4 rtl:space-x-reverse'}`}>
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="البحث بالاسم، البريد الإلكتروني، أو رقم المعاملة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rtl:pr-10 rtl:pl-4"
              />
            </div>
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="حالة المعاملة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="completed">مكتمل</SelectItem>
              <SelectItem value="pending">معلق</SelectItem>
              <SelectItem value="failed">فشل</SelectItem>
              <SelectItem value="refunded">مُسترد</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="الفترة الزمنية" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">اليوم</SelectItem>
              <SelectItem value="week">هذا الأسبوع</SelectItem>
              <SelectItem value="month">هذا الشهر</SelectItem>
              <SelectItem value="quarter">هذا الربع</SelectItem>
              <SelectItem value="year">هذا العام</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Filter className="h-4 w-4 ml-2" />
            فلاتر متقدمة
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterControls;
