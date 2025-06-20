
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Edit, Trash2, CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { Notification } from './types';

interface NotificationsTableProps {
  notifications: Notification[];
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    case 'error': return <X className="h-4 w-4 text-red-600" />;
    default: return <Info className="h-4 w-4 text-blue-600" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'sent': return <Badge variant="default">مُرسل</Badge>;
    case 'scheduled': return <Badge variant="secondary">مجدول</Badge>;
    default: return <Badge variant="outline">مسودة</Badge>;
  }
};

const NotificationsTable: React.FC<NotificationsTableProps> = ({ notifications }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>الإشعارات المرسلة والمجدولة</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>العنوان</TableHead>
              <TableHead className="hidden md:table-cell">النوع</TableHead>
              <TableHead className="hidden md:table-cell">المستلمين</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead className="hidden lg:table-cell">تاريخ الإنشاء</TableHead>
              <TableHead className="hidden lg:table-cell">المجدولة</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow key={notification.id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="font-medium">{notification.title}</div>
                  <div className="text-sm text-gray-500 max-w-xs truncate hidden sm:block">
                    {notification.message}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    {getTypeIcon(notification.type)}
                    <span className="capitalize">{notification.type}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{notification.recipients}</TableCell>
                <TableCell>{getStatusBadge(notification.status)}</TableCell>
                <TableCell className="hidden lg:table-cell">{notification.createdAt}</TableCell>
                <TableCell className="hidden lg:table-cell">{notification.scheduledAt || '—'}</TableCell>
                <TableCell className="text-left">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default NotificationsTable;
