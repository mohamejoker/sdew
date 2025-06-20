
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, Download, RefreshCw } from 'lucide-react';

interface UserManagementHeaderProps {
  onRefresh: () => void;
  onExport: () => void;
  onAddUser: () => void;
}

const UserManagementHeader: React.FC<UserManagementHeaderProps> = ({ onRefresh, onExport, onAddUser }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
            <Users className="h-6 w-6 text-white" />
          </div>
          إدارة المستخدمين
        </h1>
        <p className="text-gray-600 mt-2">إدارة شاملة لحسابات وصلاحيات المستخدمين</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={onRefresh} variant="outline" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          تحديث
        </Button>
        <Button onClick={onExport} variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          تصدير CSV
        </Button>
        <Button onClick={onAddUser} className="bg-gradient-to-r from-blue-500 to-purple-600 flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          مستخدم جديد
        </Button>
      </div>
    </div>
  );
};

export default UserManagementHeader;
