import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Settings, DollarSign, Package, Smartphone, Building2, Gift } from 'lucide-react';
import EgyptianPaymentMethods from './EgyptianPaymentMethods';

const PaymentSettings = () => {
  const [paymentEnabled, setPaymentEnabled] = useState(false);
  const [currency, setCurrency] = useState('EGP');
  const [testMode, setTestMode] = useState(true);
  const [plans, setPlans] = useState([
    { id: 1, name: 'الأساسي', price: 99.99, features: ['ميزة 1', 'ميزة 2'] },
    { id: 2, name: 'المتقدم', price: 199.99, features: ['ميزة 1', 'ميزة 2', 'ميزة 3'] },
    { id: 3, name: 'المحترف', price: 399.99, features: ['جميع الميزات', 'دعم مميز'] }
  ]);

  const egyptianPaymentMethods = [
    { name: 'المحافظ الإلكترونية', count: 4, active: true, icon: Smartphone },
    { name: 'فوري', count: 1, active: true, icon: Building2 },
    { name: 'PayMob', count: 1, active: true, icon: CreditCard },
    { name: 'التحويل البنكي', count: 5, active: true, icon: Building2 },
    { name: 'الكوبونات', count: 1, active: true, icon: Gift },
    { name: 'الرصيد الداخلي', count: 1, active: true, icon: DollarSign }
  ];

  const handleTestPayment = (transactionId: string, method: string) => {
    alert(`تم الدفع بنجاح!\nرقم المعاملة: ${transactionId}\nطريقة الدفع: ${method}`);
  };

  const handleTestError = (error: string) => {
    alert(`خطأ في الدفع: ${error}`);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">إعدادات الدفع</h2>
          <p className="text-gray-600">إدارة خطط الاشتراك والمدفوعات للسوق المصري</p>
        </div>
        <Badge variant={paymentEnabled ? "default" : "secondary"}>
          {paymentEnabled ? 'مفعل' : 'معطل'}
        </Badge>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">الإعدادات العامة</TabsTrigger>
          <TabsTrigger value="methods">طرق الدفع</TabsTrigger>
          <TabsTrigger value="plans">خطط الاشتراك</TabsTrigger>
          <TabsTrigger value="test">اختبار الدفع</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                الإعدادات العامة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>تفعيل نظام الدفع</Label>
                <Switch
                  checked={paymentEnabled}
                  onCheckedChange={setPaymentEnabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>وضع التجربة</Label>
                <Switch
                  checked={testMode}
                  onCheckedChange={setTestMode}
                />
              </div>

              <div className="space-y-2">
                <Label>العملة الافتراضية</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EGP">جنيه مصري (EGP)</SelectItem>
                    <SelectItem value="USD">دولار أمريكي (USD)</SelectItem>
                    <SelectItem value="SAR">ريال سعودي (SAR)</SelectItem>
                    <SelectItem value="AED">درهم إماراتي (AED)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">6</div>
                  <div className="text-sm text-gray-600">طرق دفع مدعومة</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">4</div>
                  <div className="text-sm text-gray-600">شبكات محافظ</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">100%</div>
                  <div className="text-sm text-gray-600">تغطية السوق المصري</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                طرق الدفع المصرية المدعومة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {egyptianPaymentMethods.map((method, index) => {
                  const IconComponent = method.icon;
                  return (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <IconComponent className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{method.name}</h3>
                            <p className="text-sm text-gray-600">{method.count} طريقة</p>
                          </div>
                        </div>
                        <Badge variant={method.active ? 'default' : 'secondary'}>
                          {method.active ? 'نشط' : 'معطل'}
                        </Badge>
                      </div>

                      <div className="space-y-2 text-sm">
                        {method.name === 'المحافظ الإلكترونية' && (
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span>فودافون كاش (010)</span>
                              <span className="text-green-600">✓</span>
                            </div>
                            <div className="flex justify-between">
                              <span>اتصالات كاش (011)</span>
                              <span className="text-green-600">✓</span>
                            </div>
                            <div className="flex justify-between">
                              <span>أورانج موني (012)</span>
                              <span className="text-green-600">✓</span>
                            </div>
                            <div className="flex justify-between">
                              <span>WE Pay (015)</span>
                              <span className="text-green-600">✓</span>
                            </div>
                          </div>
                        )}
                        
                        {method.name === 'فوري' && (
                          <div className="text-gray-600">
                            دفع نقدي في +3000 فرع ومكينة
                          </div>
                        )}
                        
                        {method.name === 'PayMob' && (
                          <div className="text-gray-600">
                            بطاقات فيزا وماستركارد
                          </div>
                        )}
                        
                        {method.name === 'التحويل البنكي' && (
                          <div className="space-y-1 text-xs">
                            <div>البنك الأهلي المصري</div>
                            <div>بنك مصر</div>
                            <div>البنك التجاري الدولي</div>
                            <div>بنك QNB</div>
                            <div>بنك HSBC</div>
                          </div>
                        )}
                      </div>

                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        disabled={!paymentEnabled}
                      >
                        تكوين
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                خطط الاشتراك
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <div key={plan.id} className="border rounded-lg p-4 space-y-3">
                    <div className="text-center">
                      <h3 className="font-semibold">{plan.name}</h3>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <DollarSign className="h-4 w-4" />
                        <span className="text-2xl font-bold">{plan.price}</span>
                        <span className="text-gray-500">ج.م / شهر</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-xs">السعر</Label>
                      <Input
                        type="number"
                        value={plan.price}
                        onChange={(e) => {
                          const newPlans = plans.map(p => 
                            p.id === plan.id 
                              ? { ...p, price: parseFloat(e.target.value) || 0 }
                              : p
                          );
                          setPlans(newPlans);
                        }}
                        disabled={!paymentEnabled}
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs">الميزات</Label>
                      {plan.features.map((feature, index) => (
                        <div key={index} className="text-xs text-gray-600">
                          • {feature}
                        </div>
                      ))}
                    </div>

                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      disabled={!paymentEnabled}
                    >
                      تعديل الخطة
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <Button disabled={!paymentEnabled}>
                  إضافة خطة جديدة
                </Button>
                <Button variant="outline" disabled={!paymentEnabled}>
                  استيراد الخطط
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="test">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                اختبار نظام الدفع المصري
              </CardTitle>
            </CardHeader>
            <CardContent>
              {paymentEnabled ? (
                <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h3 className="font-semibold text-yellow-800 mb-2">وضع التجربة مفعل</h3>
                    <p className="text-yellow-700 text-sm">
                      جميع المعاملات تجريبية ولن يتم خصم أموال حقيقية
                    </p>
                  </div>
                  
                  <EgyptianPaymentMethods 
                    amount={99.99}
                    onSuccess={handleTestPayment}
                    onError={handleTestError}
                  />
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  يجب تفعيل نظام الدفع أولاً لإجراء الاختبارات
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentSettings;
