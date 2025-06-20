
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Code, 
  Package, 
  FileText, 
  Zap,
  Copy,
  Check,
  Eye,
  Settings
} from 'lucide-react';

const ComponentExporter = () => {
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const [exportFormat, setExportFormat] = useState('react');
  const [copied, setCopied] = useState<string | null>(null);

  const components = [
    {
      id: 'user-management',
      name: 'إدارة المستخدمين',
      description: 'مكون كامل لإدارة المستخدمين مع البحث والتصفية',
      category: 'admin',
      size: '15.2 KB',
      exports: ['UserManagement', 'UserCard', 'UserFilters']
    },
    {
      id: 'analytics-dashboard',
      name: 'لوحة التحليلات',
      description: 'مكونات التحليلات والإحصائيات المتقدمة',
      category: 'analytics',
      size: '23.1 KB',
      exports: ['AnalyticsDashboard', 'ChartComponents', 'MetricsCards']
    },
    {
      id: 'notification-system',
      name: 'نظام الإشعارات',
      description: 'نظام إشعارات متكامل مع الوقت الفعلي',
      category: 'notifications',
      size: '18.7 KB',
      exports: ['NotificationSystem', 'NotificationCard', 'NotificationForm']
    },
    {
      id: 'payment-gateway',
      name: 'بوابة الدفع',
      description: 'مكونات معالجة المدفوعات والفواتير',
      category: 'payments',
      size: '28.5 KB',
      exports: ['PaymentGateway', 'PaymentForm', 'InvoiceGenerator']
    }
  ];

  const handleComponentToggle = (componentId: string) => {
    setSelectedComponents(prev => 
      prev.includes(componentId) 
        ? prev.filter(id => id !== componentId)
        : [...prev, componentId]
    );
  };

  const handleExportAll = () => {
    console.log('تصدير جميع المكونات المحددة:', selectedComponents);
  };

  const handleCopyCode = (componentId: string) => {
    const code = generateComponentCode(componentId);
    navigator.clipboard.writeText(code);
    setCopied(componentId);
    setTimeout(() => setCopied(null), 2000);
  };

  const generateComponentCode = (componentId: string) => {
    return `// Generated code for ${componentId}
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ExportedComponent = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>مكون مُصدَّر</CardTitle>
        </CardHeader>
        <CardContent>
          <p>هذا مكون تم تصديره من نظام إدارة المكونات</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExportedComponent;`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'admin': return 'bg-blue-100 text-blue-800';
      case 'analytics': return 'bg-green-100 text-green-800';
      case 'notifications': return 'bg-purple-100 text-purple-800';
      case 'payments': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalSize = selectedComponents.reduce((total, id) => {
    const component = components.find(c => c.id === id);
    return total + (component ? parseFloat(component.size) : 0);
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Package className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold">مُصدِّر المكونات</h1>
            <p className="text-gray-600">تصدير وإعادة استخدام مكونات النظام</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="react">React Components</option>
            <option value="vue">Vue Components</option>
            <option value="angular">Angular Components</option>
            <option value="html">HTML/CSS</option>
          </select>
          
          <Button 
            onClick={handleExportAll}
            disabled={selectedComponents.length === 0}
            className="bg-gradient-to-r from-blue-500 to-purple-600"
          >
            <Download className="h-4 w-4 mr-2" />
            تصدير المحددة ({selectedComponents.length})
          </Button>
        </div>
      </div>

      {/* Export Summary */}
      {selectedComponents.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-blue-900">ملخص التصدير</h3>
                <p className="text-sm text-blue-700">
                  {selectedComponents.length} مكون محدد • الحجم الإجمالي: {totalSize.toFixed(1)} KB
                </p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">
                جاهز للتصدير
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Components Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {components.map((component) => {
          const isSelected = selectedComponents.includes(component.id);
          
          return (
            <Card 
              key={component.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => handleComponentToggle(component.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                      <Code className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{component.name}</CardTitle>
                      <Badge className={getCategoryColor(component.category)}>
                        {component.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {isSelected && <Check className="h-5 w-5 text-blue-500" />}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600">{component.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>الحجم: {component.size}</span>
                  <span>{component.exports.length} تصدير</span>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">التصديرات المتاحة:</h4>
                  <div className="flex flex-wrap gap-1">
                    {component.exports.map((exportName, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {exportName}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 pt-2 border-t">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyCode(component.id);
                    }}
                    className="flex-1"
                  >
                    {copied === component.id ? (
                      <>
                        <Check className="h-3 w-3 mr-1" />
                        تم النسخ
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        نسخ الكود
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            خيارات التصدير المتقدمة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">تضمين التبعيات</label>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium">تصغير الكود</label>
              <input type="checkbox" className="rounded" />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium">تضمين الأنماط</label>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
          </div>
          
          <div className="flex items-center gap-4 pt-4 border-t">
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              إنشاء وثائق
            </Button>
            
            <Button variant="outline">
              <Package className="h-4 w-4 mr-2" />
              حزمة NPM
            </Button>
            
            <Button>
              <Download className="h-4 w-4 mr-2" />
              تنزيل الملفات
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComponentExporter;
