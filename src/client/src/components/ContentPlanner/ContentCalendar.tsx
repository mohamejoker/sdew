
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Plus, Instagram, Facebook, Twitter } from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  content: string;
  platform: string;
  scheduledDate: string;
  status: 'draft' | 'scheduled' | 'published';
  type: 'post' | 'story' | 'reel';
}

const ContentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'منشور ترويجي للخدمات',
      content: 'اكتشف خدماتنا المتميزة لنمو حساباتك',
      platform: 'instagram',
      scheduledDate: '2024-01-15T10:00',
      status: 'scheduled',
      type: 'post'
    },
    {
      id: '2',
      title: 'قصة تفاعلية',
      content: 'استطلاع رأي العملاء',
      platform: 'instagram',
      scheduledDate: '2024-01-15T14:00',
      status: 'scheduled',
      type: 'story'
    }
  ]);

  const [newContent, setNewContent] = useState({
    title: '',
    content: '',
    platform: '',
    scheduledDate: '',
    type: 'post' as 'post' | 'story' | 'reel'
  });

  const platformIcons = {
    instagram: Instagram,
    facebook: Facebook,
    twitter: Twitter
  };

  const platformColors = {
    instagram: 'bg-pink-500',
    facebook: 'bg-blue-600',
    twitter: 'bg-blue-400'
  };

  const handleAddContent = () => {
    if (newContent.title && newContent.content && newContent.platform) {
      const newItem: ContentItem = {
        id: Date.now().toString(),
        title: newContent.title,
        content: newContent.content,
        platform: newContent.platform,
        scheduledDate: newContent.scheduledDate,
        type: newContent.type,
        status: 'scheduled'
      };
      setContentItems([...contentItems, newItem]);
      setNewContent({
        title: '',
        content: '',
        platform: '',
        scheduledDate: '',
        type: 'post'
      });
      setIsDialogOpen(false);
    }
  };

  const getContentForDate = (date: string) => {
    return contentItems.filter(item => 
      item.scheduledDate.startsWith(date)
    );
  };

  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    for (let i = 1; i <= 31; i++) {
      const date = new Date(currentYear, currentMonth, i);
      if (date.getMonth() === currentMonth) {
        days.push(date);
      }
    }
    return days;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">مخطط المحتوى</h2>
          <p className="text-gray-600">خطط وجدول محتواك عبر جميع المنصات</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              إضافة محتوى
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>إضافة محتوى جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="عنوان المحتوى"
                value={newContent.title}
                onChange={(e) => setNewContent({...newContent, title: e.target.value})}
              />
              <Textarea
                placeholder="نص المحتوى"
                value={newContent.content}
                onChange={(e) => setNewContent({...newContent, content: e.target.value})}
              />
              <Select
                value={newContent.platform}
                onValueChange={(value) => setNewContent({...newContent, platform: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر المنصة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={newContent.type}
                onValueChange={(value: 'post' | 'story' | 'reel') => setNewContent({...newContent, type: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="نوع المحتوى" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="post">منشور</SelectItem>
                  <SelectItem value="story">قصة</SelectItem>
                  <SelectItem value="reel">ريل</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="datetime-local"
                value={newContent.scheduledDate}
                onChange={(e) => setNewContent({...newContent, scheduledDate: e.target.value})}
              />
              <Button onClick={handleAddContent} className="w-full">
                إضافة المحتوى
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4">
        {['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map(day => (
          <div key={day} className="text-center font-semibold text-gray-700 p-2">
            {day}
          </div>
        ))}
        
        {generateCalendarDays().map(date => {
          const dateStr = date.toISOString().split('T')[0];
          const dayContent = getContentForDate(dateStr);
          
          return (
            <Card key={dateStr} className="min-h-32 p-2 hover:shadow-lg transition-shadow">
              <div className="text-sm font-medium text-gray-900 mb-2">
                {date.getDate()}
              </div>
              <div className="space-y-1">
                {dayContent.map(item => {
                  const PlatformIcon = platformIcons[item.platform as keyof typeof platformIcons];
                  return (
                    <div
                      key={item.id}
                      className={`text-xs p-1 rounded text-white ${
                        platformColors[item.platform as keyof typeof platformColors]
                      }`}
                    >
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <PlatformIcon className="h-3 w-3" />
                        <span className="truncate">{item.title}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Upcoming Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
            <Clock className="h-5 w-5" />
            <span>المحتوى المجدول</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {contentItems
              .filter(item => item.status === 'scheduled')
              .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
              .map(item => {
                const PlatformIcon = platformIcons[item.platform as keyof typeof platformIcons];
                return (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className={`w-8 h-8 rounded-full ${
                        platformColors[item.platform as keyof typeof platformColors]
                      } flex items-center justify-center`}>
                        <PlatformIcon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.content}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(item.scheduledDate).toLocaleString('ar-SA')}
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentCalendar;
