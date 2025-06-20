
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface ReportTemplate {
  id: string;
  name: string;
  description?: string;
  report_type: string;
  created_at: string;
  updated_at: string;
}

interface GeneratedReport {
  id: string;
  title: string;
  status: string;
  created_at: string;
  download_count: number;
  report_templates?: ReportTemplate;
}

export const useAdvancedReports = () => {
  const queryClient = useQueryClient();

  const templates = useQuery({
    queryKey: ['reportTemplates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('report_templates')
        .select('*')
        .eq('is_active', true);
      
      if (error) throw error;
      return data as ReportTemplate[];
    }
  });

  const generatedReports = useQuery({
    queryKey: ['generatedReports'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('generated_reports')
        .select(`
          *,
          report_templates (name, report_type)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as GeneratedReport[];
    }
  });

  const generateReport = useMutation({
    mutationFn: async ({ templateId, parameters }: { templateId: string; parameters: any }) => {
      const { data, error } = await supabase
        .from('generated_reports')
        .insert({
          template_id: templateId,
          title: `تقرير - ${new Date().toLocaleDateString('ar')}`,
          status: 'generating',
          parameters
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // محاكاة معالجة التقرير
      setTimeout(async () => {
        await supabase
          .from('generated_reports')
          .update({ status: 'completed' })
          .eq('id', data.id);
        
        queryClient.invalidateQueries({ queryKey: ['generatedReports'] });
      }, 3000);
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['generatedReports'] });
    }
  });

  return {
    templates: templates.data,
    generatedReports: generatedReports.data,
    generateReport
  };
};
