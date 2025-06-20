
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Upload, Plus, Grid, List } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import ThemeCard from './ThemeCard';
import ThemeEditor from './ThemeEditor';
import ThemeStats from './ThemeStats';

interface Theme {
  id: string;
  name: string;
  description: string;
  preview: string;
  isActive: boolean;
  isDefault: boolean;
  createdAt: string;
  author: string;
  downloads: number;
  rating: number;
}

const ThemeManagerComponent = () => {
  const [themes, setThemes] = useState<Theme[]>([
    {
      id: '1',
      name: 'الثيم الافتراضي',
      description: 'الثيم الأساسي للموقع',
      preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      isActive: true,
      isDefault: true,
      createdAt: '2024-01-01',
      author: 'النظام',
      downloads: 1500,
      rating: 4.8
    },
    {
      id: '2',
      name: 'الليل الأزرق',
      description: 'ثيم مظلم أنيق',
      preview: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      isActive: false,
      isDefault: false,
      createdAt: '2024-01-15',
      author: 'المطور',
      downloads: 890,
      rating: 4.6
    }
  ]);

  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const isMobile = useIsMobile();

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme);
  };

  const handleThemeActivate = (id: string) => {
    setThemes(themes.map(theme => ({
      ...theme,
      isActive: theme.id === id
    })));
  };

  const handleThemeEdit = (id: string) => {
    const theme = themes.find(t => t.id === id);
    setSelectedTheme(theme || null);
    setIsEditorOpen(true);
  };

  const handleThemeDelete = (id: string) => {
    setThemes(themes.filter(theme => theme.id !== id));
  };

  const handleThemeDuplicate = (id: string) => {
    const originalTheme = themes.find(t => t.id === id);
    if (originalTheme) {
      const newTheme = {
        ...originalTheme,
        id: Date.now().toString(),
        name: `${originalTheme.name} (نسخة)`,
        isActive: false,
        isDefault: false,
        createdAt: new Date().toISOString()
      };
      setThemes([...themes, newTheme]);
    }
  };

  const handleThemeDownload = (id: string) => {
    const theme = themes.find(t => t.id === id);
    if (theme) {
      const dataStr = JSON.stringify(theme, null, 2);
      const dataBlob = new Blob([dataStr], {type: 'application/json'});
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${theme.name}.json`;
      link.click();
    }
  };

  const handleSaveTheme = (themeData: any) => {
    if (selectedTheme) {
      setThemes(themes.map(theme => 
        theme.id === selectedTheme.id 
          ? { ...theme, ...themeData, updatedAt: new Date().toISOString() }
          : theme
      ));
    } else {
      const newTheme = {
        ...themeData,
        id: Date.now().toString(),
        isActive: false,
        isDefault: false,
        createdAt: new Date().toISOString(),
        author: 'المستخدم',
        downloads: 0,
        rating: 0,
        preview: `linear-gradient(135deg, ${themeData.primaryColor} 0%, ${themeData.secondaryColor} 100%)`
      };
      setThemes([...themes, newTheme]);
    }
    setIsEditorOpen(false);
    setSelectedTheme(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - محسن للهاتف */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="p-4 space-y-4">
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              إدارة الثيمات
            </h2>
            <p className="text-sm text-gray-600 mt-1">نظام شامل لإدارة ثيمات الموقع</p>
          </div>
          
          {/* أزرار التحكم - تخطيط عمودي للهاتف */}
          <div className="space-y-3">
            <div className="flex flex-col md:flex-row gap-3">
              <Button variant="outline" className="w-full md:w-auto">
                <Upload className="h-4 w-4 ml-2" />
                استيراد ثيم
              </Button>
              <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-pink-600">
                    <Plus className="h-4 w-4 ml-2" />
                    إنشاء ثيم جديد
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-full max-w-[95vw] md:max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {selectedTheme ? 'تحرير الثيم' : 'إنشاء ثيم جديد'}
                    </DialogTitle>
                  </DialogHeader>
                  <ThemeEditor 
                    onSave={handleSaveTheme}
                    initialData={selectedTheme}
                  />
                </DialogContent>
              </Dialog>
            </div>
            
            {/* أزرار عرض للأجهزة الكبيرة فقط */}
            {!isMobile && (
              <div className="flex justify-center gap-2">
                <Button
                  size="sm"
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="p-4 space-y-6">
        {/* إحصائيات - تخطيط محسن للهاتف */}
        <div className="w-full">
          <ThemeStats themes={themes} />
        </div>

        {/* قائمة الثيمات - تخطيط عمودي للهاتف */}
        <div className={`
          ${isMobile || viewMode === 'list' 
            ? 'flex flex-col space-y-4' 
            : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          }
        `}>
          {themes.map((theme) => (
            <div key={theme.id} className={isMobile ? 'w-full' : ''}>
              <ThemeCard
                theme={theme}
                onSelect={handleThemeSelect}
                onActivate={handleThemeActivate}
                onEdit={handleThemeEdit}
                onDelete={handleThemeDelete}
                onDuplicate={handleThemeDuplicate}
                onDownload={handleThemeDownload}
                isMobile={isMobile}
              />
            </div>
          ))}
        </div>

        {/* زر إضافة سريع للهاتف */}
        {isMobile && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="lg"
                  className="rounded-full w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg"
                >
                  <Plus className="h-6 w-6" />
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeManagerComponent;
