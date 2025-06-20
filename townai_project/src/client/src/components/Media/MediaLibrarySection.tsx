
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Search, Filter, Grid, List, Image, Video, File, Trash2 } from 'lucide-react';

const MediaLibrarySection = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const mediaItems = [
    { id: 1, name: 'صورة-المنتج-1.jpg', type: 'image', size: '2.3 MB', date: '2024-01-15' },
    { id: 2, name: 'فيديو-تسويقي.mp4', type: 'video', size: '15.7 MB', date: '2024-01-14' },
    { id: 3, name: 'لوجو-الشركة.png', type: 'image', size: '450 KB', date: '2024-01-13' },
    { id: 4, name: 'تقرير-شهري.pdf', type: 'document', size: '1.2 MB', date: '2024-01-12' },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="h-8 w-8 text-blue-500" />;
      case 'video': return <Video className="h-8 w-8 text-red-500" />;
      default: return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">مكتبة الوسائط</h1>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Upload className="h-4 w-4 ml-2" />
          رفع ملف جديد
        </Button>
      </div>

      {/* أدوات البحث والفلترة */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في الملفات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 ml-2" />
              فلترة
            </Button>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* محتوى المكتبة */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">جميع الملفات</TabsTrigger>
          <TabsTrigger value="images">الصور</TabsTrigger>
          <TabsTrigger value="videos">الفيديوهات</TabsTrigger>
          <TabsTrigger value="documents">المستندات</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mediaItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="text-center space-y-3">
                      {getFileIcon(item.type)}
                      <h3 className="font-medium text-sm truncate">{item.name}</h3>
                      <div className="text-xs text-gray-500 space-y-1">
                        <p>{item.size}</p>
                        <p>{item.date}</p>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="outline" className="flex-1">معاينة</Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                {mediaItems.map((item, index) => (
                  <div key={item.id} className={`flex items-center justify-between p-4 ${index !== mediaItems.length - 1 ? 'border-b' : ''}`}>
                    <div className="flex items-center gap-3">
                      {getFileIcon(item.type)}
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.size} • {item.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">معاينة</Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="images">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {mediaItems.filter(item => item.type === 'image').map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-2">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                    <Image className="h-12 w-12 text-gray-400" />
                  </div>
                  <p className="text-xs truncate">{item.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MediaLibrarySection;
