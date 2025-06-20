
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, Key, Lock, Eye } from 'lucide-react';
import { toast } from 'sonner';

const SecurityPanel = () => {
  const queryClient = useQueryClient();
  const [selectedLog, setSelectedLog] = useState<any>(null);

  const { data: securityLogs } = useQuery({
    queryKey: ['security-logs'],
    queryFn: async () => {
      const { data } = await supabase
        .from('activity_logs')
        .select('*')
        .in('action_type', ['login', 'logout', 'failed_login', 'password_change'])
        .order('created_at', { ascending: false })
        .limit(50);
      return data;
    }
  });

  const { data: systemSettings } = useQuery({
    queryKey: ['security-settings'],
    queryFn: async () => {
      const { data } = await supabase
        .from('system_settings')
        .select('*')
        .eq('category', 'security');
      return data;
    }
  });

  const updateSetting = useMutation({
    mutationFn: async ({ id, value }: { id: string; value: string }) => {
      const { error } = await supabase
        .from('system_settings')
        .update({ value, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['security-settings'] });
      toast.success('تم تحديث الإعدادات بنجاح');
    }
  });

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'login': return <Badge className="bg-green-100 text-green-800">تسجيل دخول</Badge>;
      case 'logout': return <Badge className="bg-blue-100 text-blue-800">تسجيل خروج</Badge>;
      case 'failed_login': return <Badge className="bg-red-100 text-red-800">فشل تسجيل دخول</Badge>;
      case 'password_change': return <Badge className="bg-orange-100 text-orange-800">تغيير كلمة مرور</Badge>;
      default: return <Badge variant="outline">{action}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold">لوحة الأمان</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              إعدادات الأمان
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemSettings?.map((setting) => (
              <div key={setting.id} className="flex justify-between items-center">
                <span className="text-sm">{setting.description}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => updateSetting.mutate({ 
                    id: setting.id, 
                    value: setting.value === 'true' ? 'false' : 'true' 
                  })}
                >
                  {setting.value === 'true' ? <Lock className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              تنبيهات أمنية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">محاولات تسجيل دخول فاشلة اليوم</div>
              <div className="text-2xl font-bold text-red-600">
                {securityLogs?.filter(log => 
                  log.action_type === 'failed_login' && 
                  new Date(log.created_at).toDateString() === new Date().toDateString()
                ).length || 0}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>آخر نشاط</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">
              {securityLogs?.[0] ? 
                `آخر نشاط: ${new Date(securityLogs[0].created_at).toLocaleString('ar-SA')}` : 
                'لا توجد أنشطة'
              }
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>سجل الأنشطة الأمنية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {securityLogs?.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getActionBadge(log.action_type)}
                  <div>
                    <div className="font-medium">{log.description || 'نشاط أمني'}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(log.created_at).toLocaleString('ar-SA')}
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSelectedLog(log)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityPanel;
