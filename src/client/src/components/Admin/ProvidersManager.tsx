
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Globe, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  DollarSign,
  Users,
  TrendingUp,
  Settings,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const ProvidersManager = () => {
  const [providers, setProviders] = useState([
    {
      id: 1,
      name: 'Provider Alpha',
      email: 'alpha@provider.com',
      services: 15,
      balance: 5420,
      status: 'active',
      rating: 4.8,
      orders: 1250,
      joinDate: '2024-01-15',
      apiStatus: 'connected'
    },
    {
      id: 2,
      name: 'Provider Beta',
      email: 'beta@provider.com',
      services: 8,
      balance: 2130,
      status: 'active',
      rating: 4.6,
      orders: 890,
      joinDate: '2024-01-10',
      apiStatus: 'error'
    },
    {
      id: 3,
      name: 'Provider Gamma',
      email: 'gamma@provider.com',
      services: 22,
      balance: 8950,
      status: 'suspended',
      rating: 4.9,
      orders: 2100,
      joinDate: '2023-12-20',
      apiStatus: 'connected'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const isMobile = useIsMobile();

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || provider.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getApiStatusIcon = (status) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const totalBalance = providers.reduce((sum, provider) => sum + provider.balance, 0);
  const totalServices = providers.reduce((sum, provider) => sum + provider.services, 0);
  const totalOrders = providers.reduce((sum, provider) => sum + provider.orders, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl">
              <Globe className="h-6 w-6 text-white" />
            </div>
            إدارة الموردين
          </h1>
          <p className="text-gray-600 mt-2">إدارة وتتبع شركاء الخدمات</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            إعدادات الموردين
          </Button>
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            مورد جديد
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'}`}>
        {[
          { title: 'إجمالي الموردين', value: providers.length, color: 'from-blue-500 to-blue-600', icon: Globe },
          { title: 'الموردين النشطين', value: providers.filter(p => p.status === 'active').length, color: 'from-green-500 to-green-600', icon: CheckCircle },
          { title: 'إجمالي الخدمات', value: totalServices, color: 'from-purple-500 to-purple-600', icon: Users },
          { title: 'إجمالي الأرصدة', value: `${totalBalance.toLocaleString()} ريال`, color: 'from-yellow-500 to-yellow-600', icon: DollarSign }
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
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
            <div className={isMobile ? '' : 'col-span-2'}>
              <Input
                placeholder="البحث في الموردين..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="suspended">معلق</option>
              <option value="pending">في الانتظار</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Providers List */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>قائمة الموردين</span>
            <Badge variant="secondary">{filteredProviders.length} مورد</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المورد</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الخدمات</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الرصيد</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التقييم</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">API</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProviders.map((provider) => (
                  <tr key={provider.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <h3 className="font-medium text-gray-900">{provider.name}</h3>
                        <p className="text-sm text-gray-500">{provider.email}</p>
                        <p className="text-xs text-gray-400">انضم: {provider.joinDate}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{provider.services}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <span className="font-medium text-green-600">{provider.balance.toLocaleString()} ريال</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{provider.rating}</span>
                        <span className="text-sm text-gray-500">({provider.orders})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={getStatusColor(provider.status)}>
                        {provider.status === 'active' ? 'نشط' : provider.status === 'suspended' ? 'معلق' : 'في الانتظار'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getApiStatusIcon(provider.apiStatus)}
                        <span className="text-sm">
                          {provider.apiStatus === 'connected' ? 'متصل' : provider.apiStatus === 'error' ? 'خطأ' : 'انتظار'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600">
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

export default ProvidersManager;
