
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, User, Calendar, DollarSign } from 'lucide-react';

interface Order {
  id: string;
  service_id: string;
  link: string;
  quantity: number;
  original_price: number;
  final_price: number;
  profit: number;
  status: string;
  created_at: string;
  user_profile?: {
    full_name?: string;
    email?: string;
  };
}

interface OrdersListProps {
  orders: Order[];
}

const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'معلق';
      case 'processing':
        return 'قيد المعالجة';
      case 'completed':
        return 'مكتمل';
      case 'cancelled':
        return 'ملغي';
      default:
        return status;
    }
  };

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-500">لا توجد طلبات للعرض</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {orders.map((order) => (
        <Card key={order.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">
                طلب #{order.id.slice(0, 8)}
              </CardTitle>
              <Badge className={getStatusColor(order.status)}>
                {getStatusText(order.status)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span>العميل</span>
                </div>
                <p className="font-medium">
                  {order.user_profile?.full_name || 'غير محدد'}
                </p>
                <p className="text-sm text-gray-500">
                  {order.user_profile?.email || ''}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ExternalLink className="h-4 w-4" />
                  <span>الرابط</span>
                </div>
                <a 
                  href={order.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm break-all"
                >
                  {order.link}
                </a>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="h-4 w-4" />
                  <span>المبلغ</span>
                </div>
                <p className="font-medium">{order.final_price} ر.س</p>
                <p className="text-sm text-green-600">
                  ربح: {order.profit} ر.س
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>التاريخ</span>
                </div>
                <p className="text-sm">
                  {new Date(order.created_at).toLocaleDateString('ar-SA')}
                </p>
                <p className="text-xs text-gray-500">
                  الكمية: {order.quantity}
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t">
              <Button variant="outline" size="sm">
                عرض التفاصيل
              </Button>
              <Button variant="outline" size="sm">
                تحديث الحالة
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrdersList;
