
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ServiceFormProps {
  onClose: () => void;
  service?: any;
  onSubmit?: (values: any) => void;
  initialData?: any;
  isLoading?: boolean;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ 
  service, 
  onClose, 
  onSubmit, 
  initialData, 
  isLoading = false 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    features: [] as string[],
    gradient_class: 'from-sky-400 to-blue-500',
    button_text: 'اطلب الآن',
    is_active: true,
    is_popular: false
  });
  const [newFeature, setNewFeature] = useState('');
  const queryClient = useQueryClient();

  useEffect(() => {
    const dataToUse = service || initialData;
    if (dataToUse) {
      setFormData({
        title: dataToUse.title || '',
        price: dataToUse.price || '',
        features: dataToUse.features || [],
        gradient_class: dataToUse.gradient_class || 'from-sky-400 to-blue-500',
        button_text: dataToUse.button_text || 'اطلب الآن',
        is_active: dataToUse.is_active ?? true,
        is_popular: dataToUse.is_popular ?? false
      });
    }
  }, [service, initialData]);

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase
        .from('services')
        .insert([data]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('تم إنشاء الخدمة بنجاح!');
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      queryClient.invalidateQueries({ queryKey: ['service-stats'] });
      onClose();
    },
    onError: (error: Error) => {
      toast.error(`حدث خطأ أثناء إنشاء الخدمة: ${error.message}`);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase
        .from('services')
        .update(data)
        .eq('id', (service || initialData).id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('تم تحديث الخدمة بنجاح!');
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      queryClient.invalidateQueries({ queryKey: ['service-stats'] });
      onClose();
    },
    onError: (error: Error) => {
      toast.error(`حدث خطأ أثناء تحديث الخدمة: ${error.message}`);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price) {
      toast.error('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    // استخدام onSubmit إذا كان متوفراً، وإلا استخدام المتغيرات المحلية
    if (onSubmit) {
      onSubmit(formData);
    } else if (service || initialData) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const gradientOptions = [
    { value: 'from-sky-400 to-blue-500', label: 'أزرق', color: 'bg-gradient-to-r from-sky-400 to-blue-500' },
    { value: 'from-purple-400 to-purple-600', label: 'بنفسجي', color: 'bg-gradient-to-r from-purple-400 to-purple-600' },
    { value: 'from-green-400 to-green-600', label: 'أخضر', color: 'bg-gradient-to-r from-green-400 to-green-600' },
    { value: 'from-orange-400 to-orange-600', label: 'برتقالي', color: 'bg-gradient-to-r from-orange-400 to-orange-600' },
    { value: 'from-red-400 to-red-600', label: 'أحمر', color: 'bg-gradient-to-r from-red-400 to-red-600' },
    { value: 'from-pink-400 to-pink-600', label: 'وردي', color: 'bg-gradient-to-r from-pink-400 to-pink-600' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">عنوان الخدمة *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="اكتب عنوان الخدمة"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">السعر *</Label>
          <Input
            id="price"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
            placeholder="مثال: من 10 ر.س"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="button_text">نص الزر</Label>
        <Input
          id="button_text"
          value={formData.button_text}
          onChange={(e) => setFormData(prev => ({ ...prev, button_text: e.target.value }))}
          placeholder="اطلب الآن"
        />
      </div>

      <div className="space-y-2">
        <Label>اللون التدرجي</Label>
        <div className="grid grid-cols-3 gap-2">
          {gradientOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, gradient_class: option.value }))}
              className={`p-3 rounded-lg ${option.color} text-white font-medium border-2 ${
                formData.gradient_class === option.value ? 'border-white' : 'border-transparent'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>المميزات</Label>
        <div className="flex gap-2">
          <Input
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="أضف ميزة جديدة"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
          />
          <Button type="button" onClick={addFeature} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.features.map((feature, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {feature}
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch
            id="is_active"
            checked={formData.is_active}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
          />
          <Label htmlFor="is_active">تفعيل الخدمة</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="is_popular"
            checked={formData.is_popular}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_popular: checked }))}
          />
          <Label htmlFor="is_popular">خدمة شائعة</Label>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          إلغاء
        </Button>
        <Button 
          type="submit" 
          disabled={isLoading || createMutation.isPending || updateMutation.isPending}
        >
          {(service || initialData) ? 'تحديث الخدمة' : 'إضافة الخدمة'}
        </Button>
      </div>
    </form>
  );
};

export default ServiceForm;
