
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';
import { Target, TrendingUp, Award, Calendar, Users, Heart, Eye, MessageSquare } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: string;
  status: 'active' | 'completed' | 'overdue';
  platform: string;
}

const PerformanceTracker = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('followers');

  const goals: Goal[] = [
    {
      id: '1',
      title: 'الوصول إلى 10K متابع على Instagram',
      target: 10000,
      current: 8500,
      deadline: '2024-03-01',
      status: 'active',
      platform: 'instagram'
    },
    {
      id: '2',
      title: 'تحقيق 5% معدل تفاعل',
      target: 5,
      current: 4.2,
      deadline: '2024-02-15',
      status: 'active',
      platform: 'facebook'
    },
    {
      id: '3',
      title: '1000 إعجاب يومي',
      target: 1000,
      current: 1200,
      deadline: '2024-01-31',
      status: 'completed',
      platform: 'instagram'
    }
  ];

  const performanceData = [
    { date: '2024-01-01', followers: 7800, engagement: 3.8, likes: 850, comments: 120 },
    { date: '2024-01-05', followers: 8000, engagement: 4.0, likes: 920, comments: 135 },
    { date: '2024-01-10', followers: 8200, engagement: 4.1, likes: 980, comments: 145 },
    { date: '2024-01-15', followers: 8500, engagement: 4.2, likes: 1050, comments: 160 },
    { date: '2024-01-20', followers: 8750, engagement: 4.3, likes: 1120, comments: 175 },
    { date: '2024-01-25', followers: 8900, engagement: 4.4, likes: 1180, comments: 185 },
    { date: '2024-01-30', followers: 9100, engagement: 4.5, likes: 1250, comments: 200 },
  ];

  const radialData = [
    { name: 'المتابعون', value: 85, fill: '#3B82F6' },
    { name: 'التفاعل', value: 84, fill: '#10B981' },
    { name: 'المحتوى', value: 78, fill: '#F59E0B' },
    { name: 'النمو', value: 92, fill: '#EF4444' },
  ];

  const achievements = [
    {
      id: '1',
      title: 'أول 1000 متابع',
      description: 'تم تحقيق أول 1000 متابع',
      date: '2023-12-15',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      id: '2',
      title: 'معدل تفاعل ممتاز',
      description: 'تحقيق معدل تفاعل أعلى من 4%',
      date: '2024-01-10',
      icon: Heart,
      color: 'bg-green-500'
    },
    {
      id: '3',
      title: 'محتوى فيروسي',
      description: 'منشور حقق أكثر من 10K مشاهدة',
      date: '2024-01-20',
      icon: Eye,
      color: 'bg-purple-500'
    }
  ];

  const getGoalProgress = (goal: Goal) => {
    return Math.min((goal.current / goal.target) * 100, 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">تتبع الأداء</h2>
          <p className="text-gray-600">راقب تقدمك نحو تحقيق أهدافك</p>
        </div>
        
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="followers">المتابعون</SelectItem>
              <SelectItem value="engagement">التفاعل</SelectItem>
              <SelectItem value="likes">الإعجابات</SelectItem>
              <SelectItem value="comments">التعليقات</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 أيام</SelectItem>
              <SelectItem value="30d">30 يوم</SelectItem>
              <SelectItem value="90d">90 يوم</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
            <TrendingUp className="h-5 w-5" />
            <span>أداء المقاييس</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Goals */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <Target className="h-5 w-5" />
                <span>الأهداف الحالية</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {goals.map((goal) => (
                <div key={goal.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">{goal.title}</h3>
                    <Badge className={getStatusColor(goal.status)}>
                      {goal.status === 'completed' ? 'مكتمل' : 
                       goal.status === 'active' ? 'نشط' : 'متأخر'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>التقدم: {formatNumber(goal.current)} / {formatNumber(goal.target)}</span>
                      <span>{Math.round(getGoalProgress(goal))}%</span>
                    </div>
                    <Progress value={getGoalProgress(goal)} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>المنصة: {goal.platform}</span>
                      <span>الموعد النهائي: {new Date(goal.deadline).toLocaleDateString('ar-SA')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Performance Overview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>نظرة عامة على الأداء</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={radialData}>
                    <RadialBar dataKey="value" cornerRadius={10} fill="#8884d8" />
                    <Tooltip />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <Award className="h-5 w-5" />
                <span>الإنجازات</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className={`w-10 h-10 rounded-full ${achievement.color} flex items-center justify-center`}>
                    <achievement.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{achievement.title}</p>
                    <p className="text-xs text-gray-600">{achievement.description}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(achievement.date).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PerformanceTracker;
