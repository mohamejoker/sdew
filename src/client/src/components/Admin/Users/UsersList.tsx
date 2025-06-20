
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Mail, Edit, Trash2, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface User {
  id: string;
  full_name?: string;
  email: string;
  created_at: string;
}

interface UsersListProps {
  users: User[];
}

const UsersList: React.FC<UsersListProps> = ({ users }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>قائمة المستخدمين</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user.full_name?.charAt(0) || user.email?.charAt(0) || 'ج'}
                </div>
                <div>
                  <h3 className="font-semibold">{user.full_name || 'غير محدد'}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {user.email}
                  </p>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    انضم في {new Date(user.created_at).toLocaleDateString('ar-SA')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default">نشط</Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      تحرير
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      حذف
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersList;
