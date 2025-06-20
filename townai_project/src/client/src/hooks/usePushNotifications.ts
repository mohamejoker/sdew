
import { useEffect } from 'react';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { useToast } from '@/hooks/use-toast';

export const usePushNotifications = () => {
  const { toast } = useToast();

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      initializePushNotifications();
    }
  }, []);

  const initializePushNotifications = async () => {
    try {
      // طلب الإذن للإشعارات
      const permission = await PushNotifications.requestPermissions();
      
      if (permission.receive === 'granted') {
        // تسجيل الجهاز للإشعارات
        await PushNotifications.register();
        
        toast({
          title: "تم تفعيل الإشعارات",
          description: "ستتلقى إشعارات فورية حول طلباتك",
        });
      }
    } catch (error) {
      console.error('خطأ في تهيئة الإشعارات:', error);
    }

    // مستمع تسجيل الجهاز
    PushNotifications.addListener('registration', (token) => {
      console.log('Push registration success, token: ' + token.value);
      // حفظ التوكن في قاعدة البيانات
      localStorage.setItem('pushToken', token.value);
    });

    // مستمع أخطاء التسجيل
    PushNotifications.addListener('registrationError', (error) => {
      console.error('Registration error: ', error);
    });

    // مستمع استقبال الإشعارات
    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('Push received: ', notification);
      
      toast({
        title: notification.title || 'إشعار جديد',
        description: notification.body || 'لديك إشعار جديد',
      });
    });

    // مستمع النقر على الإشعار
    PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
      console.log('Push action performed: ', notification);
      
      // توجيه المستخدم حسب نوع الإشعار
      const data = notification.notification.data;
      if (data?.route) {
        window.location.href = data.route;
      }
    });
  };

  const sendTestNotification = () => {
    if (Capacitor.isNativePlatform()) {
      // في التطبيق الحقيقي، سترسل من الخادم
      toast({
        title: "إشعار تجريبي",
        description: "هذا إشعار تجريبي للتأكد من عمل النظام",
      });
    } else {
      // في المتصفح، استخدم Notification API
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('إشعار تجريبي', {
          body: 'هذا إشعار تجريبي من التطبيق',
          icon: '/favicon.ico'
        });
      }
    }
  };

  return {
    sendTestNotification
  };
};
