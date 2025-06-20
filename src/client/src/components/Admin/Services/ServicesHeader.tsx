
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ServicesHeaderProps {
  onAddService: () => void;
}

const ServicesHeader: React.FC<ServicesHeaderProps> = ({ onAddService }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">إدارة الخدمات</h1>
        <p className="text-gray-600 mt-2">إدارة وتحرير جميع الخدمات المتاحة</p>
      </div>
      <Button onClick={onAddService} className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        إضافة خدمة جديدة
      </Button>
    </div>
  );
};

export default ServicesHeader;
