
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  GitBranch, Clock, User, Download, Upload, 
  Save, RotateCcw, Copy, Trash2, Eye, Tag
} from 'lucide-react';

interface ThemeVersion {
  id: string;
  version: string;
  name: string;
  description: string;
  author: string;
  createdAt: Date;
  isActive: boolean;
  changes: string[];
  theme: {
    colors: Record<string, string>;
    typography: Record<string, any>;
    spacing: Record<string, string>;
  };
}

const ThemeVersioning = () => {
  const [versions, setVersions] = useState<ThemeVersion[]>([
    {
      id: 'v1',
      version: '1.0.0',
      name: 'النسخة الأولية',
      description: 'النسخة الأولى من الثيم مع الألوان الأساسية',
      author: 'فريق التصميم',
      createdAt: new Date('2024-01-15'),
      isActive: false,
      changes: ['إنشاء الثيم الأساسي', 'تحديد الألوان الرئيسية', 'إعداد الخطوط'],
      theme: {
        colors: {
          primary: '#3b82f6',
          secondary: '#6b7280',
          background: '#ffffff'
        },
        typography: {
          fontFamily: 'Inter',
          fontSize: 16
        },
        spacing: {
          sm: '8px',
          md: '16px',
          lg: '24px'
        }
      }
    },
    {
      id: 'v2',
      version: '1.1.0',
      name: 'تحسينات التصميم',
      description: 'تحسين الألوان وإضافة متغيرات جديدة',
      author: 'مصمم UI',
      createdAt: new Date('2024-02-10'),
      isActive: false,
      changes: ['تحديث اللون الأساسي', 'إضافة ألوان جديدة', 'تحسين التباين'],
      theme: {
        colors: {
          primary: '#4f46e5',
          secondary: '#7c3aed',
          background: '#f8fafc'
        },
        typography: {
          fontFamily: 'Inter',
          fontSize: 16
        },
        spacing: {
          sm: '8px',
          md: '16px',
          lg: '24px'
        }
      }
    },
    {
      id: 'v3',
      version: '2.0.0',
      name: 'التصميم الحديث',
      description: 'إعادة تصميم شاملة مع ثيم عصري',
      author: 'فريق التصميم',
      createdAt: new Date('2024-03-01'),
      isActive: true,
      changes: ['إعادة تصميم كاملة', 'ثيم داكن جديد', 'تحسين الخطوط', 'مسافات محسنة'],
      theme: {
        colors: {
          primary: '#059669',
          secondary: '#0891b2',
          background: '#ffffff'
        },
        typography: {
          fontFamily: 'Cairo',
          fontSize: 18
        },
        spacing: {
          sm: '12px',
          md: '20px',
          lg: '32px'
        }
      }
    }
  ]);

  const [newVersionData, setNewVersionData] = useState({
    name: '',
    description: '',
    changes: ['']
  });

  const [showCreateModal, setShowCreateModal] = useState(false);

  const createNewVersion = () => {
    const latestVersion = versions[versions.length - 1];
    const newVersionNumber = incrementVersion(latestVersion.version);
    
    const newVersion: ThemeVersion = {
      id: `v${versions.length + 1}`,
      version: newVersionNumber,
      name: newVersionData.name,
      description: newVersionData.description,
      author: 'المستخدم الحالي',
      createdAt: new Date(),
      isActive: false,
      changes: newVersionData.changes.filter(change => change.trim() !== ''),
      theme: { ...latestVersion.theme } // نسخ الثيم الحالي
    };

    setVersions(prev => [...prev, newVersion]);
    setShowCreateModal(false);
    setNewVersionData({ name: '', description: '', changes: [''] });
  };

  const incrementVersion = (version: string): string => {
    const parts = version.split('.').map(Number);
    parts[2]++; // زيادة رقم الإصلاح
    return parts.join('.');
  };

  const activateVersion = (versionId: string) => {
    setVersions(prev => prev.map(v => ({
      ...v,
      isActive: v.id === versionId
    })));
  };

  const deleteVersion = (versionId: string) => {
    setVersions(prev => prev.filter(v => v.id !== versionId));
  };

  const duplicateVersion = (versionId: string) => {
    const version = versions.find(v => v.id === versionId);
    if (!version) return;

    const newVersion: ThemeVersion = {
      ...version,
      id: `v${versions.length + 1}`,
      version: incrementVersion(version.version),
      name: `${version.name} (نسخة)`,
      createdAt: new Date(),
      isActive: false
    };

    setVersions(prev => [...prev, newVersion]);
  };

  const exportVersion = (versionId: string) => {
    const version = versions.find(v => v.id === versionId);
    if (!version) return;

    const exportData = {
      ...version,
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `theme-${version.version}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const addChangeField = () => {
    setNewVersionData(prev => ({
      ...prev,
      changes: [...prev.changes, '']
    }));
  };

  const updateChange = (index: number, value: string) => {
    setNewVersionData(prev => ({
      ...prev,
      changes: prev.changes.map((change, i) => i === index ? value : change)
    }));
  };

  const removeChange = (index: number) => {
    setNewVersionData(prev => ({
      ...prev,
      changes: prev.changes.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GitBranch className="h-6 w-6 text-purple-600" />
              <CardTitle>إدارة إصدارات الثيمات</CardTitle>
              <Badge className="bg-purple-100 text-purple-800">
                {versions.length} إصدار
              </Badge>
            </div>
            
            <Button onClick={() => setShowCreateModal(true)}>
              <Tag className="h-4 w-4 mr-2" />
              إصدار جديد
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Version Timeline */}
      <div className="space-y-4">
        {versions.map((version, index) => (
          <Card key={version.id} className={`transition-all ${version.isActive ? 'ring-2 ring-green-500 bg-green-50' : ''}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-2">
                      <Tag className="h-5 w-5 text-blue-600" />
                      <h3 className="text-xl font-bold">{version.name}</h3>
                      <Badge variant={version.isActive ? "default" : "secondary"}>
                        v{version.version}
                      </Badge>
                      {version.isActive && (
                        <Badge className="bg-green-100 text-green-800">نشط</Badge>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{version.description}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{version.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{version.createdAt.toLocaleDateString('ar-SA')}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">التغييرات:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {version.changes.map((change, changeIndex) => (
                        <li key={changeIndex} className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Theme Preview */}
                  <div className="mt-4 p-4 border rounded-lg bg-white">
                    <h5 className="font-medium text-sm mb-3">معاينة الثيم:</h5>
                    <div className="flex items-center space-x-4">
                      <div className="flex space-x-2">
                        <div 
                          className="w-6 h-6 rounded-full border"
                          style={{ backgroundColor: version.theme.colors.primary }}
                          title="اللون الأساسي"
                        ></div>
                        <div 
                          className="w-6 h-6 rounded-full border"
                          style={{ backgroundColor: version.theme.colors.secondary }}
                          title="اللون الثانوي"
                        ></div>
                        <div 
                          className="w-6 h-6 rounded-full border"
                          style={{ backgroundColor: version.theme.colors.background }}
                          title="لون الخلفية"
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600">
                        خط: {version.theme.typography.fontFamily} • 
                        حجم: {version.theme.typography.fontSize}px
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 ml-4">
                  {!version.isActive && (
                    <Button size="sm" onClick={() => activateVersion(version.id)}>
                      تفعيل
                    </Button>
                  )}
                  
                  <Button size="sm" variant="outline" onClick={() => duplicateVersion(version.id)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  
                  <Button size="sm" variant="outline" onClick={() => exportVersion(version.id)}>
                    <Download className="h-4 w-4" />
                  </Button>
                  
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  
                  {!version.isActive && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600 hover:text-red-700"
                      onClick={() => deleteVersion(version.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create New Version Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>إنشاء إصدار جديد</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowCreateModal(false)}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium">اسم الإصدار</label>
                <Input 
                  value={newVersionData.name}
                  onChange={(e) => setNewVersionData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="مثل: تحديث الألوان الجديدة"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">وصف الإصدار</label>
                <textarea 
                  value={newVersionData.description}
                  onChange={(e) => setNewVersionData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={3}
                  placeholder="وصف التغييرات في هذا الإصدار..."
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium">قائمة التغييرات</label>
                  <Button size="sm" variant="outline" onClick={addChangeField}>
                    إضافة تغيير
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {newVersionData.changes.map((change, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input 
                        value={change}
                        onChange={(e) => updateChange(index, e.target.value)}
                        placeholder="وصف التغيير..."
                        className="flex-1"
                      />
                      {newVersionData.changes.length > 1 && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => removeChange(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2 pt-4">
                <Button onClick={createNewVersion}>
                  <Save className="h-4 w-4 mr-2" />
                  إنشاء الإصدار
                </Button>
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  إلغاء
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ThemeVersioning;
