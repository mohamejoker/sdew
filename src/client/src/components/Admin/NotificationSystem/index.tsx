
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Notification } from './types';
import NotificationHeader from './NotificationHeader';
import NotificationStats from './NotificationStats';
import NotificationForm from './NotificationForm';
import NotificationsTable from './NotificationsTable';
import NotificationTemplates from './NotificationTemplates';
import NotificationSettings from './NotificationSettings';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'تحديث النظام',
      message: 'تم تحديث النظام بنجاح مع إضافة ميزات جديدة',
      type: 'success',
      recipients: 1234,
      status: 'sent',
      createdAt: '2024-01-15 14:30'
    },
    {
      id: '2',
      title: 'عرض خاص',
      message: 'خصم 20% على جميع الخدمات لفترة محدودة',
      type: 'info',
      recipients: 856,
      status: 'scheduled',
      createdAt: '2024-01-15 13:00',
      scheduledAt: '2024-01-16 09:00'
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);

  const handleCreateNotification = (data: Omit<Notification, 'id' | 'recipients' | 'status' | 'createdAt'>) => {
    const notification: Notification = {
      id: Date.now().toString(),
      ...data,
      recipients: 0,
      status: data.scheduledAt ? 'scheduled' : 'draft',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setNotifications([notification, ...notifications]);
    setIsCreating(false);
  };

  return (
    <div className="space-y-8">
      <NotificationHeader isCreating={isCreating} setIsCreating={setIsCreating} />
      
      <NotificationStats />

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm p-1">
          <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg">الإشعارات</TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg">القوالب</TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg">الإعدادات</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          {isCreating && (
            <NotificationForm 
              onCreate={handleCreateNotification} 
              onCancel={() => setIsCreating(false)} 
            />
          )}
          <NotificationsTable notifications={notifications} />
        </TabsContent>

        <TabsContent value="templates">
          <NotificationTemplates />
        </TabsContent>

        <TabsContent value="settings">
          <NotificationSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationSystem;
