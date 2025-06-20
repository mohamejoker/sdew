
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { 
  Zap,
  Database,
  HardDrive,
  Wifi,
  Shield,
  Settings,
  RefreshCw,
  CheckCircle,
  TrendingUp,
  Clock,
  BarChart3
} from 'lucide-react';
import { toast } from 'sonner';

interface OptimizationSetting {
  id: string;
  name: string;
  description: string;
  category: 'performance' | 'security' | 'storage' | 'network';
  enabled: boolean;
  impact: 'low' | 'medium' | 'high';
  icon: React.ElementType;
}

interface OptimizationTask {
  id: string;
  name: string;
  description: string;
  category: 'cache' | 'database' | 'files' | 'memory';
  estimatedTime: number;
  status: 'pending' | 'running' | 'completed';
  progress: number;
  icon: React.ElementType;
}

const SystemOptimizer = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [settings, setSettings] = useState<OptimizationSetting[]>([
    {
      id: 'auto-cache',
      name: 'تنظيف الكاش التلقائي',
      description: 'مسح ملفات الكاش القديمة تلقائياً كل يوم',
      category: 'performance',
      enabled: true,
      impact: 'medium',
      icon: HardDrive
    },
    {
      id: 'db-optimize',
      name: 'تحسين قاعدة البيانات',
      description: 'تحسين الجداول والفهارس تلقائياً',
      category: 'performance',
      enabled: true,
      impact: 'high',
      icon: Database
    },
    {
      id: 'security-scan',
      name: 'فحص الأمان الدوري',
      description: 'فحص أمني شامل كل أسبوع',
      category: 'security',
      enabled: false,
      impact: 'high',
      icon: Shield
    },
    {
      id: 'compression',
      name: 'ضغط الملفات',
      description: 'ضغط الملفات الثابتة لتوفير المساحة',
      category: 'storage',
      enabled: true,
      impact: 'medium',
      icon: HardDrive
    },
    {
      id: 'network-optimize',
      name: 'تحسين الشبكة',
      description: 'تحسين إعدادات الشبكة للحصول على أفضل أداء',
      category: 'network',
      enabled: false,
      impact: 'low',
      icon: Wifi
    }
  ]);

  const [optimizationTasks, setOptimizationTasks] = useState<OptimizationTask[]>([
    {
      id: 'clear-cache',
      name: 'مسح ذاكرة التخزين المؤقت',
      description: 'إزالة الملفات المؤقتة والكاش القديم',
      category: 'cache',
      estimatedTime: 30,
      status: 'pending',
      progress: 0,
      icon: HardDrive
    },
    {
      id: 'optimize-db',
      name: 'تحسين قاعدة البيانات',
      description: 'إعادة فهرسة وتحسين أداء الجداول',
      category: 'database',
      estimatedTime: 120,
      status: 'pending',
      progress: 0,
      icon: Database
    },
    {
      id: 'compress-files',
      name: 'ضغط الملفات',
      description: 'ضغط الصور والملفات الثابتة',
      category: 'files',
      estimatedTime: 60,
      status: 'pending',
      progress: 0,
      icon: HardDrive
    },
    {
      id: 'free-memory',
      name: 'تحرير الذاكرة',
      description: 'تنظيف الذاكرة وإغلاق العمليات غير المستخدمة',
      category: 'memory',
      estimatedTime: 15,
      status: 'pending',
      progress: 0,
      icon: Zap
    }
  ]);

  const toggleSetting = (settingId: string) => {
    setSettings(prev => prev.map(setting => 
      setting.id === settingId 
        ? { ...setting, enabled: !setting.enabled }
        : setting
    ));
    
    const setting = settings.find(s => s.id === settingId);
    if (setting) {
      toast.success(`${setting.enabled ? 'تم إيقاف' : 'تم تفعيل'} ${setting.name}`);
    }
  };

  const runOptimization = async () => {
    setIsOptimizing(true);
    
    for (const task of optimizationTasks) {
      setOptimizationTasks(prev => prev.map(t => 
        t.id === task.id 
          ? { ...t, status: 'running', progress: 0 }
          : t
      ));

      // محاكاة تقدم المهمة
      for (let progress = 0; progress <= 100; progress += 5) {
        await new Promise(resolve => setTimeout(resolve, task.estimatedTime * 10));
        setOptimizationTasks(prev => prev.map(t => 
          t.id === task.id 
            ? { ...t, progress }
            : t
        ));
      }

      setOptimizationTasks(prev => prev.map(t => 
        t.id === task.id 
          ? { ...t, status: 'completed' }
          : t
      ));

      toast.success(`تم إكمال: ${task.name}`);
    }

    setIsOptimizing(false);
    toast.success('تم إكمال تحسين النظام بنجاح!');
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'performance': return 'bg-blue-100 text-blue-800';
      case 'security': return 'bg-red-100 text-red-800';
      case 'storage': return 'bg-green-100 text-green-800';
      case 'network': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalEstimatedTime = optimizationTasks.reduce((acc, task) => acc + task.estimatedTime, 0);

  return (
    <div className="space-y-6">
      {/* إعدادات التحسين التلقائي */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            إعدادات التحسين التلقائي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {settings.map((setting) => {
              const IconComponent = setting.icon;
              return (
                <div key={setting.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <IconComponent className="h-5 w-5 text-gray-500" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{setting.name}</h3>
                        <Badge className={getCategoryColor(setting.category)}>
                          {setting.category === 'performance' && 'أداء'}
                          {setting.category === 'security' && 'أمان'}
                          {setting.category === 'storage' && 'تخزين'}
                          {setting.category === 'network' && 'شبكة'}
                        </Badge>
                        <Badge className={getImpactColor(setting.impact)}>
                          {setting.impact === 'high' && 'تأثير عالي'}
                          {setting.impact === 'medium' && 'تأثير متوسط'}
                          {setting.impact === 'low' && 'تأثير منخفض'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{setting.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={setting.enabled}
                    onCheckedChange={() => toggleSetting(setting.id)}
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* مهام التحسين */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              مهام تحسين النظام
            </CardTitle>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                الوقت المقدر: {Math.floor(totalEstimatedTime / 60)} دقيقة
              </div>
              <Button 
                onClick={runOptimization}
                disabled={isOptimizing}
                className="bg-green-600 hover:bg-green-700"
              >
                {isOptimizing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                    جاري التحسين...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    تشغيل التحسين
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {optimizationTasks.map((task) => {
              const IconComponent = task.icon;
              return (
                <Card key={task.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-5 w-5 text-gray-500" />
                        <div>
                          <h3 className="font-medium">{task.name}</h3>
                          <p className="text-sm text-gray-600">{task.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          <Clock className="h-3 w-3 mr-1" />
                          {task.estimatedTime}ث
                        </Badge>
                        {task.status === 'completed' && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                        {task.status === 'running' && (
                          <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />
                        )}
                      </div>
                    </div>
                    
                    {task.status === 'running' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>التقدم</span>
                          <span>{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* إحصائيات التحسين */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            إحصائيات التحسين
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {optimizationTasks.filter(t => t.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">مهام مكتملة</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">85%</div>
              <div className="text-sm text-gray-600">تحسن الأداء</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">2.5GB</div>
              <div className="text-sm text-gray-600">مساحة محررة</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemOptimizer;
