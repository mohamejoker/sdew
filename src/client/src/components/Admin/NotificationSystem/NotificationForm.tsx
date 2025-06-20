
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Notification } from './types';

type NewNotificationData = Omit<Notification, 'id' | 'recipients' | 'status' | 'createdAt'>;

interface NotificationFormProps {
  onCreate: (data: NewNotificationData) => void;
  onCancel: () => void;
}

const NotificationForm: React.FC<NotificationFormProps> = ({ onCreate, onCancel }) => {
  const [newNotification, setNewNotification] = useState<NewNotificationData>({
    title: '',
    message: '',
    type: 'info',
    scheduledAt: ''
  });

  const handleCreate = () => {
    onCreate(newNotification);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>إنشاء إشعار جديد</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">عنوان الإشعار</Label>
            <Input
              id="title"
              value={newNotification.title}
              onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
              placeholder="أدخل عنوان الإشعار"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">نوع الإشعار</Label>
            <select
              id="type"
              className="w-full p-2 border rounded-lg bg-white"
              value={newNotification.type}
              onChange={(e) => setNewNotification({ ...newNotification, type: e.target.value as Notification['type'] })}
            >
              <option value="info">معلومات</option>
              <option value="success">نجاح</option>
              <option value="warning">تحذير</option>
              <option value="error">خطأ</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">نص الإشعار</Label>
          <Textarea
            id="message"
            value={newNotification.message}
            onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
            placeholder="أدخل نص الإشعار"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="schedule">جدولة الإرسال (اختياري)</Label>
          <Input
            id="schedule"
            type="datetime-local"
            value={newNotification.scheduledAt}
            onChange={(e) => setNewNotification({ ...newNotification, scheduledAt: e.target.value })}
          />
        </div>

        <div className="flex space-x-2 rtl:space-x-reverse">
          <Button onClick={handleCreate}>
            إنشاء الإشعار
          </Button>
          <Button variant="outline" onClick={onCancel}>
            إلغاء
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationForm;
