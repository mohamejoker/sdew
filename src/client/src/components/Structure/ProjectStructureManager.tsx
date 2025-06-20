
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Folder, File, Plus, Edit, Trash2, Download, Upload,
  FolderOpen, FileText, Settings, Code, Image, Video,
  Search, Filter, SortAsc, RefreshCw, Archive
} from 'lucide-react';

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  size?: number;
  lastModified?: Date;
  children?: FileNode[];
  icon?: any;
}

const ProjectStructureManager = () => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src']));
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const projectStructure: FileNode[] = [
    {
      id: 'src',
      name: 'src',
      type: 'folder',
      path: '/src',
      children: [
        {
          id: 'components',
          name: 'components',
          type: 'folder',
          path: '/src/components',
          children: [
            {
              id: 'admin-folder',
              name: 'Admin',
              type: 'folder',
              path: '/src/components/Admin',
              children: [
                { id: 'admin-providers', name: 'AdminProvidersManager.tsx', type: 'file', path: '/src/components/Admin/AdminProvidersManager.tsx', icon: Code },
                { id: 'admin-layout', name: 'AdminLayout.tsx', type: 'file', path: '/src/components/Admin/AdminLayout.tsx', icon: Code },
                { id: 'theme-control', name: 'ThemeControlPanel.tsx', type: 'file', path: '/src/components/Admin/ThemeControlPanel.tsx', icon: Code }
              ]
            },
            {
              id: 'frontend-folder',
              name: 'Frontend',
              type: 'folder',
              path: '/src/components/Frontend',
              children: [
                { id: 'hero-section', name: 'HeroSection.tsx', type: 'file', path: '/src/components/Frontend/HeroSection.tsx', icon: Code },
                { id: 'services-icons', name: 'ServicesIconsSection.tsx', type: 'file', path: '/src/components/Frontend/ServicesIconsSection.tsx', icon: Code },
                { id: 'navbar', name: 'Navbar.tsx', type: 'file', path: '/src/components/Frontend/Navbar.tsx', icon: Code }
              ]
            },
            {
              id: 'ui-control-folder',
              name: 'UIControl',
              type: 'folder',
              path: '/src/components/UIControl',
              children: [
                { id: 'ui-panel', name: 'UIControlPanel.tsx', type: 'file', path: '/src/components/UIControl/UIControlPanel.tsx', icon: Code },
                { id: 'advanced-customizer', name: 'AdvancedCustomizer.tsx', type: 'file', path: '/src/components/UIControl/AdvancedCustomizer.tsx', icon: Code }
              ]
            }
          ]
        },
        {
          id: 'pages',
          name: 'pages',
          type: 'folder',
          path: '/src/pages',
          children: [
            { id: 'new-index', name: 'NewIndex.tsx', type: 'file', path: '/src/pages/NewIndex.tsx', icon: Code },
            {
              id: 'admin-pages',
              name: 'admin',
              type: 'folder',
              path: '/src/pages/admin',
              children: [
                { id: 'ui-page', name: 'UIPage.tsx', type: 'file', path: '/src/pages/admin/UIPage.tsx', icon: Code },
                { id: 'providers-page', name: 'ProvidersPage.tsx', type: 'file', path: '/src/pages/admin/ProvidersPage.tsx', icon: Code }
              ]
            }
          ]
        },
        {
          id: 'services',
          name: 'services',
          type: 'folder',
          path: '/src/services',
          children: [
            {
              id: 'payment-folder',
              name: 'payment',
              type: 'folder',
              path: '/src/services/payment',
              children: [
                { id: 'enhanced-payment', name: 'enhancedPaymentService.ts', type: 'file', path: '/src/services/payment/enhancedPaymentService.ts', icon: Code }
              ]
            }
          ]
        },
        {
          id: 'contexts',
          name: 'contexts',
          type: 'folder',
          path: '/src/contexts',
          children: [
            { id: 'ui-control-context', name: 'UIControlContext.tsx', type: 'file', path: '/src/contexts/UIControlContext.tsx', icon: Code }
          ]
        }
      ]
    }
  ];

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFileTree = (nodes: FileNode[], level = 0) => {
    return nodes.map((node) => (
      <div key={node.id}>
        <div
          className={`flex items-center space-x-2 rtl:space-x-reverse py-1 px-2 hover:bg-gray-100 cursor-pointer ${
            selectedNode === node.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
          }`}
          style={{ paddingRight: `${level * 20 + 8}px` }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.id);
            }
            setSelectedNode(node.id);
          }}
        >
          {node.type === 'folder' ? (
            expandedFolders.has(node.id) ? <FolderOpen className="h-4 w-4 text-blue-500" /> : <Folder className="h-4 w-4 text-blue-500" />
          ) : (
            node.icon ? <node.icon className="h-4 w-4 text-gray-500" /> : <File className="h-4 w-4 text-gray-500" />
          )}
          <span className="text-sm">{node.name}</span>
          {node.type === 'file' && (
            <Badge variant="outline" className="text-xs">
              {node.name.split('.').pop()?.toUpperCase()}
            </Badge>
          )}
        </div>
        
        {node.type === 'folder' && expandedFolders.has(node.id) && node.children && (
          renderFileTree(node.children, level + 1)
        )}
      </div>
    ));
  };

  const filteredStructure = projectStructure; // يمكن إضافة منطق البحث هنا

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-screen">
      {/* File Explorer */}
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Folder className="h-5 w-5" />
                <span>هيكل المشروع</span>
                <Badge>285 ملف</Badge>
              </div>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Button size="sm" variant="outline">
                  <Search className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
            
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Input
                placeholder="البحث في الملفات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                جديد
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="border-t max-h-96 overflow-auto">
              {renderFileTree(filteredStructure)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* File Details & Actions */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>تفاصيل الملف</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedNode ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">اسم الملف</label>
                  <p className="font-medium">AdminProvidersManager.tsx</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">المسار</label>
                  <p className="text-sm text-gray-700">/src/components/Admin/</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">الحجم</label>
                  <p className="text-sm">285 أسطر</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">آخر تعديل</label>
                  <p className="text-sm">منذ 5 دقائق</p>
                </div>
                
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    تحرير
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    تحميل
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">اختر ملفاً لعرض التفاصيل</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>إحصائيات المشروع</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>إجمالي الملفات:</span>
              <Badge>285</Badge>
            </div>
            <div className="flex justify-between">
              <span>ملفات TypeScript:</span>
              <Badge variant="outline">198</Badge>
            </div>
            <div className="flex justify-between">
              <span>مكونات React:</span>
              <Badge variant="outline">87</Badge>
            </div>
            <div className="flex justify-between">
              <span>حجم المشروع:</span>
              <Badge variant="outline">3.2 MB</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>أدوات التطوير</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full" variant="outline">
              <Archive className="h-4 w-4 mr-2" />
              تصدير المشروع
            </Button>
            <Button className="w-full" variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              استيراد ملفات
            </Button>
            <Button className="w-full" variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              إعدادات البناء
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectStructureManager;
