
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Key, Eye, EyeOff, CheckCircle, AlertCircle, 
  Trash2, Plus, Settings, BarChart3 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiKeyService, type APIKey } from '@/services/apiKeyService';

const AdvancedAPISettings = () => {
  const [apiKeys, setApiKeys] = useState<Omit<APIKey, 'key'>[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newKeyData, setNewKeyData] = useState({
    name: '',
    service: 'openai' as APIKey['service'],
    key: ''
  });
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const services = [
    { value: 'openai', label: 'OpenAI', color: 'bg-green-500' },
    { value: 'google', label: 'Google AI', color: 'bg-blue-500' },
    { value: 'instagram', label: 'Instagram', color: 'bg-pink-500' },
    { value: 'tiktok', label: 'TikTok', color: 'bg-black' },
    { value: 'youtube', label: 'YouTube', color: 'bg-red-500' },
    { value: 'twitter', label: 'Twitter/X', color: 'bg-sky-500' },
    { value: 'facebook', label: 'Facebook', color: 'bg-blue-600' }
  ];

  useEffect(() => {
    loadApiKeys();
  }, []);

  const loadApiKeys = () => {
    const keys = apiKeyService.getAllKeys();
    setApiKeys(keys);
  };

  const handleAddApiKey = () => {
    if (!newKeyData.name.trim() || !newKeyData.key.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    try {
      apiKeyService.addApiKey(newKeyData.name, newKeyData.service, newKeyData.key);
      loadApiKeys();
      setShowAddForm(false);
      setNewKeyData({ name: '', service: 'openai', key: '' });
      
      toast({
        title: "تم بنجاح",
        description: "تم إضافة مفتاح API بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في إضافة مفتاح API",
        variant: "destructive"
      });
    }
  };

  const handleDeleteKey = (id: string) => {
    try {
      apiKeyService.deleteKey(id);
      loadApiKeys();
      toast({
        title: "تم الحذف",
        description: "تم حذف مفتاح API",
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في حذف مفتاح API",
        variant: "destructive"
      });
    }
  };

  const handleToggleStatus = (id: string, isActive: boolean) => {
    try {
      apiKeyService.updateKeyStatus(id, isActive);
      loadApiKeys();
      toast({
        title: "تم التحديث",
        description: `تم ${isActive ? 'تفعيل' : 'إلغاء تفعيل'} مفتاح API`,
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في تحديث حالة مفتاح API",
        variant: "destructive"
      });
    }
  };

  const toggleKeyVisibility = (id: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(id)) {
      newVisible.delete(id);
    } else {
      newVisible.add(id);
    }
    setVisibleKeys(newVisible);
  };

  const getServiceInfo = (service: string) => {
    return services.find(s => s.value === service) || services[0];
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">إدارة مفاتيح API</h2>
          <p className="text-gray-600 mt-2">إدارة وتتبع جميع مفاتيح API الخاصة بك</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          إضافة مفتاح جديد
        </Button>
      </div>

      <Tabs defaultValue="keys" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="keys">المفاتيح</TabsTrigger>
          <TabsTrigger value="usage">الاستخدام</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        <TabsContent value="keys">
          {showAddForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>إضافة مفتاح API جديد</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="keyName">اسم المفتاح</Label>
                    <Input
                      id="keyName"
                      value={newKeyData.name}
                      onChange={(e) => setNewKeyData({ ...newKeyData, name: e.target.value })}
                      placeholder="مثل: OpenAI Production"
                    />
                  </div>
                  <div>
                    <Label htmlFor="service">الخدمة</Label>
                    <select
                      id="service"
                      value={newKeyData.service}
                      onChange={(e) => setNewKeyData({ ...newKeyData, service: e.target.value as APIKey['service'] })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      {services.map(service => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="apiKey">مفتاح API</Label>
                    <Input
                      id="apiKey"
                      type="password"
                      value={newKeyData.key}
                      onChange={(e) => setNewKeyData({ ...newKeyData, key: e.target.value })}
                      placeholder="sk-..."
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleAddApiKey}>
                    إضافة المفتاح
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 gap-4">
            {apiKeys.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Key className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد مفاتيح API</h3>
                  <p className="text-gray-600 mb-4">ابدأ بإضافة مفتاح API الأول لتفعيل الميزات المتقدمة</p>
                  <Button onClick={() => setShowAddForm(true)}>
                    إضافة مفتاح API
                  </Button>
                </CardContent>
              </Card>
            ) : (
              apiKeys.map((key) => {
                const serviceInfo = getServiceInfo(key.service);
                return (
                  <Card key={key.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-lg ${serviceInfo.color} flex items-center justify-center`}>
                            <Key className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{key.name}</h3>
                            <p className="text-gray-600">{serviceInfo.label}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant={key.isActive ? "default" : "secondary"}>
                                {key.isActive ? 'نشط' : 'معطل'}
                              </Badge>
                              {key.lastUsed && (
                                <span className="text-xs text-gray-500">
                                  آخر استخدام: {new Date(key.lastUsed).toLocaleDateString('ar')}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-sm text-gray-600">مرات الاستخدام</p>
                            <p className="text-2xl font-bold">{key.usageCount}</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={key.isActive}
                              onCheckedChange={(checked) => handleToggleStatus(key.id, checked)}
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => toggleKeyVisibility(key.id)}
                            >
                              {visibleKeys.has(key.id) ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleDeleteKey(key.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {key.dailyLimit && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">
                            الحد اليومي: {key.usageCount} / {key.dailyLimit}
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${Math.min((key.usageCount / key.dailyLimit) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>

        <TabsContent value="usage">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Key className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">إجمالي المفاتيح</p>
                    <p className="text-2xl font-bold">{apiKeys.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">المفاتيح النشطة</p>
                    <p className="text-2xl font-bold">{apiKeys.filter(k => k.isActive).length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">إجمالي الاستخدام</p>
                    <p className="text-2xl font-bold">{apiKeys.reduce((sum, k) => sum + k.usageCount, 0)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">الخدمات المتصلة</p>
                    <p className="text-2xl font-bold">{new Set(apiKeys.map(k => k.service)).size}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الأمان</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  جميع مفاتيح API يتم تشفيرها وحفظها محلياً في متصفحك فقط. لا يتم إرسال أي مفاتيح إلى خوادمنا.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">تشفير محسن</h4>
                    <p className="text-sm text-gray-600">استخدام تشفير AES-256 لحماية المفاتيح</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">تحديد الاستخدام</h4>
                    <p className="text-sm text-gray-600">إنشاء حدود يومية وشهرية للاستخدام</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">تنبيهات الأمان</h4>
                    <p className="text-sm text-gray-600">تلقي تنبيهات عند الاستخدام المشبوه</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAPISettings;
