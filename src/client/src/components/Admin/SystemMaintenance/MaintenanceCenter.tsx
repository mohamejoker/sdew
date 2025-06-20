
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings,
  Shield,
  Database,
  HardDrive,
  Zap,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Trash2,
  Download,
  Upload,
  Server,
  Monitor
} from 'lucide-react';
import { toast } from 'sonner';

interface MaintenanceTask {
  id: string;
  name: string;
  description: string;
  category: 'security' | 'performance' | 'database' | 'storage' | 'system';
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  lastRun?: string;
  icon: React.ElementType;
  critical: boolean;
}

const MaintenanceCenter = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [tasks, setTasks] = useState<MaintenanceTask[]>([
    {
      id: 'security-scan',
      name: 'فحص الأمان الشامل',
      description: 'فحص الثغرات الأمنية وإعدادات الحماية',
      category: 'security',
      status: 'pending',
      progress: 0,
      icon: Shield,
      critical: true
    },
    {
      id: 'db-optimize',
      name: 'تحسين قاعدة البيانات',
      description: 'تنظيف وتحسين أداء قاعدة البيانات',
      category: 'database',
      status: 'pending',
      progress: 0,
      icon: Database,
      critical: false
    },
    {
      id: 'cache-clear',
      name: 'مسح ذاكرة التخزين المؤقت',
      description: 'تنظيف الكاش والملفات المؤقتة',
      category: 'performance',
      status: 'pending',
      progress: 0,
      icon: HardDrive,
      critical: false
    },
    {
      id: 'performance-tune',
      name: 'ضبط الأداء',
      description: 'تحسين إعدادات الأداء والاستجابة',
      category: 'performance',
      status: 'pending',
      progress: 0,
      icon: Zap,
      critical: false
    },
    {
      id: 'backup-verify',
      name: 'التحقق من النسخ الاحتياطية',
      description: 'فحص سلامة النسخ الاحتياطية',
      category: 'storage',
      status: 'pending',
      progress: 0,
      icon: Download,
      critical: true
    },
    {
      id: 'system-logs',
      name: 'تنظيف سجلات النظام',
      description: 'أرشفة وتنظيف ملفات السجلات القديمة',
      category: 'system',
      status: 'pending',
      progress: 0,
      icon: Monitor,
      critical: false
    }
  ]);

  const runMaintenance = async (taskId?: string) => {
    setIsRunning(true);
    const tasksToRun = taskId ? tasks.filter(t => t.id === taskId) : tasks;
    
    for (const task of tasksToRun) {
      // تحديث حالة المهمة إلى قيد التشغيل
      setTasks(prev => prev.map(t => 
        t.id === task.id 
          ? { ...t, status: 'running', progress: 0 }
          : t
      ));

      // محاكاة تقدم المهمة
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setTasks(prev => prev.map(t => 
          t.id === task.id 
            ? { ...t, progress }
            : t
        ));
      }

      // تحديد نتيجة المهمة (محاكاة)
      const success = Math.random() > 0.1; // 90% نسبة نجاح
      setTasks(prev => prev.map(t => 
        t.id === task.id 
          ? { 
              ...t, 
              status: success ? 'completed' : 'failed',
              lastRun: new Date().toLocaleString('ar-SA')
            }
          : t
      ));

      if (success) {
        toast.success(`تم إكمال: ${task.name}`);
      } else {
        toast.error(`فشل في: ${task.name}`);
      }
    }

    setIsRunning(false);
    toast.success('تم إكمال جميع مهام الصيانة');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'running': return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
      default: return null;
    }
  };

  const filteredTasks = selectedCategory === 'all' 
    ? tasks 
    : tasks.filter(task => task.category === selectedCategory);

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const failedTasks = tasks.filter(t => t.status === 'failed').length;
  const criticalTasks = tasks.filter(t => t.critical && t.status !== 'completed').length;

  return (
    <div className="space-y-6">
      {/* الإحصائيات العامة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
            <div className="text-sm text-gray-600">مهام مكتملة</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{failedTasks}</div>
            <div className="text-sm text-gray-600">مهام فاشلة</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{criticalTasks}</div>
            <div className="text-sm text-gray-600">مهام حرجة</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
            <div className="text-sm text-gray-600">إجمالي المهام</div>
          </CardContent>
        </Card>
      </div>

      {/* أدوات التحكم */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              مركز الصيانة والفحص
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                onClick={() => runMaintenance()}
                disabled={isRunning}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                    جاري التشغيل...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    تشغيل جميع المهام
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">الكل</TabsTrigger>
              <TabsTrigger value="security">الأمان</TabsTrigger>
              <TabsTrigger value="performance">الأداء</TabsTrigger>
              <TabsTrigger value="database">قاعدة البيانات</TabsTrigger>
              <TabsTrigger value="storage">التخزين</TabsTrigger>
              <TabsTrigger value="system">النظام</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-6">
              <div className="space-y-4">
                {filteredTasks.map((task) => {
                  const IconComponent = task.icon;
                  return (
                    <Card key={task.id} className={`${task.critical ? 'border-orange-200' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <IconComponent className="h-5 w-5 text-gray-500" />
                            <div>
                              <h3 className="font-medium flex items-center gap-2">
                                {task.name}
                                {task.critical && (
                                  <Badge variant="destructive" className="text-xs">حرج</Badge>
                                )}
                              </h3>
                              <p className="text-sm text-gray-600">{task.description}</p>
                              {task.lastRun && (
                                <p className="text-xs text-gray-500 mt-1">
                                  آخر تشغيل: {task.lastRun}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {getStatusIcon(task.status)}
                            <Badge className={getStatusColor(task.status)}>
                              {task.status === 'pending' && 'في الانتظار'}
                              {task.status === 'running' && 'قيد التشغيل'}
                              {task.status === 'completed' && 'مكتمل'}
                              {task.status === 'failed' && 'فشل'}
                            </Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => runMaintenance(task.id)}
                              disabled={isRunning || task.status === 'running'}
                            >
                              تشغيل
                            </Button>
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* أدوات الصيانة السريعة */}
      <Card>
        <CardHeader>
          <CardTitle>أدوات الصيانة السريعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Trash2 className="h-6 w-6" />
              <span>مسح الملفات المؤقتة</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Database className="h-6 w-6" />
              <span>تحسين قاعدة البيانات</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Server className="h-6 w-6" />
              <span>إعادة تشغيل الخدمات</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Download className="h-6 w-6" />
              <span>إنشاء نسخة احتياطية</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Upload className="h-6 w-6" />
              <span>استعادة من نسخة احتياطية</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Shield className="h-6 w-6" />
              <span>فحص الأمان</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceCenter;
