
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAppState } from '@/components/Common/StateManager';
import { useNotification } from '@/components/Common/NotificationSystem';
import { configManager } from '@/services/config/configManager';
import { Settings, Globe, Bell, Palette, Shield, Database, Code, Download, Upload, RefreshCw } from 'lucide-react';

const AdvancedSettingsPanel = () => {
  const { state, dispatch } = useAppState();
  const { success, error } = useNotification();
  const [isExporting, setIsExporting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handlePreferenceChange = useCallback((key: string, value: any) => {
    configManager.set(key, value);
    dispatch({ type: 'UPDATE_PREFERENCES', payload: { [key]: value } });
    success('تم الحفظ', 'تم تحديث الإعدادات بنجاح');
  }, [dispatch, success]);

  const exportSettings = useCallback(async () => {
    setIsExporting(true);
    try {
      const settings = {
        userPreferences: state.userPreferences,
        timestamp: new Date().toISOString(),
        version: '1.0'
      };
      
      const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `townmedia-settings-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      success('تم التصدير', 'تم تصدير الإعدادات بنجاح');
    } catch (err) {
      error('خطأ في التصدير', 'فشل في تصدير الإعدادات');
    }
    setIsExporting(false);
  }, [state.userPreferences, success, error]);

  const resetSettings = useCallback(async () => {
    setIsResetting(true);
    try {
      // إعادة تعيين الإعدادات للقيم الافتراضية
      const defaultPreferences = {
        theme: 'auto' as const,
        language: 'ar' as const,
        notifications: true
      };
      
      Object.entries(defaultPreferences).forEach(([key, value]) => {
        configManager.set(key, value);
      });
      
      dispatch({ type: 'UPDATE_PREFERENCES', payload: defaultPreferences });
      success('تم الإعادة', 'تم إعادة تعيين الإعدادات للقيم الافتراضية');
    } catch (err) {
      error('خطأ في الإعادة', 'فشل في إعادة تعيين الإعدادات');
    }
    setIsResetting(false);
  }, [dispatch, success, error]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Settings className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold">الإعدادات المتقدمة</h1>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          v2.0
        </Badge>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">عام</TabsTrigger>
          <TabsTrigger value="appearance">المظهر</TabsTrigger>
          <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="advanced">متقدم</TabsTrigger>
        </TabsList>

        {/* الإعدادات العامة */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                اللغة والمنطقة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>اللغة الافتراضية</Label>
                <Select
                  value={state.userPreferences.language}
                  onValueChange={(value) => handlePreferenceChange('language', value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ar">العربية</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>الحفظ التلقائي</Label>
                  <p className="text-sm text-gray-600">حفظ الإعدادات تلقائياً</p>
                </div>
                <Switch
                  checked={configManager.get('autoSave', true)}
                  onCheckedChange={(checked) => handlePreferenceChange('autoSave', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* إعدادات المظهر */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                المظهر والثيم
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>نمط العرض</Label>
                <Select
                  value={state.userPreferences.theme}
                  onValueChange={(value) => handlePreferenceChange('theme', value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">فاتح</SelectItem>
                    <SelectItem value="dark">مظلم</SelectItem>
                    <SelectItem value="auto">تلقائي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>الرسوم المتحركة</Label>
                  <p className="text-sm text-gray-600">تفعيل التأثيرات البصرية</p>
                </div>
                <Switch
                  checked={configManager.get('animations', true)}
                  onCheckedChange={(checked) => handlePreferenceChange('animations', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* إعدادات الإشعارات */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                إعدادات الإشعارات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>الإشعارات العامة</Label>
                  <p className="text-sm text-gray-600">تلقي إشعارات النظام</p>
                </div>
                <Switch
                  checked={state.userPreferences.notifications}
                  onCheckedChange={(checked) => handlePreferenceChange('notifications', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>إشعارات الأمان</Label>
                  <p className="text-sm text-gray-600">تنبيهات الأمان والحماية</p>
                </div>
                <Switch
                  checked={configManager.get('securityNotifications', true)}
                  onCheckedChange={(checked) => handlePreferenceChange('securityNotifications', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* إعدادات API */}
        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                حالة مفاتيح API
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{state.apiStatus.activeProviders}</div>
                  <div className="text-sm text-gray-600">مفاتيح نشطة</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">{state.apiStatus.totalProviders}</div>
                  <div className="text-sm text-gray-600">إجمالي المزودين</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className={`text-2xl font-bold ${state.apiStatus.hasValidAPI ? 'text-green-600' : 'text-red-600'}`}>
                    {state.apiStatus.hasValidAPI ? '✓' : '✗'}
                  </div>
                  <div className="text-sm text-gray-600">الحالة العامة</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الإعدادات المتقدمة */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                إدارة البيانات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Button
                  onClick={exportSettings}
                  disabled={isExporting}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  {isExporting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                  تصدير الإعدادات
                </Button>
                
                <Button
                  onClick={resetSettings}
                  disabled={isResetting}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  {isResetting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                  إعادة تعيين
                </Button>
              </div>
              
              <Separator />
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">تحذير</h4>
                <p className="text-sm text-yellow-700">
                  إعادة تعيين الإعدادات ستحذف جميع التخصيصات الحالية وتعيد النظام للإعدادات الافتراضية.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedSettingsPanel;
