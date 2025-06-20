
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, MemoryStick, HardDrive, Globe, Activity } from 'lucide-react';

const SystemStatusCard = ({
  systemStats
}: {
  systemStats: {
    cpuUsage: number;
    memoryUsage: number;
    diskUsage: number;
    uptime: string;
    activeUsers: number;
    totalRequests: number;
  }
}) => (
  <Card className="border-0 shadow-lg">
    <CardHeader>
      <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
        <Activity className="h-5 w-5" />
        <span>حالة النظام</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <Cpu className="h-8 w-8 mx-auto mb-2 text-blue-600" />
          <div className="text-lg font-bold text-blue-900">{systemStats.cpuUsage}%</div>
          <div className="text-xs text-blue-700">استخدام المعالج</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <MemoryStick className="h-8 w-8 mx-auto mb-2 text-green-600" />
          <div className="text-lg font-bold text-green-900">{systemStats.memoryUsage}%</div>
          <div className="text-xs text-green-700">استخدام الذاكرة</div>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <HardDrive className="h-8 w-8 mx-auto mb-2 text-orange-600" />
          <div className="text-lg font-bold text-orange-900">{systemStats.diskUsage}%</div>
          <div className="text-xs text-orange-700">استخدام القرص</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <Globe className="h-8 w-8 mx-auto mb-2 text-purple-600" />
          <div className="text-lg font-bold text-purple-900">{systemStats.activeUsers}</div>
          <div className="text-xs text-purple-700">مستخدم نشط</div>
        </div>
      </div>
      <div className="border-t pt-4">
        <div className="flex justify-between text-sm">
          <span>وقت التشغيل:</span>
          <span className="font-medium">{systemStats.uptime}</span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span>إجمالي الطلبات:</span>
          <span className="font-medium">{systemStats.totalRequests.toLocaleString()}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);
export default SystemStatusCard;
