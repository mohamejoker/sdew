
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  UserCheck,
  UserX,
  Crown,
  Shield,
  Settings,
  Mail,
  Phone,
  Calendar
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-01-15',
      joinDate: '2023-12-01',
      orders: 25,
      spent: 5420
    },
    {
      id: 2,
      name: 'فاطمة علي',
      email: 'fatima@example.com',
      role: 'user',
      status: 'active',
      lastLogin: '2024-01-14',
      joinDate: '2023-11-15',
      orders: 12,
      spent: 2130
    },
    {
      id: 3,
      name: 'محمد السعيد',
      email: 'mohammed@example.com',
      role: 'provider',
      status: 'suspended',
      lastLogin: '2024-01-10',
      joinDate: '2023-10-20',
      orders: 45,
      spent: 8950
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const isMobile = useIsMobile();

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'provider': return 'bg-blue-100 text-blue-800';
      case 'user': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <Crown className="h-4 w-4" />;
      case 'provider': return <Shield className="h-4 w-4" />;
      case 'user': return <Users className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const totalRevenue = users.reduce((sum, user) => sum + user.spent, 0);
  const totalOrders = users.reduce((sum, user) => sum + user.orders, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Users className="h-6 w-6 text-white" />
            </div>
            إدارة المستخدمين
          </h1>
          <p className="text-gray-600 mt-2">إدارة وتتبع جميع المستخدمين في النظام</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            إعدادات المستخدمين
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            مستخدم جديد
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'}`}>
        {[
          { title: 'إجمالي المستخدمين', value: totalUsers, color: 'from-blue-500 to-blue-600', icon: Users },
          { title: 'المستخدمين النشطين', value: activeUsers, color: 'from-green-500 to-green-600', icon: UserCheck },
          { title: 'إجمالي الطلبات', value: totalOrders, color: 'from-purple-500 to-purple-600', icon: Calendar },
          { title: 'إجمالي الإيرادات', value: `${totalRevenue.toLocaleString()} ريال`, color: 'from-yellow-500 to-yellow-600', icon: Crown }
        ].map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-4 rounded-full bg-gradient-to-r ${stat.color} text-white`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search and Filters */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            البحث والتصفية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-4'}`}>
            <div className={isMobile ? '' : 'col-span-2'}>
              <Input
                placeholder="البحث في المستخدمين..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">جميع الأدوار</option>
              <option value="admin">مشرف</option>
              <option value="provider">مقدم خدمة</option>
              <option value="user">مستخدم</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="suspended">معلق</option>
              <option value="pending">في الانتظار</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="shadow-sm">
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
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المستخدم</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الدور</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">النشاط</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإحصائيات</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <h3 className="font-medium text-gray-900">{user.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Calendar className="h-3 w-3" />
                          انضم: {user.joinDate}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={`${getRoleColor(user.role)} flex items-center gap-1 w-fit`}>
                        {getRoleIcon(user.role)}
                        {user.role === 'admin' ? 'مشرف' : user.role === 'provider' ? 'مقدم خدمة' : 'مستخدم'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={getStatusColor(user.status)}>
                        {user.status === 'active' ? 'نشط' : user.status === 'suspended' ? 'معلق' : 'في الانتظار'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p>آخر دخول: {user.lastLogin}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p>الطلبات: <span className="font-medium">{user.orders}</span></p>
                        <p className="text-green-600 font-medium">{user.spent.toLocaleString()} ريال</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" title="عرض">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" title="تحرير">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" title="إرسال رسالة">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600" title="حذف">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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

export default UserManagement;
