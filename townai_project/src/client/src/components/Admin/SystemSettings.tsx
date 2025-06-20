
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, Database, Mail, Shield } from 'lucide-react';
import { toast } from 'sonner';

const SystemSettings = () => {
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['system-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('system_settings')
        .select('*')
        .order('category');
      if (error) throw error;
      return data;
    }
  });

  const updateSetting = useMutation({
    mutationFn: async ({ id, value }: { id: string; value: string }) => {
      const { error } = await supabase
        .from('system_settings')
        .update({ 
          value, 
          updated_at: new Date().toISOString(),
          updated_by: (await supabase.auth.getUser()).data.user?.id 
        })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['system-settings'] });
      toast.success('تم تحديث الإعداد بنجاح');
    }
  });

  const groupedSettings = settings?.reduce((acc, setting) => {
    if (!acc[setting.category]) {
      acc[setting.category] = [];
    }
    acc[setting.category].push(setting);
    return acc;
  }, {} as Record<string, any[]>) || {};

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'dashboard': return <Settings className="h-5 w-5" />;
      case 'security': return <Shield className="h-5 w-5" />;
      case 'notifications': return <Mail className="h-5 w-5" />;
      case 'performance': return <Database className="h-5 w-5" />;
      default: return <Settings className="h-5 w-5" />;
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'dashboard': return 'إعدادات لوحة التحكم';
      case 'security': return 'إعدادات الأمان';
      case 'notifications': return 'إعدادات الإشعارات';
      case 'performance': return 'إعدادات الأداء';
      case 'reports': return 'إعدادات التقارير';
      default: return 'إعدادات عامة';
    }
  };

  const handleSettingChange = (setting: any, value: string) => {
    updateSetting.mutate({ id: setting.id, value });
  };

  if (isLoading) {
    return <div className="p-8 text-center">جاري تحميل الإعدادات...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">إعدادات النظام</h1>

      <div className="grid gap-6">
        {Object.entries(groupedSettings).map(([category, categorySettings]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getCategoryIcon(category)}
                {getCategoryTitle(category)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categorySettings.map((setting) => (
                <div key={setting.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <Label className="font-medium">{setting.key}</Label>
                    <p className="text-sm text-gray-600">{setting.description}</p>
                  </div>
                  <div className="w-48">
                    {setting.data_type === 'boolean' ? (
                      <Switch
                        checked={setting.value === 'true'}
                        onCheckedChange={(checked) => 
                          handleSettingChange(setting, checked ? 'true' : 'false')
                        }
                      />
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          type={setting.data_type === 'number' ? 'number' : 'text'}
                          value={setting.value || ''}
                          onChange={(e) => handleSettingChange(setting, e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>معلومات النظام</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>إصدار النظام</Label>
            <p className="text-lg font-semibold">1.0.0</p>
          </div>
          <div>
            <Label>آخر تحديث</Label>
            <p className="text-lg font-semibold">{new Date().toLocaleDateString('ar-SA')}</p>
          </div>
          <div>
            <Label>حالة النظام</Label>
            <p className="text-lg font-semibold text-green-600">يعمل بشكل طبيعي</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettings;
