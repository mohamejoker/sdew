
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, X, Maximize2, Minimize2, Palette, Code, Layers, Sparkles, Wand2 } from 'lucide-react';
import UIControlTabs from './UIControlTabs';
import AdvancedThemeEditor from './AdvancedThemeEditor';
import AdvancedCustomizer from './AdvancedCustomizer';
import { useUIControl } from '@/contexts/UIControlContext';

const UIControlPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeMode, setActiveMode] = useState('basic');
  const { previewMode, setPreviewMode, saveSettings } = useUIControl();

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 left-6 z-50">
        <div className="relative">
          <Button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-700 hover:via-blue-700 hover:to-purple-700 shadow-2xl border-4 border-white/20 backdrop-blur-sm animate-pulse"
          >
            <Settings className="h-7 w-7 text-white animate-spin-slow" />
          </Button>
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 text-xs animate-bounce">
            UI
          </Badge>
          {previewMode && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-2 py-1 rounded text-xs">
              معاينة نشطة
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-300 ${
      isFullscreen ? 'p-0' : 'p-4'
    }`}>
      <div className={`bg-white shadow-2xl overflow-hidden transition-all duration-300 ${
        isFullscreen 
          ? 'w-full h-full rounded-none' 
          : 'w-full max-w-7xl h-full max-h-[95vh] rounded-2xl mx-auto'
      }`}>
        {/* Header محسن */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
                <h2 className="text-xl font-bold">مركز التحكم الشامل</h2>
                <Badge className="bg-white/20 text-white">v2.0 Pro</Badge>
              </div>
              
              {/* أوضاع التحرير المحدثة */}
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Button
                  size="sm"
                  variant={activeMode === 'basic' ? 'secondary' : 'ghost'}
                  onClick={() => setActiveMode('basic')}
                  className="text-white hover:bg-white/20"
                >
                  <Palette className="h-4 w-4 ml-2" />
                  أساسي
                </Button>
                <Button
                  size="sm"
                  variant={activeMode === 'advanced' ? 'secondary' : 'ghost'}
                  onClick={() => setActiveMode('advanced')}
                  className="text-white hover:bg-white/20"
                >
                  <Code className="h-4 w-4 ml-2" />
                  متقدم
                </Button>
                <Button
                  size="sm"
                  variant={activeMode === 'pro' ? 'secondary' : 'ghost'}
                  onClick={() => setActiveMode('pro')}
                  className="text-white hover:bg-white/20"
                >
                  <Wand2 className="h-4 w-4 ml-2" />
                  احترافي
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setPreviewMode(!previewMode)}
                className="text-white hover:bg-white/20"
              >
                {previewMode ? 'إيقاف المعاينة' : 'معاينة مباشرة'}
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-white hover:bg-white/20"
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* شريط الحالة المحسن */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/20">
            <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm">
              <span>آخر حفظ: {new Date().toLocaleTimeString('ar-SA')}</span>
              <Badge className="bg-green-500">محفوظ تلقائياً</Badge>
              <Badge className="bg-blue-500">متزامن</Badge>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
              <span>التغييرات: 12</span>
              <span>•</span>
              <span>الحجم: 3.1MB</span>
              <span>•</span>
              <span>الأداء: 98%</span>
            </div>
          </div>
        </div>

        {/* المحتوى الرئيسي المحسن */}
        <div className="flex-1 overflow-auto">
          {activeMode === 'basic' && (
            <div className="p-6">
              <UIControlTabs />
            </div>
          )}

          {activeMode === 'advanced' && (
            <div className="p-6">
              <AdvancedThemeEditor />
            </div>
          )}

          {activeMode === 'pro' && (
            <div className="p-6">
              <AdvancedCustomizer />
            </div>
          )}
        </div>

        {/* شريط الأدوات السفلي المحسن */}
        <div className="bg-gray-50 border-t p-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Button size="sm" variant="outline">تراجع</Button>
              <Button size="sm" variant="outline">إعادة</Button>
              <Button size="sm" variant="outline">نسخ الستايل</Button>
              <Button size="sm" variant="outline">لصق الستايل</Button>
            </div>
            
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Button size="sm" variant="outline">معاينة شاملة</Button>
              <Button size="sm" variant="outline">تصدير المشروع</Button>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-green-500 to-blue-500"
                onClick={saveSettings}
              >
                حفظ جميع التغييرات
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UIControlPanel;
