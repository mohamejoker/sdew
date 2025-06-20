
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Search, 
  MapPin, 
  Clock, 
  DollarSign,
  Users,
  Briefcase,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
  status: 'active' | 'closed' | 'draft';
  applications: number;
}

const JobManagement = () => {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'مطور واجهات أمامية',
      company: 'شركة التقنية المتقدمة',
      location: 'الرياض، السعودية',
      type: 'full-time',
      salary: '8000 - 12000 ريال',
      description: 'نبحث عن مطور واجهات أمامية ماهر للانضمام إلى فريقنا',
      requirements: ['React', 'TypeScript', 'Tailwind CSS'],
      postedDate: '2025-01-10',
      status: 'active',
      applications: 15
    },
    {
      id: '2',
      title: 'مصمم UX/UI',
      company: 'استوديو الإبداع',
      location: 'دبي، الإمارات',
      type: 'remote',
      salary: '6000 - 10000 ريال',
      description: 'مصمم UX/UI مبدع لتصميم تجارب رقمية مميزة',
      requirements: ['Figma', 'Adobe XD', 'Prototyping'],
      postedDate: '2025-01-08',
      status: 'active',
      applications: 8
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-green-100 text-green-800';
      case 'part-time': return 'bg-blue-100 text-blue-800';
      case 'contract': return 'bg-orange-100 text-orange-800';
      case 'remote': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة الوظائف</h1>
          <p className="text-gray-600">نشر وإدارة الوظائف المتاحة</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          إضافة وظيفة جديدة
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="البحث عن الوظائف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الوظائف</p>
                <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
              </div>
              <Briefcase className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الوظائف النشطة</p>
                <p className="text-2xl font-bold text-green-600">
                  {jobs.filter(j => j.status === 'active').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي المتقدمين</p>
                <p className="text-2xl font-bold text-purple-600">
                  {jobs.reduce((sum, job) => sum + job.applications, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">متوسط الراتب</p>
                <p className="text-2xl font-bold text-orange-600">9000 ريال</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{job.title}</CardTitle>
                  <p className="text-gray-600 text-sm mb-2">{job.company}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(job.status)}>
                    {job.status === 'active' ? 'نشطة' : 
                     job.status === 'closed' ? 'مغلقة' : 'مسودة'}
                  </Badge>
                  <Badge className={getTypeColor(job.type)}>
                    {job.type === 'full-time' ? 'دوام كامل' :
                     job.type === 'part-time' ? 'دوام جزئي' :
                     job.type === 'contract' ? 'عقد' : 'عن بُعد'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="font-medium">{job.salary}</span>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2">
                  {job.description}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {job.requirements.slice(0, 3).map((req, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {req}
                    </Badge>
                  ))}
                  {job.requirements.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{job.requirements.length - 3}
                    </Badge>
                  )}
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    <span>{job.applications} متقدم</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setSelectedJob(job)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              لا توجد وظائف
            </h3>
            <p className="text-gray-600">
              لم يتم العثور على وظائف تطابق البحث
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JobManagement;
