
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

const InteractiveCharts = () => {
  const salesData = [
    { month: 'يناير', revenue: 12000, orders: 120 },
    { month: 'فبراير', revenue: 15000, orders: 150 },
    { month: 'مارس', revenue: 18000, orders: 180 },
    { month: 'أبريل', revenue: 22000, orders: 220 },
    { month: 'مايو', revenue: 25000, orders: 250 },
    { month: 'يونيو', revenue: 28000, orders: 280 },
  ];

  const platformData = [
    { name: 'إنستقرام', value: 45, color: '#E1306C' },
    { name: 'تيك توك', value: 30, color: '#000000' },
    { name: 'يوتيوب', value: 15, color: '#FF0000' },
    { name: 'فيسبوك', value: 10, color: '#1877F2' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* مخطط الإيرادات */}
      <Card>
        <CardHeader>
          <CardTitle>نمو الإيرادات</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* مخطط الطلبات */}
      <Card>
        <CardHeader>
          <CardTitle>عدد الطلبات الشهرية</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* مخطط المنصات */}
      <Card>
        <CardHeader>
          <CardTitle>توزيع الطلبات حسب المنصة</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={platformData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {platformData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* مخطط الأداء */}
      <Card>
        <CardHeader>
          <CardTitle>أداء النظام</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="orders" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveCharts;
