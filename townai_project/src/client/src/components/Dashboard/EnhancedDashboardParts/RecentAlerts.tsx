
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const alerts = [
    {
      type: 'warning' as const,
      message: 'استخدام الذاكرة عالي (85%)',
      time: 'منذ 5 دقائق',
      icon: AlertTriangle
    },
    {
      type: 'success' as const,
      message: 'تم تحديث النظام بنجاح',
      time: 'منذ 10 دقائق',
      icon: CheckCircle
    },
    {
      type: 'info' as const,
      message: 'نسخة احتياطية جديدة متاحة',
      time: 'منذ 15 دقيقة',
      icon: Clock
    }
  ];

const getAlertColor = (type: string) => {
    switch (type) {
        case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'success': return 'bg-green-100 text-green-800 border-green-200';
        case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

const RecentAlerts: React.FC = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                التنبيهات الأخيرة
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-3">
                {alerts.map((alert, index) => {
                    const AlertIcon = alert.icon;
                    return (
                        <div key={index} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                            <div className="flex items-start gap-3">
                                <AlertIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium">{alert.message}</p>
                                    <p className="text-xs opacity-75 mt-1">{alert.time}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Button variant="outline" className="w-full mt-4">
                عرض جميع التنبيهات
            </Button>
        </CardContent>
    </Card>
);

export default RecentAlerts;
