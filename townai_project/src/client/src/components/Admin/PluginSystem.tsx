
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Puzzle, 
  Plus, 
  Search, 
  Download, 
  Settings, 
  Trash2, 
  Play, 
  Pause,
  Package
} from 'lucide-react';

interface Plugin {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  status: 'active' | 'inactive' | 'error';
  category: string;
  icon: any;
}

const PluginSystem = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const installedPlugins: Plugin[] = [
    {
      id: 'social-media-integration',
      name: 'تكامل وسائل التواصل الاجتماعي',
      description: 'ربط المنصة مع Instagram و TikTok و Twitter',
      version: '2.1.0',
      author: 'فريق التطوير',
      status: 'active',
      category: 'integration',
      icon: Package
    },
    {
      id: 'analytics-dashboard',
      name: 'لوحة التحليلات المتقدمة',
      description: 'تحليلات مفصلة للأداء والمبيعات',
      version: '1.5.2',
      author: 'فريق التطوير',
      status: 'active',
      category: 'analytics',
      icon: Package
    },
    {
      id: 'payment-gateway',
      name: 'بوابة الدفع المحسنة',
      description: 'دعم متعدد لبوابات الدفع الإلكتروني',
      version: '3.0.1',
      author: 'فريق التطوير',
      status: 'inactive',
      category: 'payment',
      icon: Package
    }
  ];

  const availablePlugins: Plugin[] = [
    {
      id: 'email-marketing',
      name: 'التسويق عبر البريد الإلكتروني',
      description: 'أدوات متقدمة للتسويق عبر البريد الإلكتروني',
      version: '1.0.0',
      author: 'فريق خارجي',
      status: 'inactive',
      category: 'marketing',
      icon: Package
    },
    {
      id: 'seo-optimizer',
      name: 'محسن محركات البحث',
      description: 'تحسين تلقائي لمحركات البحث',
      version: '2.3.1',
      author: 'فريق خارجي',
      status: 'inactive',
      category: 'seo',
      icon: Package
    }
  ];

  const togglePlugin = (pluginId: string) => {
    console.log(`تبديل حالة الإضافة: ${pluginId}`);
  };

  const installPlugin = (pluginId: string) => {
    console.log(`تثبيت الإضافة: ${pluginId}`);
  };

  const uninstallPlugin = (pluginId: string) => {
    console.log(`إلغاء تثبيت الإضافة: ${pluginId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'inactive': return 'غير نشط';
      case 'error': return 'خطأ';
      default: return 'غير معروف';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Puzzle className="h-6 w-6 text-purple-600" />
              <CardTitle>نظام الإضافات</CardTitle>
              <Badge className="bg-purple-100 text-purple-800">
                {installedPlugins.length} مثبت
              </Badge>
            </div>
            
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              رفع إضافة مخصصة
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="البحث في الإضافات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Installed Plugins */}
      <Card>
        <CardHeader>
          <CardTitle>الإضافات المثبتة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {installedPlugins.map((plugin) => {
            const IconComponent = plugin.icon;
            return (
              <div key={plugin.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <IconComponent className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{plugin.name}</h3>
                    <p className="text-sm text-gray-600">{plugin.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs text-gray-500">v{plugin.version}</span>
                      <span className="text-xs text-gray-500">بواسطة {plugin.author}</span>
                      <Badge className={getStatusColor(plugin.status)}>
                        {getStatusText(plugin.status)}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => togglePlugin(plugin.id)}
                  >
                    {plugin.status === 'active' ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-red-600"
                    onClick={() => uninstallPlugin(plugin.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Available Plugins */}
      <Card>
        <CardHeader>
          <CardTitle>الإضافات المتاحة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {availablePlugins.map((plugin) => {
            const IconComponent = plugin.icon;
            return (
              <div key={plugin.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <IconComponent className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{plugin.name}</h3>
                    <p className="text-sm text-gray-600">{plugin.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs text-gray-500">v{plugin.version}</span>
                      <span className="text-xs text-gray-500">بواسطة {plugin.author}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    onClick={() => installPlugin(plugin.id)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    تثبيت
                  </Button>
                  
                  <Button size="sm" variant="outline">
                    معاينة
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default PluginSystem;
