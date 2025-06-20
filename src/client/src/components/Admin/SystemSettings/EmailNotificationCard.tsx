
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmailNotificationCard = ({
  emailNotifications,
  setEmailNotifications,
}: {
  emailNotifications: boolean;
  setEmailNotifications: (v: boolean) => void;
}) => (
  <Card className="border-0 shadow-lg mt-4">
    <CardContent>
      <div className="space-y-4">
        <h3 className="font-semibold flex items-center"><Mail className="h-4 w-4 ml-2" /> إعدادات الإشعارات</h3>
        <div className="flex items-center justify-between">
          <div>
            <Label>إشعارات البريد</Label>
            <p className="text-sm text-gray-600">تفعيل إرسال الإشعارات</p>
          </div>
          <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
        </div>
        <div className="space-y-2">
          <Label>بريد المدير</Label>
          <Input placeholder="admin@townmedia.com" />
        </div>
        <div className="space-y-2">
          <Label>اسم المرسل</Label>
          <Input placeholder="Town Media" />
        </div>
        <Button className="w-full" variant="outline">
          <Mail className="h-4 w-4 ml-2" />
          إرسال رسالة تجريبية
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default EmailNotificationCard;
