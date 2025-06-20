
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, Download, Calendar, Filter, 
  BarChart3, Users, DollarSign, Activity 
} from 'lucide-react';
import { useAdvancedReports } from '@/hooks/useAdvancedReports';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import { format } from 'date-fns';

const AdvancedReportsManager = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [reportParameters, setReportParameters] = useState({});

  const { templates, generatedReports, generateReport } = useAdvancedReports();

  const handleGenerateReport = async (templateId: string) => {
    try {
      await generateReport.mutateAsync({
        templateId,
        parameters: {
          ...reportParameters,
          generated_at: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('خطأ في توليد التقرير:', error);
    }
  };

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'sales': return DollarSign;
      case 'users': return Users;
      case 'performance': return Activity;
      default: return BarChart3;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'generating': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'مكتمل';
      case 'pending': return 'في الانتظار';
      case 'generating': return 'قيد الإنشاء';
      case 'failed': return 'فشل';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
              <FileText className="h-6 w-6 text-white" />
            </div>
            إدارة التقارير المتقدمة
          </h1>
          <p className="text-gray-600 mt-2">إنشاء وإدارة التقارير القابلة للتصدير</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            تقارير مجدولة
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            فلترة
          </Button>
        </div>
      </div>

      {/* Report Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates?.map((template) => {
          const IconComponent = getReportIcon(template.report_type);
          return (
            <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">نوع التقرير</span>
                    <Badge variant="outline">{template.report_type}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">آخر تحديث</span>
                    <span className="text-sm">
                      {format(new Date(template.updated_at), 'dd/MM/yyyy')}
                    </span>
                  </div>
                  <Button 
                    onClick={() => handleGenerateReport(template.id)}
                    disabled={generateReport.isPending}
                    className="w-full mt-4"
                  >
                    {generateReport.isPending ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <>
                        <FileText className="h-4 w-4 mr-2" />
                        إنشاء التقرير
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Generated Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            التقارير المُنشأة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التقرير</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">النوع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تاريخ الإنشاء</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التحميلات</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {generatedReports?.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <div>
                          <h3 className="font-medium text-gray-900">{report.title}</h3>
                          <p className="text-sm text-gray-500">
                            {report.report_templates?.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline">
                        {report.report_templates?.report_type}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={getStatusColor(report.status)}>
                        {getStatusText(report.status)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {format(new Date(report.created_at), 'dd/MM/yyyy HH:mm')}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {report.download_count}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {report.status === 'completed' && (
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        <Button size="sm" variant="ghost">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedReportsManager;
