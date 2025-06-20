
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmailSettingsCard = () => (
  <Card className="border-0 shadow-lg">
    <CardHeader>
      <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
        <Mail className="h-5 w-5" />
        <span>إعدادات البريد الإلكتروني</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold">إعدادات SMTP</h3>
          <div className="space-y-2">
            <Label>خادم SMTP</Label>
            <Input placeholder="smtp.gmail.com" />
          </div>
          <div className="space-y-2">
            <Label>المنفذ</Label>
            <Input placeholder="587" />
          </div>
          <div className="space-y-2">
            <Label>اسم المستخدم</Label>
            <Input placeholder="your-email@gmail.com" />
          </div>
          <div className="space-y-2">
            <Label>كلمة المرور</Label>
            <Input type="password" />
          </div>
          <div className="flex items-center justify-between">
            <Label>استخدام SSL/TLS</Label>
            <Switch defaultChecked />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default EmailSettingsCard;
