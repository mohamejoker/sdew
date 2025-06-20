import React from 'react';
import { Badge } from '@/components/ui/badge';
import { SupaUser } from '@/hooks/useSupabaseUsers';

interface UserRoleRowProps {
  user: SupaUser;
  onRoleChange: (userId: string, newRole: 'admin' | 'user') => void;
}

const UserRoleRow: React.FC<UserRoleRowProps> = ({ user, onRoleChange }) => {
  const getRoleColor = (roles: string[]) => {
    if (roles.includes('admin')) return 'bg-red-100 text-red-800';
    return 'bg-blue-100 text-blue-800';
  };

  const getRoleText = (roles: string[]) => {
    if (roles.includes('admin')) return 'مدير';
    return 'مستخدم';
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-medium">
            {user.full_name?.charAt(0) || 'U'}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{user.full_name || 'مستخدم'}</h3>
            <p className="text-sm text-gray-500">{user.email || user.id}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <Badge className={getRoleColor(user.roles)}>
          {getRoleText(user.roles)}
        </Badge>
      </td>
      <td className="px-6 py-4 text-gray-900">
        {user.created_at ? new Date(user.created_at).toLocaleDateString('ar-SA') : 'غير محدد'}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <select
            onChange={(e) => onRoleChange(user.id, e.target.value as 'admin' | 'user')}
            value={user.roles.includes('admin') ? 'admin' : 'user'}
            className="text-sm border border-gray-300 rounded px-2 py-1"
          >
            <option value="admin">مدير</option>
            <option value="user">مستخدم</option>
          </select>
        </div>
      </td>
    </tr>
  );
};

export default UserRoleRow;
