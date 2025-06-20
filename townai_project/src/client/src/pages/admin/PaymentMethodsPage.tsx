
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PaymentMethodsManager from '@/components/Admin/PaymentMethodsManager';
import EgyptianPaymentManager from '@/components/Admin/EgyptianPaymentManager';
import PaymentMethodsOverview from '@/components/Admin/Payments/PaymentMethodsOverview';
import { CreditCard, MapPin, BarChart3, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const PaymentMethodsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            إدارة طرق الدفع
          </h1>
          <p className="text-gray-600 mt-2">إدارة وتكوين جميع طرق الدفع المتاحة في النظام</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/payments')}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            إعدادات الدفع
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            نظرة عامة
          </TabsTrigger>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            طرق الدفع العامة
          </TabsTrigger>
          <TabsTrigger value="egyptian" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            طرق الدفع المصرية
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <PaymentMethodsOverview />
        </TabsContent>

        <TabsContent value="general" className="space-y-6">
          <PaymentMethodsManager />
        </TabsContent>

        <TabsContent value="egyptian" className="space-y-6">
          <EgyptianPaymentManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentMethodsPage;
