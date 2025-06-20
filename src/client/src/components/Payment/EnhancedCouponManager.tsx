
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Gift, 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Calendar, 
  Users, 
  Percent,
  DollarSign,
  Search,
  Filter
} from 'lucide-react';
import { Coupon, paymentService } from '@/services/payment/paymentService';
import { useToast } from '@/hooks/use-toast';

interface CouponFormData {
  code: string;
  description: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_amount: number;
  max_uses?: number;
  category: string;
  expires_at?: string;
  is_active: boolean;
}

const EnhancedCouponManager = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState('all');
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<CouponFormData>({
    code: '',
    description: '',
    discount_type: 'percentage',
    discount_value: 0,
    min_amount: 0,
    max_uses: undefined,
    category: '',
    expires_at: undefined,
    is_active: true
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const data = await paymentService.getCoupons();
      setCoupons(data);
    } catch (error) {
      console.error('Error fetching coupons:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل الكوبونات",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = 
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.category?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = 
      filterActive === 'all' || 
      (filterActive === 'active' && coupon.is_active) ||
      (filterActive === 'inactive' && !coupon.is_active) ||
      (filterActive === 'expired' && coupon.expires_at && new Date(coupon.expires_at) < new Date());

    return matchesSearch && matchesFilter;
  });

  const resetForm = () => {
    setFormData({
      code: '',
      description: '',
      discount_type: 'percentage',
      discount_value: 0,
      min_amount: 0,
      max_uses: undefined,
      category: '',
      expires_at: undefined,
      is_active: true
    });
    setEditingCoupon(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.code.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال كود الكوبون",
        variant: "destructive"
      });
      return;
    }

    try {
      const couponData = {
        ...formData,
        code: formData.code.toUpperCase().replace(/\s/g, ''),
        expires_at: formData.expires_at || undefined
      };

      if (editingCoupon) {
        // تحديث الكوبون (سنحتاج إلى إضافة هذه الوظيفة لاحقاً)
        toast({
          title: "قيد التطوير",
          description: "وظيفة التحديث قيد التطوير",
          variant: "destructive"
        });
      } else {
        await paymentService.createCoupon(couponData);
        toast({
          title: "تم الإنشاء",
          description: "تم إنشاء الكوبون بنجاح",
        });
      }

      await fetchCoupons();
      resetForm();
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error saving coupon:', error);
      toast({
        title: "خطأ",
        description: "فشل في حفظ الكوبون",
        variant: "destructive"
      });
    }
  };

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, code: result });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "تم النسخ",
      description: "تم نسخ الكود إلى الحافظة",
    });
  };

  const getCouponStatus = (coupon: Coupon) => {
    if (!coupon.is_active) return { label: 'معطل', variant: 'secondary' as const };
    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) return { label: 'منتهي الصلاحية', variant: 'destructive' as const };
    if (coupon.max_uses && coupon.current_uses >= coupon.max_uses) return { label: 'مستنفد', variant: 'outline' as const };
    return { label: 'نشط', variant: 'default' as const };
  };

  const CouponForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="code">كود الكوبون *</Label>
          <div className="flex gap-2">
            <Input
              id="code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              placeholder="مثال: SAVE20"
              required
            />
            <Button type="button" variant="outline" onClick={generateRandomCode}>
              عشوائي
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">الفئة</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="مثال: عروض خاصة"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">الوصف</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="وصف الكوبون..."
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="discount_type">نوع الخصم</Label>
          <Select 
            value={formData.discount_type} 
            onValueChange={(value: 'percentage' | 'fixed') => 
              setFormData({ ...formData, discount_type: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="percentage">نسبة مئوية (%)</SelectItem>
              <SelectItem value="fixed">مبلغ ثابت</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="discount_value">
            قيمة الخصم {formData.discount_type === 'percentage' ? '(%)' : '(ريال)'}
          </Label>
          <Input
            id="discount_value"
            type="number"
            value={formData.discount_value}
            onChange={(e) => setFormData({ ...formData, discount_value: Number(e.target.value) })}
            min="0"
            max={formData.discount_type === 'percentage' ? 100 : undefined}
            step={formData.discount_type === 'percentage' ? 1 : 0.01}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="min_amount">الحد الأدنى للمبلغ (ريال)</Label>
          <Input
            id="min_amount"
            type="number"
            value={formData.min_amount}
            onChange={(e) => setFormData({ ...formData, min_amount: Number(e.target.value) })}
            min="0"
            step="0.01"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="max_uses">الحد الأقصى للاستخدامات</Label>
          <Input
            id="max_uses"
            type="number"
            value={formData.max_uses || ''}
            onChange={(e) => setFormData({ ...formData, max_uses: e.target.value ? Number(e.target.value) : undefined })}
            min="1"
            placeholder="غير محدود"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="expires_at">تاريخ انتهاء الصلاحية</Label>
        <Input
          id="expires_at"
          type="datetime-local"
          value={formData.expires_at || ''}
          onChange={(e) => setFormData({ ...formData, expires_at: e.target.value || undefined })}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="is_active"
          checked={formData.is_active}
          onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
        />
        <Label htmlFor="is_active">تفعيل الكوبون</Label>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          {editingCoupon ? 'تحديث الكوبون' : 'إنشاء الكوبون'}
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
          <h2 className="text-2xl font-bold">إدارة الكوبونات</h2>
          <p className="text-gray-600">إنشاء وإدارة كوبونات الخصم</p>
        </div>
        
        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setShowCreateForm(true); }}>
              <Plus className="h-4 w-4 ml-2" />
              إنشاء كوبون جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingCoupon ? 'تعديل الكوبون' : 'إنشاء كوبون جديد'}
              </DialogTitle>
            </DialogHeader>
            <CouponForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* الفلاتر والبحث */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في الكوبونات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filterActive} onValueChange={setFilterActive}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 ml-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الكوبونات</SelectItem>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="inactive">معطل</SelectItem>
                <SelectItem value="expired">منتهي الصلاحية</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* قائمة الكوبونات */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            الكوبونات ({filteredCoupons.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : filteredCoupons.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              لا توجد كوبونات
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCoupons.map((coupon) => {
                const status = getCouponStatus(coupon);
                return (
                  <div key={coupon.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                          {coupon.code}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(coupon.code)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </div>

                    {coupon.description && (
                      <p className="text-sm text-gray-600">{coupon.description}</p>
                    )}

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        {coupon.discount_type === 'percentage' ? (
                          <Percent className="h-4 w-4 text-green-600" />
                        ) : (
                          <DollarSign className="h-4 w-4 text-green-600" />
                        )}
                        <span className="font-medium">
                          {coupon.discount_value}
                          {coupon.discount_type === 'percentage' ? '%' : ' ريال'}
                        </span>
                      </div>

                      {coupon.min_amount > 0 && (
                        <div className="text-gray-600">
                          الحد الأدنى: {coupon.min_amount} ريال
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>
                          {coupon.current_uses}
                          {coupon.max_uses ? ` / ${coupon.max_uses}` : ''} استخدام
                        </span>
                      </div>

                      {coupon.expires_at && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>
                            ينتهي: {new Date(coupon.expires_at).toLocaleDateString('ar-SA')}
                          </span>
                        </div>
                      )}

                      {coupon.category && (
                        <div className="text-gray-600">
                          الفئة: {coupon.category}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => {
                          setEditingCoupon(coupon);
                          setFormData({
                            code: coupon.code,
                            description: coupon.description || '',
                            discount_type: coupon.discount_type,
                            discount_value: coupon.discount_value,
                            min_amount: coupon.min_amount,
                            max_uses: coupon.max_uses || undefined,
                            category: coupon.category || '',
                            expires_at: coupon.expires_at || undefined,
                            is_active: coupon.is_active
                          });
                          setShowCreateForm(true);
                        }}
                      >
                        <Edit className="h-3 w-3 ml-1" />
                        تعديل
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="h-3 w-3" />
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

export default EnhancedCouponManager;
