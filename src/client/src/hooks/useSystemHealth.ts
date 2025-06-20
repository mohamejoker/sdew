
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useSystemHealth = () => {
  return useQuery({
    queryKey: ['system-health'],
    queryFn: async () => {
      // جلب آخر القراءات لكل مؤشر
      const { data: healthLogs } = await supabase
        .from('system_health_logs')
        .select('*')
        .order('recorded_at', { ascending: false })
        .limit(50);

      // تجميع البيانات حسب نوع المؤشر
      const metrics = healthLogs?.reduce((acc, log) => {
        if (!acc[log.metric_name]) {
          acc[log.metric_name] = [];
        }
        acc[log.metric_name].push(log);
        return acc;
      }, {} as Record<string, any[]>) || {};

      // حساب متوسطات ومؤشرات الصحة
      const healthSummary = Object.entries(metrics).map(([name, values]) => ({
        name,
        current: values[0]?.metric_value || 0,
        average: values.reduce((sum, v) => sum + v.metric_value, 0) / values.length,
        status: values[0]?.status || 'normal',
        unit: values[0]?.metric_unit || '',
        trend: values.length > 1 ? 
          (values[0].metric_value > values[1].metric_value ? 'up' : 'down') : 'stable'
      }));

      return healthSummary;
    },
    refetchInterval: 60000 // تحديث كل دقيقة
  });
};
