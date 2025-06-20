
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface NotificationHeaderProps {
  isCreating: boolean;
  setIsCreating: (isCreating: boolean) => void;
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({ isCreating, setIsCreating }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">نظام الإشعارات</h1>
        <p className="text-gray-600">إدارة وإرسال الإشعارات للمستخدمين بكفاءة عالية</p>
      </div>
      <Button
        onClick={() => setIsCreating(!isCreating)}
        className="bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow"
      >
        <Plus className="h-4 w-4 ml-2" />
        إنشاء إشعار جديد
      </Button>
    </div>
  );
};

export default NotificationHeader;
