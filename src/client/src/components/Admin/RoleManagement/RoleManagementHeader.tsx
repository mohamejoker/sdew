
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Plus } from 'lucide-react';

const RoleManagementHeader: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
            <Shield className="h-6 w-6 text-white" />
          </div>
          إدارة الأدوار والصلاحيات
        </h1>
        <p className="text-gray-600 mt-2">إدارة أدوار المستخدمين - نظام مبسط (مدير / مستخدم)</p>
      </div>
      <Button className="bg-gradient-to-r from-purple-500 to-pink-600 flex items-center gap-2">
        <Plus className="h-4 w-4" />
        إضافة مستخدم
      </Button>
    </div>
  );
};

export default RoleManagementHeader;
