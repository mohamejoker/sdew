
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MoreVertical } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar: string;
  phone: string;
  lastLogin: string;
}

interface UserListProps {
  users: User[];
  getRoleColor: (role: string) => string;
  getRoleLabel: (role: string) => string;
}

const UserList: React.FC<UserListProps> = ({ users, getRoleColor, getRoleLabel }) => {
  if (!users || users.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        لا توجد مستخدمين لعرضهم
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {users.map((user, index) => (
        <div 
          key={user.id} 
          className={`flex items-center justify-between p-6 hover:bg-gray-50 transition-all duration-200 ${
            index !== users.length - 1 ? 'border-b border-gray-100' : ''
          }`}
        >
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <Avatar className="h-12 w-12 border-2 border-gray-200">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                {user.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-gray-900">{user.name}</h3>
              <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-600">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Phone className="h-4 w-4" />
                    <span>{user.phone}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">آخر دخول: {user.lastLogin}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Badge className={getRoleColor(user.role)}>
              {getRoleLabel(user.role)}
            </Badge>
            <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
              {user.status === 'active' ? 'نشط' : 'غير نشط'}
            </Badge>
            <Button variant="outline" size="sm" className="border-2 hover:bg-blue-50">
              تعديل
            </Button>
            <Button variant="outline" size="sm" className="border-2">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
