
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

const PerformanceSettingsCard = ({
  debugMode,
  setDebugMode,
}: {
  debugMode: boolean;
  setDebugMode: (v: boolean) => void;
}) => (
  <Card className="border-0 shadow-lg">
    <CardHeader>
      <CardTitle>إعدادات الأداء</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold">التخزين المؤقت</h3>
          <div className="flex items-center justify-between">
            <Label>تفعيل التخزين المؤقت</Label>
            <Switch defaultChecked />
          </div>
          <div className="space-y-2">
            <Label>مدة التخزين (دقائق)</Label>
            <Input defaultValue="60" />
          </div>
          <Button variant="outline" className="w-full">
            مسح التخزين المؤقت
          </Button>
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold">ضغط البيانات</h3>
          <div className="flex items-center justify-between">
            <Label>ضغط HTML</Label>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label>ضغط CSS</Label>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label>ضغط JavaScript</Label>
            <Switch defaultChecked />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold">التطوير</h3>
          <div className="flex items-center justify-between">
            <div>
              <Label>وضع التطوير</Label>
              <p className="text-sm text-gray-600">عرض تفاصيل الأخطاء</p>
            </div>
            <Switch checked={debugMode} onCheckedChange={setDebugMode} />
          </div>
          <div className="space-y-2">
            <Label>مستوى السجلات</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="اختر المستوى" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="error">أخطاء فقط</SelectItem>
                <SelectItem value="warning">تحذيرات</SelectItem>
                <SelectItem value="info">معلومات</SelectItem>
                <SelectItem value="debug">تطوير</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default PerformanceSettingsCard;
