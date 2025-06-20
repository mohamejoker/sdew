
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Heart, 
  Eye, 
  MessageCircle, 
  Share2, 
  Star,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  TrendingUp,
  Zap
} from 'lucide-react';

const ServicesOverview = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'جميع الخدمات', count: 150 },
    { id: 'instagram', name: 'انستغرام', count: 45, icon: Instagram },
    { id: 'youtube', name: 'يوتيوب', count: 32, icon: Youtube },
    { id: 'facebook', name: 'فيسبوك', count: 28, icon: Facebook },
    { id: 'twitter', name: 'تويتر', count: 25, icon: Twitter },
    { id: 'tiktok', name: 'تيك توك', count: 20, icon: Star }
  ];

  const services = [
    {
      id: 1,
      name: 'متابعين انستغرام عرب',
      platform: 'instagram',
      icon: Users,
      price: '0.50',
      minOrder: 100,
      maxOrder: 10000,
      description: 'متابعين حقيقيين من الوطن العربي',
      quality: 'عالية',
      speed: 'سريع',
      guarantee: true
    },
    {
      id: 2,
      name: 'لايكات انستغرام',
      platform: 'instagram',
      icon: Heart,
      price: '0.20',
      minOrder: 50,
      maxOrder: 5000,
      description: 'لايكات سريعة وآمنة',
      quality: 'ممتازة',
      speed: 'فوري',
      guarantee: true
    },
    {
      id: 3,
      name: 'مشاهدات يوتيوب عربية',
      platform: 'youtube',
      icon: Eye,
      price: '0.30',
      minOrder: 1000,
      maxOrder: 100000,
      description: 'مشاهدات حقيقية من العالم العربي',
      quality: 'عالية',
      speed: 'متوسط',
      guarantee: true
    },
    {
      id: 4,
      name: 'تعليقات انستغرام مخصصة',
      platform: 'instagram',
      icon: MessageCircle,
      price: '1.50',
      minOrder: 10,
      maxOrder: 500,
      description: 'تعليقات مخصصة باللغة العربية',
      quality: 'ممتازة',
      speed: 'بطيء',
      guarantee: true
    },
    {
      id: 5,
      name: 'مشاركات فيسبوك',
      platform: 'facebook',
      icon: Share2,
      price: '0.40',
      minOrder: 50,
      maxOrder: 2000,
      description: 'مشاركات طبيعية وآمنة',
      quality: 'جيدة',
      speed: 'سريع',
      guarantee: false
    },
    {
      id: 6,
      name: 'متابعين تويتر نشطين',
      platform: 'twitter',
      icon: Users,
      price: '0.80',
      minOrder: 100,
      maxOrder: 5000,
      description: 'متابعين نشطين ومتفاعلين',
      quality: 'عالية',
      speed: 'متوسط',
      guarantee: true
    }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.platform === selectedCategory);

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'ممتازة': return 'bg-green-100 text-green-800';
      case 'عالية': return 'bg-blue-100 text-blue-800';
      case 'جيدة': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSpeedColor = (speed: string) => {
    switch (speed) {
      case 'فوري': return 'bg-red-100 text-red-800';
      case 'سريع': return 'bg-orange-100 text-orange-800';
      case 'متوسط': return 'bg-blue-100 text-blue-800';
      case 'بطيء': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">الخدمات المتاحة</h1>
          <p className="text-gray-600 mt-1">اختر من مجموعة واسعة من خدمات وسائل التواصل الاجتماعي</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <TrendingUp className="h-4 w-4 mr-2" />
          الخدمات الأكثر طلباً
        </Button>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              {IconComponent && <IconComponent className="h-4 w-4" />}
              {category.name}
              <Badge variant="secondary" className="ml-1">
                {category.count}
              </Badge>
            </Button>
          );
        })}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => {
          const IconComponent = service.icon;
          return (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-50">
                      <IconComponent className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getQualityColor(service.quality)}>
                          {service.quality}
                        </Badge>
                        <Badge className={getSpeedColor(service.speed)}>
                          {service.speed}
                        </Badge>
                        {service.guarantee && (
                          <Badge className="bg-green-100 text-green-800">
                            <Zap className="h-3 w-3 mr-1" />
                            ضمان
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">السعر لكل 1000:</span>
                    <span className="text-xl font-bold text-green-600">${service.price}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">الحد الأدنى:</span>
                    <span className="font-medium">{service.minOrder.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">الحد الأقصى:</span>
                    <span className="font-medium">{service.maxOrder.toLocaleString()}</span>
                  </div>
                </div>
                
                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                  طلب الخدمة
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد خدمات متاحة</h3>
          <p className="text-gray-500">جرب تغيير الفئة أو ابحث عن خدمة أخرى</p>
        </div>
      )}
    </div>
  );
};

export default ServicesOverview;
