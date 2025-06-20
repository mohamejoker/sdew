
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SupaUser } from '@/hooks/useSupabaseUsers';
import UserRoleRow from './UserRoleRow';

interface UsersTableProps {
  users: SupaUser[];
  onRoleChange: (userId: string, newRole: 'admin' | 'user') => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onRoleChange }) => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>قائمة المستخدمين</span>
          <Badge variant="secondary">{users.length} مستخدم</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المستخدم</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الدور الحالي</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تاريخ الإنشاء</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <UserRoleRow 
                  key={user.id} 
                  user={user} 
                  onRoleChange={onRoleChange} 
                />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersTable;
