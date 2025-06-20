
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Save, RotateCcw, Eye, EyeOff, Download, Upload } from 'lucide-react';
import { useUIControl } from '@/contexts/UIControlContext';

interface UIControlHeaderProps {
  onClose: () => void;
}

const UIControlHeader = ({ onClose }: UIControlHeaderProps) => {
  const { 
    settings, 
    saveSettings, 
    resetSettings, 
    previewMode, 
    setPreviewMode 
  } = useUIControl();

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'townmedia-ui-settings.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string);
          console.log('Imported settings:', importedSettings);
        } catch (error) {
          console.error('Error importing settings:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">أدوات التحكم</h2>
            <p className="text-purple-100">تخصيص كامل للواجهة</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="text-white border-white/20 hover:bg-white/10"
          >
            ✕
          </Button>
        </div>
      </div>

      {/* Control Actions */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={previewMode ? "default" : "outline"}
            size="sm"
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center gap-2"
          >
            {previewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {previewMode ? 'إخفاء المعاينة' : 'معاينة مباشرة'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={saveSettings}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            حفظ
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={resetSettings}
            className="flex items-center gap-2 text-red-600"
          >
            <RotateCcw className="h-4 w-4" />
            إعادة تعيين
          </Button>
        </div>
        
        <div className="flex gap-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={exportSettings}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            تصدير
          </Button>
          
          <label className="cursor-pointer">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              asChild
            >
              <span>
                <Upload className="h-4 w-4" />
                استيراد
              </span>
            </Button>
            <input
              type="file"
              accept=".json"
              onChange={importSettings}
              className="hidden"
            />
          </label>
        </div>
        
        {previewMode && (
          <Badge variant="secondary" className="mt-2">
            وضع المعاينة المباشرة مفعل
          </Badge>
        )}
      </div>
    </>
  );
};

export default UIControlHeader;
