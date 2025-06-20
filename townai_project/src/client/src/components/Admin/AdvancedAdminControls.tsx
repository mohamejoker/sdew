
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Database, 
  Shield, 
  Zap, 
  Mail, 
  Bell,
  FileText,
  Users,
  Activity
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdvancedAdminControls = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    userRegistration: true,
    emailNotifications: true,
    pushNotifications: false,
    autoBackup: true,
    debugMode: false,
    apiRateLimit: 1000,
    maxFileSize: 10,
    sessionTimeout: 30
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "تم تحديث الإعداد",
      description: `تم تغيير ${key} بنجاح`,
    });
  };

  const handleSystemAction = (action: string) => {
    toast({
      title: "تم تنفيذ العملية",
      description: `تم ${action} بنجاح`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">التحكم المتقدم في النظام</h2>
        <Button variant="outline">
          <Activity className="h-4 w-4 mr-2" />
          مراقبة النظام
        </Button>
      </div>

      <Tabs defaultValue="system" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="system">النظام</TabsTrigger>
          <TabsTrigger value="security">الأمان</TabsTrigger>
          <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
          <TabsTrigger value="database">قاعدة البيانات</TabsTrigger>
          <TabsTrigger value="users">المستخدمين</TabsTrigger>
        </TabsList>

        <TabsContent value="system">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  إعدادات النظام
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <label>وضع الصيانة</label>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => 
                      handleSettingChange('maintenanceMode', checked)
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label>تسجيل المستخدمين الجدد</label>
                  <Switch
                    checked={settings.userRegistration}
                    onCheckedChange={(checked) => 
                      handleSettingChange('userRegistration', checked)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label>حد معدل API (طلب/دقيقة)</label>
                  <Input
                    type="number"
                    value={settings.apiRateLimit}
                    onChange={(e) => 
                      handleSettingChange('apiRateLimit', parseInt(e.target.value))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label>الحد الأقصى لحجم الملف (MB)</label>
                  <Input
                    type="number"
                    value={settings.maxFileSize}
                    onChange={(e) => 
                      handleSettingChange('maxFileSize', parseInt(e.target.value))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  عمليات النظام
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full" 
                  onClick={() => handleSystemAction('تنظيف ذاكرة التخزين المؤقت')}
                >
                  تنظيف Cache
                </Button>
                
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => handleSystemAction('إعادة تشغيل الخدمات')}
                >
                  إعادة تشغيل الخدمات
                </Button>
                
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => handleSystemAction('تحليل الأداء')}
                >
                  تحليل الأداء
                </Button>
                
                <Button 
                  className="w-full" 
                  variant="destructive"
                  onClick={() => handleSystemAction('إنشاء نسخة احتياطية طارئة')}
                >
                  نسخة احتياطية طارئة
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                إعدادات الأمان
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <label>وضع التطوير</label>
                <Switch
                  checked={settings.debugMode}
                  onCheckedChange={(checked) => 
                    handleSettingChange('debugMode', checked)
                  }
                />
              </div>

              <div className="space-y-2">
                <label>مهلة انتهاء الجلسة (دقيقة)</label>
                <Input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => 
                    handleSettingChange('sessionTimeout', parseInt(e.target.value))
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button onClick={() => handleSystemAction('فحص الثغرات الأمنية')}>
                  فحص الأمان
                </Button>
                <Button onClick={() => handleSystemAction('تحديث شهادات SSL')}>
                  تحديث SSL
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                إعدادات الإشعارات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <label>إشعارات البريد الإلكتروني</label>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => 
                    handleSettingChange('emailNotifications', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <label>الإشعارات الفورية</label>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => 
                    handleSettingChange('pushNotifications', checked)
                  }
                />
              </div>

              <Button 
                className="w-full"
                onClick={() => handleSystemAction('إرسال إشعار تجريبي')}
              >
                <Mail className="h-4 w-4 mr-2" />
                إرسال إشعار تجريبي
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                إدارة قاعدة البيانات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <label>النسخ الاحتياطي التلقائي</label>
                <Switch
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) => 
                    handleSettingChange('autoBackup', checked)
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button onClick={() => handleSystemAction('تحسين قاعدة البيانات')}>
                  تحسين DB
                </Button>
                <Button onClick={() => handleSystemAction('فحص سلامة البيانات')}>
                  فحص السلامة
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                إدارة المستخدمين المتقدمة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button onClick={() => handleSystemAction('تنظيف الحسابات غير المفعلة')}>
                  تنظيف الحسابات
                </Button>
                <Button onClick={() => handleSystemAction('إرسال تذكير التفعيل')}>
                  تذكير التفعيل
                </Button>
                <Button onClick={() => handleSystemAction('تحليل سلوك المستخدمين')}>
                  تحليل السلوك
                </Button>
                <Button onClick={() => handleSystemAction('إنشاء تقرير المستخدمين')}>
                  تقرير شامل
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAdminControls;
