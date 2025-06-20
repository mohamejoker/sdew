
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Eye, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Info,
  Accessibility,
  Zap
} from 'lucide-react';
import { accessibilityService, AccessibilityReport } from '@/services/accessibility/accessibilityService';

const AccessibilityChecker = () => {
  const [report, setReport] = useState<AccessibilityReport | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const runAccessibilityCheck = async () => {
    setIsChecking(true);
    try {
      const result = await accessibilityService.checkPageAccessibility();
      setReport(result);
    } catch (error) {
      console.error('خطأ في فحص إمكانية الوصول:', error);
    } finally {
      setIsChecking(false);
    }
  };

  const applyFixes = () => {
    accessibilityService.applyAccessibilityFixes();
    // إعادة تشغيل الفحص بعد التطبيق
    setTimeout(() => {
      runAccessibilityCheck();
    }, 1000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getIssueIcon = (severity: string) => {
    switch (severity) {
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'notice':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Accessibility className="h-8 w-8 text-blue-600" />
          <h2 className="text-3xl font-bold">فحص إمكانية الوصول</h2>
        </div>
        <div className="flex gap-2">
          <Button onClick={runAccessibilityCheck} disabled={isChecking}>
            <Eye className="h-4 w-4 mr-2" />
            {isChecking ? 'جاري الفحص...' : 'فحص الصفحة'}
          </Button>
          <Button onClick={applyFixes} variant="outline">
            <Zap className="h-4 w-4 mr-2" />
            تطبيق التحسينات
          </Button>
        </div>
      </div>

      {report && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* النتيجة العامة */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>النتيجة العامة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(report.score)}`}>
                  {report.score}/100
                </div>
                <p className="text-gray-600">نقاط إمكانية الوصول</p>
              </div>

              <Progress 
                value={report.score} 
                className="h-3"
              />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>إجمالي الفحوصات:</span>
                  <span className="font-medium">{report.totalChecks}</span>
                </div>
                <div className="flex justify-between">
                  <span>الفحوصات الناجحة:</span>
                  <span className="font-medium text-green-600">{report.passedChecks}</span>
                </div>
                <div className="flex justify-between">
                  <span>الأخطاء:</span>
                  <span className="font-medium text-red-600">{report.errors.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>التحذيرات:</span>
                  <span className="font-medium text-yellow-600">{report.warnings.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* تفاصيل المشاكل */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>تفاصيل الفحص</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* الأخطاء */}
                {report.errors.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                      <XCircle className="h-5 w-5" />
                      أخطاء ({report.errors.length})
                    </h4>
                    <div className="space-y-2">
                      {report.errors.map((error, index) => (
                        <div key={index} className="p-3 bg-red-50 rounded border-l-4 border-red-500">
                          <div className="flex items-start gap-3">
                            {getIssueIcon(error.severity)}
                            <div className="flex-1">
                              <p className="font-medium text-red-900">{error.name}</p>
                              <p className="text-sm text-red-700">{error.description}</p>
                              {error.details && (
                                <p className="text-xs text-red-600 mt-1">{error.details}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* التحذيرات */}
                {report.warnings.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-yellow-600 mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      تحذيرات ({report.warnings.length})
                    </h4>
                    <div className="space-y-2">
                      {report.warnings.map((warning, index) => (
                        <div key={index} className="p-3 bg-yellow-50 rounded border-l-4 border-yellow-500">
                          <div className="flex items-start gap-3">
                            {getIssueIcon(warning.severity)}
                            <div className="flex-1">
                              <p className="font-medium text-yellow-900">{warning.name}</p>
                              <p className="text-sm text-yellow-700">{warning.description}</p>
                              {warning.details && (
                                <p className="text-xs text-yellow-600 mt-1">{warning.details}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* الملاحظات */}
                {report.notices.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-blue-600 mb-3 flex items-center gap-2">
                      <Info className="h-5 w-5" />
                      ملاحظات ({report.notices.length})
                    </h4>
                    <div className="space-y-2">
                      {report.notices.map((notice, index) => (
                        <div key={index} className="p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                          <div className="flex items-start gap-3">
                            {getIssueIcon(notice.severity)}
                            <div className="flex-1">
                              <p className="font-medium text-blue-900">{notice.name}</p>
                              <p className="text-sm text-blue-700">{notice.description}</p>
                              {notice.details && (
                                <p className="text-xs text-blue-600 mt-1">{notice.details}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* الاقتراحات */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>اقتراحات التحسين</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {report.suggestions.map((suggestion, index) => (
                  <div key={index} className="p-4 bg-green-50 rounded border border-green-200">
                    <p className="text-green-800">{suggestion}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {!report && (
        <Card>
          <CardContent className="text-center py-12">
            <Accessibility className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              فحص إمكانية الوصول
            </h3>
            <p className="text-gray-500 mb-6">
              اضغط على "فحص الصفحة" لبدء تحليل إمكانية الوصول
            </p>
            <Button onClick={runAccessibilityCheck} disabled={isChecking}>
              <Eye className="h-4 w-4 mr-2" />
              {isChecking ? 'جاري الفحص...' : 'بدء الفحص'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AccessibilityChecker;
