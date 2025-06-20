
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Image, Video, Music, Plus, Edit, Trash2 } from 'lucide-react';

const ContentManager = () => {
  const [contents] = useState([
    {
      id: 1,
      title: 'مقال ترحيبي',
      type: 'article',
      status: 'published',
      author: 'المدير',
      createdAt: '2024-01-15',
      views: 245
    },
    {
      id: 2,
      title: 'شعار الموقع',
      type: 'image',
      status: 'published',
      author: 'المصمم',
      createdAt: '2024-01-14',
      views: 89
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return <FileText className="h-4 w-4" />;
      case 'image': return <Image className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'audio': return <Music className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published': return <Badge className="bg-green-100 text-green-800">منشور</Badge>;
      case 'draft': return <Badge variant="outline">مسودة</Badge>;
      case 'archived': return <Badge className="bg-gray-100 text-gray-800">مؤرشف</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'article': return 'مقال';
      case 'image': return 'صورة';
      case 'video': return 'فيديو';
      case 'audio': return 'صوت';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">إدارة المحتوى</h1>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-600">
          <Plus className="h-4 w-4 mr-2" />
          محتوى جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">إجمالي المقالات</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">الصور</p>
                <p className="text-2xl font-bold">45</p>
              </div>
              <Image className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">الفيديوهات</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Video className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">إجمالي المشاهدات</p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
              <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold">👁</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList>
          <TabsTrigger value="content">المحتوى</TabsTrigger>
          <TabsTrigger value="media">الوسائط</TabsTrigger>
          <TabsTrigger value="pages">الصفحات</TabsTrigger>
          <TabsTrigger value="settings">إعدادات</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>قائمة المحتوى</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contents.map((content) => (
                  <div key={content.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {getTypeIcon(content.type)}
                      <div>
                        <h3 className="font-semibold">{content.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{getTypeLabel(content.type)}</span>
                          <span>•</span>
                          <span>{content.author}</span>
                          <span>•</span>
                          <span>{content.createdAt}</span>
                          <span>•</span>
                          <span>{content.views} مشاهدة</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(content.status)}
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>مكتبة الوسائط</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">لا توجد وسائط محملة</p>
                <Button className="mt-4">رفع ملفات</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إدارة الصفحات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">عنوان الصفحة الرئيسية</label>
                    <Input placeholder="مرحباً بك في موقعنا" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">العنوان الفرعي</label>
                    <Input placeholder="أفضل خدمات السوشيال ميديا" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">وصف الموقع</label>
                  <Textarea placeholder="نقدم أفضل خدمات السوشيال ميديا..." />
                </div>
                <Button>حفظ التغييرات</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات المحتوى</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>السماح بالتعليقات</span>
                  <Button variant="outline">تفعيل</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>مراجعة المحتوى قبل النشر</span>
                  <Button variant="outline">تفعيل</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>إرسال إشعارات المحتوى الجديد</span>
                  <Button variant="outline">تفعيل</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManager;
