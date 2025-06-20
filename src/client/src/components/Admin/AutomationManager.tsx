
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Zap, Plus, Play, Pause, Settings, 
  Clock, Mail, Webhook, Bell 
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const AutomationManager = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRule, setNewRule] = useState({
    name: '',
    description: '',
    trigger_type: 'event',
    trigger_config: {},
    action_type: 'notification',
    action_config: {}
  });

  const queryClient = useQueryClient();

  const { data: automationRules = [] } = useQuery({
    queryKey: ['automation-rules'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('automation_rules')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const { data: executions = [] } = useQuery({
    queryKey: ['automation-executions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('automation_executions')
        .select(`
          *,
          automation_rules(name)
        `)
        .order('executed_at', { ascending: false })
        .limit(10);
      if (error) throw error;
      return data;
    }
  });

  const createRule = useMutation({
    mutationFn: async (rule: any) => {
      const { data, error } = await supabase
        .from('automation_rules')
        .insert([{
          ...rule,
          created_by: (await supabase.auth.getUser()).data.user?.id
        }]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['automation-rules'] });
      setShowCreateForm(false);
      setNewRule({
        name: '',
        description: '',
        trigger_type: 'event',
        trigger_config: {},
        action_type: 'notification',
        action_config: {}
      });
    }
  });

  const toggleRule = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from('automation_rules')
        .update({ is_active: !is_active })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['automation-rules'] });
    }
  });

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'email': return Mail;
      case 'notification': return Bell;
      case 'webhook': return Webhook;
      default: return Zap;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
              <Zap className="h-6 w-6 text-white" />
            </div>
            إدارة الأتمتة
          </h1>
          <p className="text-gray-600 mt-2">أتمتة العمليات والمهام المتكررة</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          قاعدة جديدة
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">القواعد النشطة</p>
                <p className="text-3xl font-bold text-gray-900">
                  {automationRules.filter(r => r.is_active).length}
                </p>
              </div>
              <Zap className="h-8 w-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي التنفيذات</p>
                <p className="text-3xl font-bold text-gray-900">
                  {automationRules.reduce((sum, r) => sum + (r.execution_count || 0), 0)}
                </p>
              </div>
              <Play className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">نجح اليوم</p>
                <p className="text-3xl font-bold text-gray-900">
                  {executions.filter(e => e.status === 'completed').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">فشل اليوم</p>
                <p className="text-3xl font-bold text-gray-900">
                  {executions.filter(e => e.status === 'failed').length}
                </p>
              </div>
              <Pause className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>إنشاء قاعدة أتمتة جديدة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اسم القاعدة</label>
                <Input
                  value={newRule.name}
                  onChange={(e) => setNewRule(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="مثال: إرسال تنبيه عند مستخدم جديد"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نوع المشغل</label>
                <select
                  value={newRule.trigger_type}
                  onChange={(e) => setNewRule(prev => ({ ...prev, trigger_type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="event">حدث</option>
                  <option value="schedule">جدولة</option>
                  <option value="condition">شرط</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
              <Textarea
                value={newRule.description}
                onChange={(e) => setNewRule(prev => ({ ...prev, description: e.target.value }))}
                placeholder="وصف موجز لما تفعله هذه القاعدة"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نوع الإجراء</label>
                <select
                  value={newRule.action_type}
                  onChange={(e) => setNewRule(prev => ({ ...prev, action_type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="notification">إشعار</option>
                  <option value="email">بريد إلكتروني</option>
                  <option value="webhook">Webhook</option>
                  <option value="update_status">تحديث الحالة</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => createRule.mutate(newRule)}
                disabled={!newRule.name || createRule.isPending}
              >
                إنشاء القاعدة
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                إلغاء
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rules List */}
      <Card>
        <CardHeader>
          <CardTitle>قواعد الأتمتة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {automationRules.map((rule) => {
              const ActionIcon = getActionIcon(rule.action_type);
              return (
                <div key={rule.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <ActionIcon className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{rule.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{rule.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="outline">
                            {rule.trigger_type === 'event' ? 'حدث' : 
                             rule.trigger_type === 'schedule' ? 'جدولة' : 'شرط'}
                          </Badge>
                          <Badge variant="outline">
                            {rule.action_type === 'notification' ? 'إشعار' :
                             rule.action_type === 'email' ? 'بريد' :
                             rule.action_type === 'webhook' ? 'Webhook' : rule.action_type}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            تم التنفيذ {rule.execution_count || 0} مرة
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={rule.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {rule.is_active ? 'نشط' : 'معطل'}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => toggleRule.mutate({ id: rule.id, is_active: rule.is_active })}
                      >
                        {rule.is_active ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Executions */}
      <Card>
        <CardHeader>
          <CardTitle>آخر التنفيذات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">القاعدة</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">الحالة</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">وقت التنفيذ</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">المدة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {executions.map((execution) => (
                  <tr key={execution.id}>
                    <td className="px-4 py-3">{execution.automation_rules?.name}</td>
                    <td className="px-4 py-3">
                      <Badge className={getStatusColor(execution.status)}>
                        {execution.status === 'completed' ? 'مكتمل' : 
                         execution.status === 'failed' ? 'فشل' : 
                         execution.status === 'running' ? 'قيد التنفيذ' : execution.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(execution.executed_at).toLocaleString('ar-SA')}
                    </td>
                    <td className="px-4 py-3">
                      {execution.execution_time_ms ? `${execution.execution_time_ms}ms` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomationManager;
