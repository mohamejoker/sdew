
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { paymentMethodSchema, PaymentMethodFormValues } from '@/lib/validators';
import { EgyptianPaymentConfig } from '@/services/payment/egyptianPaymentConfigService';

interface PaymentMethodFormProps {
  method?: EgyptianPaymentConfig | null;
  onSubmit: (data: PaymentMethodFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
  method,
  onSubmit,
  onCancel,
  isLoading
}) => {
  const form = useForm<PaymentMethodFormValues>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      provider_name: method?.provider_name || '',
      display_name: method?.display_name || '',
      prefixes: method?.prefixes || [],
      fees_percentage: method?.fees_percentage || 0,
      is_active: method?.is_active ?? true,
      manual_mode: method?.manual_mode ?? true,
      auto_mode: method?.auto_mode ?? false,
      confirmation_timeout: method?.confirmation_timeout || 300,
      icon_name: method?.icon_name || 'CreditCard',
      color_class: method?.color_class || 'bg-blue-500',
      settings: method?.settings || {}
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="provider_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم المزود</FormLabel>
                <FormControl>
                  <Input placeholder="فودافون كاش..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="display_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الاسم المعروض</FormLabel>
                <FormControl>
                  <Input placeholder="فودافون كاش" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="prefixes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>البادئات (مفصولة بفاصلة)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="010, 011, 012" 
                  value={Array.isArray(field.value) ? field.value.join(', ') : field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fees_percentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نسبة الرسوم (%)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="2.5" 
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmation_timeout"
            render={({ field }) => (
              <FormItem>
                <FormLabel>مهلة التأكيد (ثانية)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="300" 
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="is_active"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel>مفعل</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="manual_mode"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel>وضع يدوي</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="auto_mode"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel>وضع تلقائي</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            إلغاء
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'جاري الحفظ...' : 'حفظ'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PaymentMethodForm;
