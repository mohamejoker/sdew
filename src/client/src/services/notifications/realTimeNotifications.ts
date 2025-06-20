
export interface RealTimeNotification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  userId?: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'system' | 'payment' | 'user' | 'security' | 'order';
  actionUrl?: string;
}

export class RealTimeNotificationService {
  private ws: WebSocket | null = null;
  private listeners: ((notification: RealTimeNotification) => void)[] = [];
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  constructor() {
    this.connect();
  }

  private connect() {
    try {
      // في البيئة الحقيقية سيكون هذا WebSocket server
      // للآن سنحاكي الاتصال
      this.simulateWebSocketConnection();
    } catch (error) {
      console.error('فشل في الاتصال بخدمة الإشعارات:', error);
      this.scheduleReconnect();
    }
  }

  private simulateWebSocketConnection() {
    // محاكاة اتصال WebSocket
    console.log('متصل بخدمة الإشعارات الفورية');
    
    // محاكاة استقبال إشعارات
    const simulateNotifications = () => {
      const notifications = [
        {
          type: 'success' as const,
          title: 'طلب جديد',
          message: 'تم استلام طلب خدمة جديد',
          category: 'order' as const,
          priority: 'medium' as const
        },
        {
          type: 'warning' as const,
          title: 'استخدام مرتفع',
          message: 'استخدام الخادم وصل إلى 85%',
          category: 'system' as const,
          priority: 'high' as const
        },
        {
          type: 'info' as const,
          title: 'مستخدم جديد',
          message: 'انضم مستخدم جديد للمنصة',
          category: 'user' as const,
          priority: 'low' as const
        },
        {
          type: 'success' as const,
          title: 'دفعة مستلمة',
          message: 'تم استلام دفعة بقيمة 250 ريال',
          category: 'payment' as const,
          priority: 'medium' as const
        }
      ];

      setInterval(() => {
        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
        const notification: RealTimeNotification = {
          id: Date.now().toString(),
          ...randomNotification,
          timestamp: new Date(),
          read: false
        };
        
        this.handleNotification(notification);
      }, 10000 + Math.random() * 20000); // كل 10-30 ثانية
    };

    setTimeout(simulateNotifications, 2000);
  }

  private handleNotification(notification: RealTimeNotification) {
    this.listeners.forEach(listener => listener(notification));
  }

  private scheduleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      setTimeout(() => {
        this.reconnectAttempts++;
        this.connect();
      }, this.reconnectDelay * Math.pow(2, this.reconnectAttempts));
    }
  }

  subscribe(callback: (notification: RealTimeNotification) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  sendNotification(notification: Omit<RealTimeNotification, 'id' | 'timestamp' | 'read'>) {
    const fullNotification: RealTimeNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };

    // في البيئة الحقيقية سيتم إرسالها عبر WebSocket
    console.log('إرسال إشعار:', fullNotification);
    
    // محاكاة الإرسال
    setTimeout(() => {
      this.handleNotification(fullNotification);
    }, 1000);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export const realTimeNotificationService = new RealTimeNotificationService();
