
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Gift, Plus, Edit, Trash2, Copy, Calendar,
  Percent, DollarSign, Users, TrendingUp
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CouponData {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minAmount: number;
  maxUses: number;
  currentUses: number;
  expiresAt: Date;
  isActive: boolean;
  description: string;
  category: string;
}

const CouponManager = () => {
  const [coupons, setCoupons] = useState<CouponData[]>([
    {
      id: '1',
      code: 'WELCOME20',
      discount: 20,
      type: 'percentage',
      minAmount: 50,
      maxUses: 1000,
      currentUses: 156,
      expiresAt: new Date('2024-12-31'),
      isActive: true,
      description: 'خصم ترحيبي للعملاء الجدد',
      category: 'عملاء جدد'
    },
    {
      id: '2',
      code: 'SAVE50',
      discount: 50,
      type: 'fixed',
      minAmount: 200,
      maxUses: 500,
      currentUses: 87,
      expiresAt: new Date('2024-11-30'),
      isActive: true,
      description: 'خصم ثابت 50 ريال',
      category: 'عروض خاصة'
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: 0,
    type: 'percentage' as 'percentage' | 'fixed',
    minAmount: 0,
    maxUses: 100,
    expiresAt: '',
    description: '',
    category: ''
  });

  const { toast } = useToast();

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewCoupon(prev => ({ ...prev, code: result }));
  };

  const createCoupon = () => {
    if (!newCoupon.code || !newCoupon.discount || !newCoupon.expiresAt) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const coupon: CouponData = {
      id: Date.now().toString(),
      ...newCoupon,
      expiresAt: new Date(newCoupon.expiresAt),
      currentUses: 0,
      isActive: true
    };

    setCoupons(prev => [...prev, coupon]);
    setNewCoupon({
      code: '',
      discount: 0,
      type: 'percentage',
      minAmount: 0,
      maxUses: 100,
      expiresAt: '',
      description: '',
      category: ''
    });
    setShowCreateForm(false);

    toast({
      title: "تم إنشاء الكوبون",
      description: `تم إنشاء كوبون "${coupon.code}" بنجاح`,
    });
  };

  const toggleCouponStatus = (id: string) => {
    setCoupons(prev => prev.map(coupon => 
      coupon.id === id ? { ...coupon, isActive: !coupon.isActive } : coupon
    ));
  };

  const deleteCoupon = (id: string) => {
    setCoupons(prev => prev.filter(coupon => coupon.id !== id));
    toast({
      title: "تم حذف الكوبون",
      description: "تم حذف الكوبون بنجاح",
    });
  };

  const copyCouponCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "تم النسخ",
      description: `تم نسخ الكود "${code}" إلى الحافظة`,
    });
  };

  const getUsagePercentage = (coupon: CouponData) => {
    return (coupon.currentUses / coupon.maxUses) * 100;
  };

  const isExpired = (date: Date) => {
    return new Date() > date;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة كوبونات الخصم</h2>
          <p className="text-gray-600">إنشاء وإدارة كوبونات الخصم والعروض الترويجية</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          إنشاء كوبون جديد
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي الكوبونات</p>
                <p className="text-2xl font-bold">{coupons.length}</p>
              </div>
              <Gift className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الكوبونات النشطة</p>
                <p className="text-2xl font-bold text-green-600">
                  {coupons.filter(c => c.isActive && !isExpired(c.expiresAt)).length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي الاستخدامات</p>
                <p className="text-2xl font-bold">
                  {coupons.reduce((sum, c) => sum + c.currentUses, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">متوسط الاستخدام</p>
                <p className="text-2xl font-bold">
                  {coupons.length > 0 ? Math.round(coupons.reduce((sum, c) => sum + getUsagePercentage(c), 0) / coupons.length) : 0}%
                </p>
              </div>
              <Percent className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Coupon Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>إنشاء كوبون جديد</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">كود الكوبون</label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={newCoupon.code}
                    onChange={(e) => setNewCoupon(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                    placeholder="أدخل الكود"
                  />
                  <Button variant="outline" onClick={generateRandomCode}>
                    عشوائي
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">نوع الخصم</label>
                <select 
                  value={newCoupon.type}
                  onChange={(e) => setNewCoupon(prev => ({ ...prev, type: e.target.value as 'percentage' | 'fixed' }))}
                  className="w-full mt-1 p-2 border rounded-md"
                >
                  <option value="percentage">نسبة مئوية (%)</option>
                  <option value="fixed">مبلغ ثابت (ريال)</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">
                  قيمة الخصم {newCoupon.type === 'percentage' ? '(%)' : '(ريال)'}
                </label>
                <Input
                  type="number"
                  value={newCoupon.discount}
                  onChange={(e) => setNewCoupon(prev => ({ ...prev, discount: Number(e.target.value) }))}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">الحد الأدنى للمبلغ (ريال)</label>
                <Input
                  type="number"
                  value={newCoupon.minAmount}
                  onChange={(e) => setNewCoupon(prev => ({ ...prev, minAmount: Number(e.target.value) }))}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">عدد الاستخدامات المسموح</label>
                <Input
                  type="number"
                  value={newCoupon.maxUses}
                  onChange={(e) => setNewCoupon(prev => ({ ...prev, maxUses: Number(e.target.value) }))}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">تاريخ الانتهاء</label>
                <Input
                  type="date"
                  value={newCoupon.expiresAt}
                  onChange={(e) => setNewCoupon(prev => ({ ...prev, expiresAt: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">الوصف</label>
              <Input
                value={newCoupon.description}
                onChange={(e) => setNewCoupon(prev => ({ ...prev, description: e.target.value }))}
                placeholder="وصف الكوبون"
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">الفئة</label>
              <Input
                value={newCoupon.category}
                onChange={(e) => setNewCoupon(prev => ({ ...prev, category: e.target.value }))}
                placeholder="فئة الكوبون"
                className="mt-1"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={createCoupon} className="bg-green-600 hover:bg-green-700">
                إنشاء الكوبون
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                إلغاء
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Coupons List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {coupons.map((coupon) => (
          <Card key={coupon.id} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold">{coupon.code}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyCouponCode(coupon.code)}
                      className="p-1"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">{coupon.description}</p>
                </div>
                
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleCouponStatus(coupon.id)}
                    className={coupon.isActive ? 'text-green-600' : 'text-gray-400'}
                  >
                    {coupon.isActive ? 'نشط' : 'معطل'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteCoupon(coupon.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">الخصم:</span>
                  <div className="flex items-center gap-1">
                    {coupon.type === 'percentage' ? (
                      <Percent className="h-4 w-4 text-blue-500" />
                    ) : (
                      <DollarSign className="h-4 w-4 text-green-500" />
                    )}
                    <span className="font-bold">
                      {coupon.discount} {coupon.type === 'percentage' ? '%' : 'ريال'}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">الحد الأدنى:</span>
                  <span>{coupon.minAmount} ريال</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">الاستخدامات:</span>
                  <span>{coupon.currentUses} من {coupon.maxUses}</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getUsagePercentage(coupon)}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center">
                  <Badge variant={isExpired(coupon.expiresAt) ? "destructive" : "secondary"}>
                    <Calendar className="h-3 w-3 mr-1" />
                    {isExpired(coupon.expiresAt) ? 'منتهي الصلاحية' : 'ساري'}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    ينتهي في {coupon.expiresAt.toLocaleDateString('ar-SA')}
                  </span>
                </div>

                {coupon.category && (
                  <Badge variant="outline" className="w-fit">
                    {coupon.category}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CouponManager;
