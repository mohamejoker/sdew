
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Headphones, MessageSquare, Clock, CheckCircle,
  AlertTriangle, User, Search, Filter,
  Star, Mail, Phone
} from 'lucide-react';

const SupportPage = () => {
  const [tickets] = useState([
    {
      id: '#T001',
      user: 'أحمد محمد',
      subject: 'مشكلة في الدفع',
      status: 'مفتوح',
      priority: 'عالية',
      created: '2024-01-15 14:30',
      agent: 'سارة أحمد'
    },
    {
      id: '#T002',
      user: 'فاطمة علي',
      subject: 'استفسار عن الخدمات',
      status: 'قيد المعالجة',
      priority: 'متوسطة',
      created: '2024-01-15 13:15',
      agent: 'محمد خالد'
    },
    {
      id: '#T003',
      user: 'عبدالله حسن',
      subject: 'طلب استرداد',
      status: 'مغلق',
      priority: 'منخفضة',
      created: '2024-01-14 16:45',
      agent: 'نور الدين'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مفتوح': return 'bg-red-100 text-red-800';
      case 'قيد المعالجة': return 'bg-yellow-100 text-yellow-800';
      case 'مغلق': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'عالية': return 'bg-red-100 text-red-800';
      case 'متوسطة': return 'bg-yellow-100 text-yellow-800';
      case 'منخفضة': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">نظام الدعم الفني</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            تصفية
          </Button>
          <Button>
            <MessageSquare className="h-4 w-4 mr-2" />
            تذكرة جديدة
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">التذاكر المفتوحة</p>
                <p className="text-2xl font-bold text-red-600">15</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">قيد المعالجة</p>
                <p className="text-2xl font-bold text-yellow-600">8</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">تم الحل اليوم</p>
                <p className="text-2xl font-bold text-green-600">23</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">متوسط الرد</p>
                <p className="text-2xl font-bold">2.5 ساعة</p>
              </div>
              <Headphones className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tickets" className="space-y-6">
        <TabsList>
          <TabsTrigger value="tickets">التذاكر</TabsTrigger>
          <TabsTrigger value="agents">فريق الدعم</TabsTrigger>
          <TabsTrigger value="knowledge">قاعدة المعرفة</TabsTrigger>
          <TabsTrigger value="feedback">التقييمات</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>تذاكر الدعم</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="البحث في التذاكر..."
                      className="pl-10 pr-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm text-gray-500">{ticket.id}</span>
                        <h3 className="font-semibold">{ticket.subject}</h3>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status}
                        </Badge>
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">العميل</p>
                        <p className="font-medium">{ticket.user}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">الوكيل</p>
                        <p className="font-medium">{ticket.agent}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">تاريخ الإنشاء</p>
                        <p className="font-medium">{ticket.created}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">عرض</Button>
                        <Button variant="outline" size="sm">رد</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>فريق الدعم الفني</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {['سارة أحمد', 'محمد خالد', 'نور الدين'].map((agent, index) => (
                  <Card key={agent}>
                    <CardContent className="p-6 text-center">
                      <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">{agent}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>التذاكر المفتوحة:</span>
                          <span className="font-medium">{5 + index * 2}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>متوسط الرد:</span>
                          <span className="font-medium">{2 + index * 0.5} ساعة</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>التقييم:</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{(4.2 + index * 0.3).toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>قاعدة المعرفة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-500">مقالات المساعدة والأسئلة الشائعة</p>
                <Button className="mt-4">إضافة مقال جديد</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تقييمات العملاء</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">تقييمات وملاحظات العملاء</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupportPage;
