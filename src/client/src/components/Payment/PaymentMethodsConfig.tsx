
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CreditCard, 
  Plus, 
  Edit, 
  Trash2, 
  Settings, 
  Clock, 
  Percent,
  Smartphone,
  Wallet,
  QrCode,
  DollarSign
} from 'lucide-react';
import { PaymentMethod, paymentService } from '@/services/payment/paymentService';
import { useToast } from '@/hooks/use-toast';

interface PaymentMethodFormData {
  name: string;
  type: 'card' | 'wallet' | 'bank' | 'crypto';
  icon: string;
  fees_percentage: number;
  processing_time: string;
  is_active: boolean;
  config: any;
}

const PaymentMethodsConfig = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<PaymentMethodFormData>({
    name: '',
    type: 'card',
    icon: 'CreditCard',
    fees_percentage: 0,
    processing_time: 'فوري',
    is_active: true,
    config: {}
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    setLoading(true);
    try {
      const data = await paymentService.getPaymentMethods();
      setPaymentMethods(data);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل طرق الدفع",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const iconOptions = [
    { value: 'CreditCard', label: 'بطاقة ائتمان', icon: CreditCard },
    { value: 'Smartphone', label: 'هاتف ذكي', icon: Smartphone },
    { value: 'Wallet', label: 'محفظة', icon: Wallet },
    { value: 'QrCode', label: 'رمز QR', icon: QrCode },
    { value: 'DollarSign', label: 'دولار', icon: DollarSign },
  ];

  const typeOptions = [
    { value: 'card', label: 'بطاقة ائتمان/خصم' },
    { value: 'wallet', label: 'محفظة إلكترونية' },
    { value: 'bank', label: 'تحويل بنكي' },
    { value: 'crypto', label: 'عملة رقمية' },
  ];

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'card',
      icon: 'CreditCard',
      fees_percentage: 0,
      processing_time: 'فوري',
      is_active: true,
      config: {}
    });
    setEditingMethod(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال اسم طريقة الدفع",
        variant: "destructive"
      });
      return;
    }

    try {
      if (editingMethod) {
        await paymentService.updatePaymentMethod(editingMethod.id, formData);
        toast({
          title: "تم التحديث",
          description: "تم تحديث طريقة الدفع بنجاح",
        });
      } else {
        await paymentService.createPaymentMethod(formData);
        toast({
          title: "تم الإنشاء",
          description: "تم إنشاء طريقة الدفع بنجاح",
        });
      }

      await fetchPaymentMethods();
      resetForm();
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error saving payment method:', error);
      toast({
        title: "خطأ",
        description: "فشل في حفظ طريقة الدفع",
        variant: "destructive"
      });
    }
  };

  const toggleMethodStatus = async (method: PaymentMethod) => {
    try {
      await paymentService.updatePaymentMethod(method.id, {
        ...method,
        is_active: !method.is_active
      });
      
      toast({
        title: "تم التحديث",
        description: `تم ${method.is_active ? 'تعطيل' : 'تفعيل'} طريقة الدفع`,
      });
      
      await fetchPaymentMethods();
    } catch (error) {
      console.error('Error toggling payment method status:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحديث حالة طريقة الدفع",
        variant: "destructive"
      });
    }
  };

  const getIcon = (iconName: string) => {
    const iconOption = iconOptions.find(opt => opt.value === iconName);
    return iconOption ? iconOption.icon : CreditCard;
  };

  const getTypeLabel = (type: string) => {
    const typeOption = typeOptions.find(opt => opt.value === type);
    return typeOption ? typeOption.label : type;
  };

  const PaymentMethodForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">اسم طريقة الدفع *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="مثال: فيزا/ماستركارد"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">النوع</Label>
          <Select 
            value={formData.type} 
            onValueChange={(value: any) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {typeOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="icon">الأيقونة</Label>
          <Select 
            value={formData.icon} 
            onValueChange={(value) => setFormData({ ...formData, icon: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {iconOptions.map(option => {
                const IconComponent = option.icon;
                return (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4" />
                      {option.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fees_percentage">نسبة الرسوم (%)</Label>
          <Input
            id="fees_percentage"
            type="number"
            value={formData.fees_percentage}
            onChange={(e) => setFormData({ ...formData, fees_percentage: Number(e.target.value) })}
            min="0"
            max="100"
            step="0.01"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="processing_time">وقت المعالجة</Label>
        <Input
          id="processing_time"
          value={formData.processing_time}
          onChange={(e) => setFormData({ ...formData, processing_time: e.target.value })}
          placeholder="مثال: فوري، خلال دقائق، 24 ساعة"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="is_active"
          checked={formData.is_active}
          onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
        />
        <Label htmlFor="is_active">تفعيل طريقة الدفع</Label>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          {editingMethod ? 'تحديث طريقة الدفع' : 'إنشاء طريقة الدفع'}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => {
            resetForm();
            setShowCreateForm(false);
          }}
        >
          إلغاء
        </Button>
      </div>
    </form>
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">إعدادات طرق الدفع</h2>
          <p className="text-gray-600">إدارة وتكوين طرق الدفع المتاحة</p>
        </div>
        
        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setShowCreateForm(true); }}>
              <Plus className="h-4 w-4 ml-2" />
              إضافة طريقة دفع
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingMethod ? 'تعديل طريقة الدفع' : 'إضافة طريقة دفع جديدة'}
              </DialogTitle>
            </DialogHeader>
            <PaymentMethodForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <CreditCard className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <div className="text-2xl font-bold">{paymentMethods.length}</div>
              <div className="text-sm text-gray-600">إجمالي الطرق</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {paymentMethods.filter(m => m.is_active).length}
              </div>
              <div className="text-sm text-gray-600">نشط</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">
                {paymentMethods.filter(m => !m.is_active).length}
              </div>
              <div className="text-sm text-gray-600">معطل</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <Percent className="h-8 w-8 mx-auto text-orange-600 mb-2" />
              <div className="text-2xl font-bold">
                {paymentMethods.length > 0 
                  ? (paymentMethods.reduce((sum, m) => sum + m.fees_percentage, 0) / paymentMethods.length).toFixed(2)
                  : '0.00'
                }%
              </div>
              <div className="text-sm text-gray-600">متوسط الرسوم</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* قائمة طرق الدفع */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            طرق الدفع المكونة
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : paymentMethods.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              لا توجد طرق دفع مكونة
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paymentMethods.map((method) => {
                const IconComponent = getIcon(method.icon);
                return (
                  <div key={method.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium">{method.name}</h3>
                          <p className="text-sm text-gray-600">{getTypeLabel(method.type)}</p>
                        </div>
                      </div>
                      <Badge variant={method.is_active ? 'default' : 'secondary'}>
                        {method.is_active ? 'نشط' : 'معطل'}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">الرسوم:</span>
                        <span className="font-medium">{method.fees_percentage}%</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">وقت المعالجة:</span>
                        <span className="font-medium">{method.processing_time}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => {
                          setEditingMethod(method);
                          setFormData({
                            name: method.name,
                            type: method.type,
                            icon: method.icon,
                            fees_percentage: method.fees_percentage,
                            processing_time: method.processing_time,
                            is_active: method.is_active,
                            config: method.config
                          });
                          setShowCreateForm(true);
                        }}
                      >
                        <Edit className="h-3 w-3 ml-1" />
                        تعديل
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleMethodStatus(method)}
                      >
                        <Switch checked={method.is_active} />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentMethodsConfig;
