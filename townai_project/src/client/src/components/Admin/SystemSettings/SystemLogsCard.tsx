
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle, Settings, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const SystemLogsCard = () => (
  <Card className="border-0 shadow-lg">
    <CardHeader>
      <CardTitle>سجلات النظام</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between p-2 bg-green-50 rounded">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm">نسخة احتياطية ناجحة</span>
          </div>
          <span className="text-xs text-gray-500">قبل ساعتين</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Settings className="h-4 w-4 text-blue-600" />
            <span className="text-sm">تحديث إعدادات</span>
          </div>
          <span className="text-xs text-gray-500">قبل 5 ساعات</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <span className="text-sm">تحذير استخدام الذاكرة</span>
          </div>
          <span className="text-xs text-gray-500">أمس</span>
        </div>
      </div>
      <Button variant="outline" className="w-full">
        عرض جميع السجلات
      </Button>
    </CardContent>
  </Card>
);

export default SystemLogsCard;
