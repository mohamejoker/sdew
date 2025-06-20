
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MaintenanceCenter from '@/components/Admin/SystemMaintenance/MaintenanceCenter';
import AdvancedDiagnostics from '@/components/Admin/SystemMaintenance/AdvancedDiagnostics';
import SystemOptimizer from '@/components/Admin/SystemMaintenance/SystemOptimizer';

const MaintenancePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">الصيانة والفحص الشامل</h1>
        <p className="text-gray-600 mt-2">إدارة وصيانة النظام بشكل متقدم</p>
      </div>

      <Tabs defaultValue="maintenance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="maintenance">مركز الصيانة</TabsTrigger>
          <TabsTrigger value="diagnostics">تشخيصات متقدمة</TabsTrigger>
          <TabsTrigger value="optimizer">محسن النظام</TabsTrigger>
        </TabsList>

        <TabsContent value="maintenance">
          <MaintenanceCenter />
        </TabsContent>

        <TabsContent value="diagnostics">
          <AdvancedDiagnostics />
        </TabsContent>

        <TabsContent value="optimizer">
          <SystemOptimizer />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaintenancePage;
