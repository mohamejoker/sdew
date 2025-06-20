
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, TrendingUp, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const AnalyticsPanel = () => {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      // Get user growth data
      const { data: userGrowth } = await supabase
        .from('profiles')
        .select('created_at')
        .order('created_at', { ascending: false })
        .limit(30);

      // Get transaction data
      const { data: transactions } = await supabase
        .from('transactions')
        .select('amount, created_at, status')
        .order('created_at', { ascending: false })
        .limit(100);

      // Process data for charts
      const userGrowthData = userGrowth?.reduce((acc, user) => {
        const date = new Date(user.created_at).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const revenueData = transactions?.reduce((acc, transaction) => {
        if (transaction.status === 'completed') {
          const date = new Date(transaction.created_at).toLocaleDateString();
          acc[date] = (acc[date] || 0) + (transaction.amount || 0);
        }
        return acc;
      }, {} as Record<string, number>) || {};

      return {
        userGrowthChart: Object.entries(userGrowthData).map(([date, count]) => ({ date, users: count })),
        revenueChart: Object.entries(revenueData).map(([date, revenue]) => ({ date, revenue })),
        totalRevenue: Object.values(revenueData).reduce((sum, revenue) => sum + revenue, 0),
        totalUsers: userGrowth?.length || 0,
        totalTransactions: transactions?.length || 0
      };
    }
  });

  if (isLoading) {
    return <div className="p-8 text-center">جاري تحميل التحليلات...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">تحليلات النظام</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              إجمالي المستخدمين
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics?.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              إجمالي الإيرادات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics?.totalRevenue} ريال</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              إجمالي المعاملات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics?.totalTransactions}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>نمو المستخدمين</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics?.userGrowthChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>الإيرادات اليومية</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics?.revenueChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
