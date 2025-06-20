
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target, Mail, MessageSquare, Megaphone, 
  TrendingUp, Users, Calendar, Gift,
  BarChart3, Send, Eye, Edit
} from 'lucide-react';

const MarketingPage = () => {
  const [campaigns] = useState([
    {
      id: 1,
      name: 'حملة العروض الصيفية',
      type: 'عرض خاص',
      status: 'نشطة',
      reach: 12500,
      clicks: 3200,
      conversions: 450,
      budget: 5000,
      spent: 3200
    },
    {
      id: 2,
      name: 'زيادة المتابعين',
      type: 'نمو المتابعين',
      status: 'مكتملة',
      reach: 8900,
      clicks: 2100,
      conversions: 320,
      budget: 3000,
      spent: 2800
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">إدارة التسويق</h1>
        <Button className="bg-gradient-to-r from-pink-500 to-purple-600">
          <Megaphone className="h-4 w-4 mr-2" />
          حملة جديدة
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">إجمالي الوصول</p>
                <p className="text-2xl font-bold">21,400</p>
              </div>
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">النقرات</p>
                <p className="text-2xl font-bold">5,300</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">التحويلات</p>
                <p className="text-2xl font-bold">770</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">الميزانية المتبقية</p>
                <p className="text-2xl font-bold">2,000 ريال</p>
              </div>
              <Gift className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList>
          <TabsTrigger value="campaigns">الحملات</TabsTrigger>
          <TabsTrigger value="email">البريد الإلكتروني</TabsTrigger>
          <TabsTrigger value="social">وسائل التواصل</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="grid gap-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{campaign.name}</h3>
                        <Badge variant={campaign.status === 'نشطة' ? 'default' : 'secondary'}>
                          {campaign.status}
                        </Badge>
                        <Badge variant="outline">{campaign.type}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-gray-500">الوصول</p>
                          <p className="font-bold">{campaign.reach.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">النقرات</p>
                          <p className="font-bold">{campaign.clicks.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">التحويلات</p>
                          <p className="font-bold">{campaign.conversions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">الإنفاق</p>
                          <p className="font-bold">{campaign.spent} / {campaign.budget} ريال</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                حملات البريد الإلكتروني
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">لا توجد حملات بريد إلكتروني حالياً</p>
                <Button className="mt-4">
                  <Send className="h-4 w-4 mr-2" />
                  إنشاء حملة جديدة
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                وسائل التواصل الاجتماعي
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">ربط حسابات وسائل التواصل لبدء الحملات</p>
                <Button className="mt-4">
                  ربط الحسابات
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تحليلات الحملات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">تحليلات مفصلة ستظهر هنا</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketingPage;
