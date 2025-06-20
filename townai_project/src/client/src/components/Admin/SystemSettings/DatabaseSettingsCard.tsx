
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Download, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const DatabaseSettingsCard = ({
  autoBackup,
  setAutoBackup
}: {
  autoBackup: boolean;
  setAutoBackup: (v: boolean) => void;
}) => (
  <Card className="border-0 shadow-lg">
    <CardHeader>
      <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
        <Database className="h-5 w-5" />
        <span>إعدادات قاعدة البيانات</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold">معلومات الاتصال</h3>
          <div className="space-y-2">
            <Label>خادم قاعدة البيانات</Label>
            <Input defaultValue="localhost:5432" />
          </div>
          <div className="space-y-2">
            <Label>اسم قاعدة البيانات</Label>
            <Input defaultValue="townmedia_db" />
          </div>
          <div className="space-y-2">
            <Label>اسم المستخدم</Label>
            <Input defaultValue="admin" />
          </div>
          <div className="space-y-2">
            <Label>كلمة المرور</Label>
            <Input type="password" />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold">النسخ الاحتياطي</h3>
          <div className="flex items-center justify-between">
            <div>
              <Label>النسخ التلقائي</Label>
              <p className="text-sm text-gray-600">نسخة احتياطية يومية</p>
            </div>
            <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
          </div>
          <div className="space-y-2">
            <Label>توقيت النسخ الاحتياطي</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="اختر التوقيت" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="02:00">02:00 صباحاً</SelectItem>
                <SelectItem value="03:00">03:00 صباحاً</SelectItem>
                <SelectItem value="04:00">04:00 صباحاً</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Button className="w-full" variant="outline">
              <Download className="h-4 w-4 ml-2" />
              إنشاء نسخة احتياطية الآن
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default DatabaseSettingsCard;
