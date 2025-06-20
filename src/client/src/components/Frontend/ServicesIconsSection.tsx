import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Instagram, 
  Youtube, 
  Facebook, 
  Twitter,
  TrendingUp,
  Users,
  MessageSquare,
  Heart,
  Share,
  Eye,
  Star,
  Zap
} from 'lucide-react';

const servicesData = [
  {
    platform: 'Instagram',
    icon: Instagram,
    color: 'from-pink-500 to-purple-600',
    services: [
      { name: 'متابعين انستغرام', price: '0.0001', arabic: 'زيادة متابعين' },
      { name: 'لايكات انستغرام', price: '0.0002', arabic: 'زيادة إعجابات' },
      { name: 'مشاهدات ريلز', price: '0.0003', arabic: 'زيادة مشاهدات' },
      { name: 'تعليقات انستغرام', price: '0.0005', arabic: 'زيادة تفاعل' }
    ]
  },
  {
    platform: 'TikTok',
    icon: MessageSquare,
    color: 'from-gray-900 to-gray-700',
    services: [
      { name: 'متابعين تيك توك', price: '0.0001', arabic: 'زيادة متابعين' },
      { name: 'لايكات تيك توك', price: '0.0002', arabic: 'زيادة إعجابات' },
      { name: 'مشاهدات تيك توك', price: '0.0001', arabic: 'زيادة مشاهدات' },
      { name: 'مشاركات تيك توك', price: '0.0004', arabic: 'زيادة مشاركات' }
    ]
  },
  {
    platform: 'YouTube',
    icon: Youtube,
    color: 'from-red-500 to-red-600',
    services: [
      { name: 'مشتركين يوتيوب', price: '0.001', arabic: 'زيادة مشتركين' },
      { name: 'مشاهدات يوتيوب', price: '0.0001', arabic: 'زيادة مشاهدات' },
      { name: 'لايكات يوتيوب', price: '0.0003', arabic: 'زيادة إعجابات' },
      { name: 'تعليقات يوتيوب', price: '0.0008', arabic: 'زيادة تفاعل' }
    ]
  },
  {
    platform: 'Twitter',
    icon: Twitter,
    color: 'from-blue-400 to-blue-600',
    services: [
      { name: 'متابعين تويتر', price: '0.0002', arabic: 'زيادة متابعين' },
      { name: 'لايكات تويتر', price: '0.0001', arabic: 'زيادة إعجابات' },
      { name: 'ريتويت', price: '0.0003', arabic: 'زيادة مشاركات' },
      { name: 'مشاهدات تويتر', price: '0.0001', arabic: 'زيادة مشاهدات' }
    ]
  },
  {
    platform: 'Facebook',
    icon: Facebook,
    color: 'from-blue-600 to-blue-800',
    services: [
      { name: 'متابعين فيسبوك', price: '0.0003', arabic: 'زيادة متابعين' },
      { name: 'لايكات فيسبوك', price: '0.0002', arabic: 'زيادة إعجابات' },
      { name: 'مشاركات فيسبوك', price: '0.0005', arabic: 'زيادة مشاركات' },
      { name: 'مشاهدات فيديو', price: '0.0001', arabic: 'زيادة مشاهدات' }
    ]
  },
  {
    platform: 'Spotify',
    icon: Eye,
    color: 'from-green-500 to-green-600',
    services: [
      { name: 'متابعين سبوتيفاي', price: '0.0005', arabic: 'زيادة متابعين' },
      { name: 'تشغيلات سبوتيفاي', price: '0.0001', arabic: 'زيادة تشغيل' },
      { name: 'حفظ أغاني', price: '0.0003', arabic: 'حفظ المقاطع' },
      { name: 'بلايليست متابعين', price: '0.0004', arabic: 'متابعة القوائم' }
    ]
  },
  {
    platform: 'Telegram',
    icon: Share,
    color: 'from-blue-400 to-sky-500',
    services: [
      { name: 'أعضاء تليجرام', price: '0.0002', arabic: 'زيادة أعضاء' },
      { name: 'مشاهدات بوست', price: '0.0001', arabic: 'زيادة مشاهدات' },
      { name: 'ردود فعل', price: '0.0003', arabic: 'زيادة تفاعل' },
      { name: 'تصويتات استطلاع', price: '0.0004', arabic: 'تصويتات' }
    ]
  },
  {
    platform: 'Snapchat',
    icon: Heart,
    color: 'from-yellow-400 to-yellow-500',
    services: [
      { name: 'متابعين سناب', price: '0.0004', arabic: 'زيادة متابعين' },
      { name: 'مشاهدات قصة', price: '0.0001', arabic: 'زيادة مشاهدات' },
      { name: 'نقاط سناب', price: '0.0002', arabic: 'زيادة نقاط' },
      { name: 'آراء على قصة', price: '0.0005', arabic: 'زيادة تفاعل' }
    ]
  }
];

const iconVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "spring" as const,
      stiffness: 200
    }
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  }
};

const ServicesIconsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* خلفية ديناميكية */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* العنوان الرئيسي */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-4">
            <Zap className="h-8 w-8 text-yellow-500 mr-3" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              منصة خدمات السوشيال ميديا
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            يمكنك إيجاد جميع خدمات السوشيال ميديا التي يمكن تخيلها في SMMCPAN حيث أننا نتميز بأفضل الخدمات وأرخص الأسعار بدءا من
          </p>
          <div className="mt-4 flex items-center justify-center space-x-4 rtl:space-x-reverse">
            <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
              الأسعار تبدأ من $0.0001
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">
              +31124200 طلب مكتمل
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 text-lg px-4 py-2">
              ثانية واحدة للبداية
            </Badge>
          </div>
        </motion.div>

        {/* أيقونات المنصات مع الخدمات */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 mb-12">
          {servicesData.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.platform}
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 mb-3`}>
                  <IconComponent className="w-full h-full text-white" />
                </div>
                <h3 className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {service.platform}
                </h3>
                <p className="text-xs text-gray-500">
                  {service.services.length} خدمة
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* بطاقات الخدمات المميزة */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {servicesData.slice(0, 6).map((platform, platformIndex) => (
            <Card key={platform.platform} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} p-2 mr-3`}>
                    <platform.icon className="w-full h-full text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{platform.platform}</h3>
                    <p className="text-sm text-gray-500">خدمات متنوعة</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {platform.services.slice(0, 3).map((service, serviceIndex) => (
                    <motion.div
                      key={serviceIndex}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{service.arabic}</p>
                        <p className="text-xs text-gray-500">{service.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">${service.price}</p>
                        <p className="text-xs text-gray-500">لكل 1000</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  استكشف جميع خدمات {platform.platform}
                </Button>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* إحصائيات سريعة */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {[
            { icon: Users, value: '+50K', label: 'عميل سعيد', color: 'text-blue-600' },
            { icon: TrendingUp, value: '+10M', label: 'طلب مكتمل', color: 'text-green-600' },
            { icon: Star, value: '4.9/5', label: 'تقييم العملاء', color: 'text-yellow-600' },
            { icon: Zap, value: '24/7', label: 'دعم فوري', color: 'text-purple-600' },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md">
              <stat.icon className={`h-10 w-10 mx-auto mb-3 ${stat.color}`} />
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesIconsSection;
