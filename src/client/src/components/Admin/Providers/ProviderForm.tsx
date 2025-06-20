
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { providerFormSchema, ProviderFormValues } from '@/lib/validators';
import { Provider } from '@/services/admin/realProvidersService';

interface ProviderFormProps {
  onSubmit: (data: ProviderFormValues) => void;
  initialData?: Provider | null;
  isLoading?: boolean;
}

const ProviderForm: React.FC<ProviderFormProps> = ({ onSubmit, initialData, isLoading }) => {
  const form = useForm<ProviderFormValues>({
    resolver: zodResolver(providerFormSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      api_url: initialData?.api_url || '',
      api_key: initialData?.api_key || '',
      is_active: initialData?.is_active ?? true,
      settings: initialData?.settings || {}
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم المورد</FormLabel>
              <FormControl>
                <Input placeholder="اسم المورد..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الوصف</FormLabel>
              <FormControl>
                <Textarea placeholder="وصف المورد..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="api_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رابط API</FormLabel>
              <FormControl>
                <Input placeholder="https://api.provider.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="api_key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>مفتاح API</FormLabel>
              <FormControl>
                <Input type="password" placeholder="API Key..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>مفعل</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'جاري الحفظ...' : 'حفظ'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProviderForm;
