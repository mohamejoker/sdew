
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, MessageSquare, Phone, Mail, Send, Search } from 'lucide-react';

const SupportSection = () => {
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    description: '',
    priority: 'medium'
  });

  const faqItems = [
    {
      question: "كيف يمكنني إنشاء حساب جديد؟",
      answer: "يمكنك إنشاء حساب جديد بالنقر على زر 'إنشاء حساب' في أعلى الصفحة وملء البيانات المطلوبة."
    },
    {
      question: "كيف يمكنني تغيير كلمة المرور؟",
      answer: "اذهب إلى الملف الشخصي، ثم إعدادات الحساب، واختر 'تغيير كلمة المرور'."
    },
    {
      question: "ما هي طرق الدفع المتاحة؟",
      answer: "نقبل جميع بطاقات الائتمان الرئيسية وPayPal و Apple Pay و Google Pay."
    },
    {
      question: "كيف يمكنني إلغاء الاشتراك؟",
      answer: "يمكنك إلغاء الاشتراك من صفحة الفوترة في إعدادات الحساب."
    }
  ];

  const tickets = [
    { id: 1, subject: "مشكلة في الدفع", status: "مفتوح", date: "2024-01-15", priority: "عالي" },
    { id: 2, subject: "استفسار عن الخدمات", status: "مغلق", date: "2024-01-10", priority: "متوسط" }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">مركز المساعدة والدعم</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          نحن هنا لمساعدتك! ابحث في الأسئلة الشائعة أو تواصل معنا مباشرة
        </p>
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="ابحث عن إجابة..." className="pl-10" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">الأسئلة الشائعة</TabsTrigger>
          <TabsTrigger value="tickets">تذاكر الدعم</TabsTrigger>
          <TabsTrigger value="contact">اتصل بنا</TabsTrigger>
          <TabsTrigger value="guides">أدلة الاستخدام</TabsTrigger>
        </TabsList>

        {/* الأسئلة الشائعة */}
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                الأسئلة الشائعة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-right">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-2">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تذاكر الدعم */}
        <TabsContent value="tickets">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>إنشاء تذكرة دعم جديدة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>موضوع التذكرة</Label>
                  <Input
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                    placeholder="اكتب موضوع مشكلتك"
                  />
                </div>
                <div className="space-y-2">
                  <Label>وصف المشكلة</Label>
                  <Textarea
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                    placeholder="اوصف مشكلتك بالتفصيل"
                    rows={4}
                  />
                </div>
                <Button className="w-full">
                  <Send className="h-4 w-4 ml-2" />
                  إرسال التذكرة
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>تذاكرك السابقة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{ticket.subject}</h4>
                        <Badge variant={ticket.status === 'مفتوح' ? 'default' : 'secondary'}>
                          {ticket.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        التاريخ: {ticket.date} • الأولوية: {ticket.priority}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* اتصل بنا */}
        <TabsContent value="contact">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold mb-2">الدردشة المباشرة</h3>
                <p className="text-sm text-gray-600 mb-4">متاح 24/7 للإجابة على استفساراتك</p>
                <Button className="w-full">بدء المحادثة</Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Phone className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="font-semibold mb-2">الهاتف</h3>
                <p className="text-sm text-gray-600 mb-4">+966 11 123 4567</p>
                <Button variant="outline" className="w-full">اتصل بنا</Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Mail className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <h3 className="font-semibold mb-2">البريد الإلكتروني</h3>
                <p className="text-sm text-gray-600 mb-4">support@townmedia.com</p>
                <Button variant="outline" className="w-full">إرسال إيميل</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* أدلة الاستخدام */}
        <TabsContent value="guides">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "دليل البدء السريع",
              "إدارة الحساب",
              "استخدام لوحة التحكم",
              "إعدادات الخصوصية",
              "إدارة الاشتراكات",
              "نصائح الأمان"
            ].map((guide, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HelpCircle className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{guide}</h3>
                  <p className="text-sm text-gray-600">دليل شامل يساعدك في استخدام هذه الميزة</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupportSection;
