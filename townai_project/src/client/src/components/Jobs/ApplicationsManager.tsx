
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  Download, 
  Calendar,
  MapPin,
  Star,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

interface Application {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  appliedDate: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  resumeUrl: string;
  experience: string;
  location: string;
  rating?: number;
}

const ApplicationsManager = () => {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      applicantName: 'أحمد محمد',
      email: 'ahmed@example.com',
      phone: '+966501234567',
      appliedDate: '2025-01-12',
      status: 'pending',
      resumeUrl: '/resume.pdf',
      experience: '3 سنوات',
      location: 'الرياض'
    },
    {
      id: '2',
      applicantName: 'فاطمة علي',
      email: 'fatima@example.com',
      phone: '+966509876543',
      appliedDate: '2025-01-11',
      status: 'reviewed',
      resumeUrl: '/resume2.pdf',
      experience: '5 سنوات',
      location: 'جدة',
      rating: 4
    }
  ]);

  const updateApplicationStatus = (id: string, status: Application['status']) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id ? { ...app, status } : app
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'قيد المراجعة';
      case 'reviewed': return 'تمت المراجعة';
      case 'accepted': return 'مقبول';
      case 'rejected': return 'مرفوض';
      default: return status;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">طلبات التوظيف</h1>
          <p className="text-gray-600">إدارة ومراجعة طلبات المتقدمين</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الطلبات</p>
                <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
              </div>
              <User className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">قيد المراجعة</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {applications.filter(app => app.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">مقبول</p>
                <p className="text-2xl font-bold text-green-600">
                  {applications.filter(app => app.status === 'accepted').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">مرفوض</p>
                <p className="text-2xl font-bold text-red-600">
                  {applications.filter(app => app.status === 'rejected').length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.map((application) => (
          <Card key={application.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {application.applicantName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {application.applicantName}
                      </h3>
                      <Badge className={getStatusColor(application.status)}>
                        {getStatusText(application.status)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{application.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{application.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{application.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{application.appliedDate}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center gap-4">
                      <span className="text-sm font-medium">
                        الخبرة: {application.experience}
                      </span>
                      {application.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm">{application.rating}/5</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    تحميل السيرة
                  </Button>
                  
                  {application.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => updateApplicationStatus(application.id, 'accepted')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        قبول
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => updateApplicationStatus(application.id, 'rejected')}
                      >
                        رفض
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {applications.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              لا توجد طلبات توظيف
            </h3>
            <p className="text-gray-600">
              لم يتم استلام أي طلبات توظيف بعد
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ApplicationsManager;
