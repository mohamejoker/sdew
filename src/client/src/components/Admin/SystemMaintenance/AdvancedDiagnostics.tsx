
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Activity,
  Cpu,
  HardDrive,
  Wifi,
  Shield,
  Database,
  Clock,
  Thermometer,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';

interface SystemMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  threshold: { warning: number; critical: number };
  icon: React.ElementType;
}

interface PerformanceTest {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: number;
  unit: string;
  benchmark: number;
}

const AdvancedDiagnostics = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    {
      id: 'cpu',
      name: 'استخدام المعالج',
      value: 45,
      unit: '%',
      status: 'good',
      threshold: { warning: 70, critical: 90 },
      icon: Cpu
    },
    {
      id: 'memory',
      name: 'استخدام الذاكرة',
      value: 68,
      unit: '%',
      status: 'warning',
      threshold: { warning: 70, critical: 85 },
      icon: Activity
    },
    {
      id: 'disk',
      name: 'مساحة القرص',
      value: 82,
      unit: '%',
      status: 'critical',
      threshold: { warning: 80, critical: 90 },
      icon: HardDrive
    },
    {
      id: 'network',
      name: 'استخدام الشبكة',
      value: 35,
      unit: '%',
      status: 'good',
      threshold: { warning: 80, critical: 95 },
      icon: Wifi
    },
    {
      id: 'temperature',
      name: 'درجة حرارة النظام',
      value: 58,
      unit: '°C',
      status: 'good',
      threshold: { warning: 70, critical: 80 },
      icon: Thermometer
    }
  ]);

  const [performanceTests, setPerformanceTests] = useState<PerformanceTest[]>([
    {
      id: 'db-query',
      name: 'سرعة استعلام قاعدة البيانات',
      description: 'قياس زمن استجابة الاستعلامات',
      status: 'pending',
      unit: 'ms',
      benchmark: 100
    },
    {
      id: 'api-response',
      name: 'زمن استجابة API',
      description: 'قياس سرعة استجابة واجهة البرمجة',
      status: 'pending',
      unit: 'ms',
      benchmark: 200
    },
    {
      id: 'page-load',
      name: 'سرعة تحميل الصفحات',
      description: 'قياس زمن تحميل الصفحات الأساسية',
      status: 'pending',
      unit: 'ms',
      benchmark: 1500
    },
    {
      id: 'file-io',
      name: 'سرعة قراءة/كتابة الملفات',
      description: 'قياس أداء نظام الملفات',
      status: 'pending',
      unit: 'MB/s',
      benchmark: 50
    }
  ]);

  // تحديث المقاييس كل 5 ثوان
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => {
        const variation = (Math.random() - 0.5) * 10;
        const newValue = Math.max(0, Math.min(100, metric.value + variation));
        let status: 'good' | 'warning' | 'critical' = 'good';
        
        if (newValue >= metric.threshold.critical) {
          status = 'critical';
        } else if (newValue >= metric.threshold.warning) {
          status = 'warning';
        }

        return { ...metric, value: newValue, status };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const runPerformanceTests = async () => {
    setIsRunning(true);
    
    for (const test of performanceTests) {
      setPerformanceTests(prev => prev.map(t => 
        t.id === test.id ? { ...t, status: 'running' } : t
      ));

      // محاكاة اختبار الأداء
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const success = Math.random() > 0.1; // 90% نسبة نجاح
      const result = success 
        ? test.benchmark * (0.8 + Math.random() * 0.4) // ±20% من المعيار
        : 0;

      setPerformanceTests(prev => prev.map(t => 
        t.id === test.id 
          ? { 
              ...t, 
              status: success ? 'completed' : 'failed',
              result: success ? Math.round(result) : undefined
            }
          : t
      ));
    }

    setIsRunning(false);
  };

  const getMetricColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTestStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'running': return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTestResultStatus = (test: PerformanceTest) => {
    if (!test.result) return 'unknown';
    if (test.unit === 'ms') {
      return test.result <= test.benchmark ? 'good' : 'warning';
    } else {
      return test.result >= test.benchmark ? 'good' : 'warning';
    }
  };

  return (
    <div className="space-y-6">
      {/* مقاييس النظام في الوقت الفعلي */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            مراقبة النظام في الوقت الفعلي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.map((metric) => {
              const IconComponent = metric.icon;
              return (
                <Card key={metric.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4 text-gray-500" />
                        <span className="font-medium text-sm">{metric.name}</span>
                      </div>
                      <Badge 
                        className={
                          metric.status === 'good' ? 'bg-green-100 text-green-800' :
                          metric.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }
                      >
                        {metric.status === 'good' ? 'جيد' :
                         metric.status === 'warning' ? 'تحذير' : 'حرج'}
                      </Badge>
                    </div>
                    <div className={`text-2xl font-bold ${getMetricColor(metric.status)}`}>
                      {metric.value.toFixed(1)}{metric.unit}
                    </div>
                    <Progress 
                      value={metric.value} 
                      className="mt-2 h-2"
                    />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* اختبارات الأداء */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              اختبارات الأداء المتقدمة
            </CardTitle>
            <Button 
              onClick={runPerformanceTests}
              disabled={isRunning}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                  جاري الاختبار...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  تشغيل اختبارات الأداء
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceTests.map((test) => (
              <Card key={test.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getTestStatusIcon(test.status)}
                      <div>
                        <h3 className="font-medium">{test.name}</h3>
                        <p className="text-sm text-gray-600">{test.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {test.result && (
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${
                            getTestResultStatus(test) === 'good' ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            {test.result} {test.unit}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            معيار: {test.benchmark} {test.unit}
                          </Badge>
                        </div>
                      )}
                      {test.status === 'pending' && (
                        <span className="text-gray-500">في الانتظار</span>
                      )}
                      {test.status === 'failed' && (
                        <span className="text-red-600">فشل الاختبار</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* تنبيهات النظام */}
      {metrics.some(m => m.status === 'critical') && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="font-semibold mb-2">تحذيرات حرجة في النظام:</div>
            <ul className="list-disc list-inside space-y-1">
              {metrics
                .filter(m => m.status === 'critical')
                .map(m => (
                  <li key={m.id}>
                    {m.name}: {m.value.toFixed(1)}{m.unit} (تجاوز الحد الأقصى {m.threshold.critical}{m.unit})
                  </li>
                ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default AdvancedDiagnostics;
