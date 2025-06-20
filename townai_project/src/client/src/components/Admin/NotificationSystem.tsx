
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Send, Users, AlertCircle, CheckCircle, Plus } from 'lucide-react';
import { toast } from 'sonner';

const NotificationSystem = () => {
  const queryClient = useQueryClient();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'info',
    priority: 'medium',
    recipient_id: ''
  });

  const { data: notifications } = useQuery({
    queryKey: ['admin-notifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      if (error) throw error;
      return data;
    }
  });

  const { data: users } = useQuery({
    queryKey: ['notification-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email');
      if (error) throw error;
      return data;
    }
  });

  const createNotification = useMutation({
    mutationFn: async (notification: any) => {
      const { error } = await supabase
        .from('notifications')
        .insert([notification]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-notifications'] });
      toast.success('تم إرسال الإشعار بنجاح');
      setShowCreateForm(false);
      setNewNotification({
        title: '',
        message: '',
        type: 'info',
        priority: 'medium',
        recipient_id: ''
      });
    }
  });

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'success': return <Badge className="bg-green-100 text-green-800">نجاح</Badge>;
      case 'warning': return <Badge className="bg-yellow-100 text-yellow-800">تحذير</Badge>;
      case 'error': return <Badge className="bg-red-100 text-red-800">خطأ</Badge>;
      default: return <Badge className="bg-blue-100 text-blue-800">معلومات</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent': return <Badge className="bg-red-100 text-red-800">عاجل</Badge>;
      case 'high': return <Badge className="bg-orange-100 text-orange-800">عالي</Badge>;
      case 'low': return <Badge className="bg-gray-100 text-gray-800">منخفض</Badge>;
      default: return <Badge variant="outline">متوسط</Badge>;
    }
  };

  const handleCreateNotification = () => {
    if (!newNotification.title || !newNotification.message) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    createNotification.mutate({
      ...newNotification,
      recipient_id: newNotification.recipient_id || null,
      is_system: !newNotification.recipient_id
    });
  };

  const notificationStats = {
    total: notifications?.length || 0,
    unread: notifications?.filter(n => !n.is_read).length || 0,
    system: notifications?.filter(n => n.is_system).length || 0,
    user: notifications?.filter(n => !n.is_system).length || 0
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold">نظام الإشعارات</h1>
        </div>
        <Button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-gradient-to-r from-blue-500 to-purple-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          إشعار جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">إجمالي الإشعارات</p>
                <p className="text-2xl font-bold">{notificationStats.total}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">غير مقروءة</p>
                <p className="text-2xl font-bold text-red-600">{notificationStats.unread}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">إشعارات النظام</p>
                <p className="text-2xl font-bold text-purple-600">{notificationStats.system}</p>
              </div>
              <Send className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">إشعارات المستخدمين</p>
                <p className="text-2xl font-bold text-green-600">{notificationStats.user}</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>إنشاء إشعار جديد</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">عنوان الإشعار</label>
                <Input
                  value={newNotification.title}
                  onChange={(e) => setNewNotification(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="عنوان الإشعار..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">المستلم</label>
                <Select
                  value={newNotification.recipient_id}
                  onValueChange={(value) => setNewNotification(prev => ({ ...prev, recipient_id: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المستلم (فارغ = جميع المستخدمين)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">جميع المستخدمين</SelectItem>
                    {users?.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.full_name || user.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">نوع الإشعار</label>
                <Select
                  value={newNotification.type}
                  onValueChange={(value) => setNewNotification(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">معلومات</SelectItem>
                    <SelectItem value="success">نجاح</SelectItem>
                    <SelectItem value="warning">تحذير</SelectItem>
                    <SelectItem value="error">خطأ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">الأولوية</label>
                <Select
                  value={newNotification.priority}
                  onValueChange={(value) => setNewNotification(prev => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">منخفض</SelectItem>
                    <SelectItem value="medium">متوسط</SelectItem>
                    <SelectItem value="high">عالي</SelectItem>
                    <SelectItem value="urgent">عاجل</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">رسالة الإشعار</label>
              <Textarea
                value={newNotification.message}
                onChange={(e) => setNewNotification(prev => ({ ...prev, message: e.target.value }))}
                placeholder="اكتب رسالة الإشعار هنا..."
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreateNotification} disabled={createNotification.isPending}>
                <Send className="h-4 w-4 mr-2" />
                إرسال الإشعار
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                إلغاء
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>سجل الإشعارات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications?.map((notification) => (
              <div key={notification.id} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{notification.title}</h3>
                    {getTypeBadge(notification.type)}
                    {getPriorityBadge(notification.priority)}
                    {notification.is_system && <Badge variant="outline">نظام</Badge>}
                  </div>
                  <p className="text-gray-600 mb-2">{notification.message}</p>
                  <div className="text-sm text-gray-500">
                    {new Date(notification.created_at).toLocaleString('ar-SA')}
                    {!notification.is_read && (
                      <span className="ml-2 text-red-500">• غير مقروء</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {notification.is_read ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSystem;
