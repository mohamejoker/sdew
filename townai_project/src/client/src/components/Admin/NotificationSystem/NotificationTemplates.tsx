
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const NotificationTemplates = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>قوالب الإشعارات</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-gray-500 py-8">
          ستتم إضافة قوالب الإشعارات قريباً
        </p>
      </CardContent>
    </Card>
  );
};

export default NotificationTemplates;
