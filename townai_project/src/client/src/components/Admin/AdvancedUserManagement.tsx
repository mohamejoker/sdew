
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, Search, Filter, Download, Upload, 
  UserPlus, Edit, Trash2, Eye, MoreHorizontal 
} from 'lucide-react';
import { useSupabaseUsers } from '@/hooks/useSupabaseUsers';
import { useActivityLogs } from '@/hooks/useActivityLogs';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const AdvancedUserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const { data: users = [], isLoading } = useSupabaseUsers();
  const { logActivity } = useActivityLogs();

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.roles?.includes(selectedRole);
    return matchesSearch && matchesRole;
  });

  const handleExportUsers = () => {
    const csvData = filteredUsers.map(user => ({
      'الاسم': user.full_name || '',
      'البريد الإلكتروني': user.email || '',
      'الدور': user.roles?.[0] || 'user',
      'تاريخ التسجيل': user.created_at ? new Date(user.created_at).toLocaleDateString('ar-SA') : ''
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `users_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    logActivity.mutate({
      action_type: 'export',
      resource_type: 'users',
      description: `تم تصدير ${filteredUsers.length} مستخدم إلى CSV`
    });
  };

  const userStats = [
    { title: 'إجمالي المستخدمين', value: users.length, color: 'from-blue-500 to-blue-600' },
    { title: 'المديرون', value: users.filter(u => u.roles?.includes('admin')).length, color: 'from-purple-500 to-purple-600' },
    { title: 'المستخدمون العاديون', value: users.filter(u => !u.roles?.includes('admin')).length, color: 'from-green-500 to-green-600' },
    { title: 'النشطون اليوم', value: Math.floor(users.length * 0.3), color: 'from-orange-500 to-orange-600' }
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" text="جاري تحميل المستخدمين..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Users className="h-6 w-6 text-white" />
            </div>
            إدارة المستخدمين المتقدمة
          </h1>
          <p className="text-gray-600 mt-2">إدارة شاملة مع إمكانيات البحث والتصدير</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            استيراد CSV
          </Button>
          <Button onClick={handleExportUsers} variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            تصدير CSV
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            مستخدم جديد
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {userStats.map((stat, index) => (
          <Card key={index} className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color} text-white`}>
                  <Users className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            البحث والفلترة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="البحث بالاسم أو البريد الإلكتروني..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">جميع الأدوار</option>
              <option value="admin">مدير</option>
              <option value="user">مستخدم عادي</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>قائمة المستخدمين</span>
            <Badge variant="secondary">{filteredUsers.length} مستخدم</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المستخدم</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الدور</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تاريخ التسجيل</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">آخر نشاط</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{user.full_name || 'غير محدد'}</h3>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={user.roles?.includes('admin') ? "default" : "secondary"}>
                        {user.roles?.includes('admin') ? 'مدير' : 'مستخدم'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString('ar-SA') : '—'}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      منذ ساعتين
                    </td>
                    <td className="px-6 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border shadow-lg">
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="h-4 w-4 mr-2" />
                            عرض التفاصيل
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="h-4 w-4 mr-2" />
                            تعديل
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            حذف
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedUserManagement;
