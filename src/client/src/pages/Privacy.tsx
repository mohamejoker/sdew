
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Eye, Database, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              to="/" 
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowRight className="h-5 w-5 ml-2" />
              العودة للرئيسية
            </Link>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">سياسة الخصوصية</h1>
            <p className="text-gray-600">آخر تحديث: {new Date().toLocaleDateString('ar-EG')}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-blue-600" />
                مقدمة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                في Town Media Group، نحن ملتزمون بحماية خصوصيتك وأمان بياناتك الشخصية. 
                تشرح هذه السياسة كيف نقوم بجمع واستخدام وحماية معلوماتك عند استخدام خدماتنا.
              </p>
              <p>
                باستخدام موقعنا وخدماتنا، فإنك توافق على الممارسات المذكورة في هذه السياسة.
              </p>
            </CardContent>
          </Card>

          {/* Data Collection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Database className="h-6 w-6 text-green-600" />
                البيانات التي نجمعها
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <div>
                <h3 className="font-semibold text-lg mb-2">المعلومات الشخصية:</h3>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>الاسم والبريد الإلكتروني</li>
                  <li>رقم الهاتف (اختياري)</li>
                  <li>معلومات الحساب والملف الشخصي</li>
                  <li>تفضيلات الخدمة</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">بيانات وسائل التواصل الاجتماعي:</h3>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>معلومات الحساب العامة (اسم المستخدم، الصورة الشخصية)</li>
                  <li>إحصائيات الحساب العامة (عدد المتابعين، التفاعل)</li>
                  <li>المحتوى العام المنشور</li>
                  <li>البيانات التحليلية للأداء</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">البيانات التقنية:</h3>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>عنوان IP والموقع الجغرافي التقريبي</li>
                  <li>نوع المتصفح ونظام التشغيل</li>
                  <li>أوقات الزيارة وسجل التصفح</li>
                  <li>ملفات تعريف الارتباط (Cookies)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Data Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Lock className="h-6 w-6 text-purple-600" />
                كيف نستخدم بياناتك
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <div>
                <h3 className="font-semibold text-lg mb-2">تقديم الخدمات:</h3>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>تحليل أداء حساباتك على وسائل التواصل</li>
                  <li>تقديم اقتراحات لتحسين المحتوى</li>
                  <li>إنشاء تقارير مخصصة</li>
                  <li>تنفيذ الطلبات والخدمات المطلوبة</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">التحسين والتطوير:</h3>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>تحسين جودة خدماتنا</li>
                  <li>تطوير ميزات جديدة</li>
                  <li>تحليل اتجاهات الاستخدام</li>
                  <li>البحث وتطوير خوارزميات الذكاء الاصطناعي</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">التواصل:</h3>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>إرسال إشعارات مهمة حول الخدمة</li>
                  <li>الرد على استفساراتك وطلبات الدعم</li>
                  <li>إرسال تحديثات عن الخدمات الجديدة (بموافقتك)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Facebook Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="text-blue-600 text-xl">📘</span>
                التكامل مع Facebook و Instagram
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                عند ربط حسابك على Facebook أو Instagram، نقوم بالوصول فقط إلى:
              </p>
              <ul className="list-disc list-inside space-y-1 mr-4">
                <li>المعلومات الأساسية للملف الشخصي</li>
                <li>الإحصائيات العامة للحساب</li>
                <li>المنشورات العامة لأغراض التحليل</li>
                <li>بيانات الأداء والتفاعل</li>
              </ul>
              <p className="bg-blue-50 p-4 rounded-lg border-r-4 border-blue-500">
                <strong>ملاحظة مهمة:</strong> لا نقوم أبداً بنشر محتوى أو التفاعل نيابة عنك دون إذن صريح منك.
              </p>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-green-600" />
                أمان البيانات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>نتخذ إجراءات أمنية صارمة لحماية بياناتك:</p>
              <ul className="list-disc list-inside space-y-1 mr-4">
                <li>تشفير جميع البيانات أثناء النقل والتخزين</li>
                <li>خوادم آمنة محمية بجدران الحماية</li>
                <li>الوصول المحدود للبيانات للموظفين المخولين فقط</li>
                <li>مراقبة مستمرة للأنشطة المشبوهة</li>
                <li>نسخ احتياطية منتظمة ومشفرة</li>
              </ul>
            </CardContent>
          </Card>

          {/* User Rights */}
          <Card>
            <CardHeader>
              <CardTitle>حقوقك</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>لديك الحق في:</p>
              <ul className="list-disc list-inside space-y-1 mr-4">
                <li>الوصول إلى بياناتك الشخصية</li>
                <li>تعديل أو تحديث معلوماتك</li>
                <li>حذف حسابك وبياناتك</li>
                <li>تقييد استخدام بياناتك</li>
                <li>نقل بياناتك إلى خدمة أخرى</li>
                <li>الاعتراض على معالجة بياناتك</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>تواصل معنا</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                إذا كان لديك أي أسئلة حول هذه السياسة أو ممارساتنا للخصوصية، يرجى التواصل معنا:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>البريد الإلكتروني:</strong> privacy@townmediagroup.com</p>
                <p><strong>الهاتف:</strong> +966 50 123 4567</p>
                <p><strong>العنوان:</strong> الرياض، المملكة العربية السعودية</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="text-center mt-12 pt-8 border-t">
          <div className="space-y-4">
            <p className="text-gray-600">
              قرأت وفهمت سياسة الخصوصية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/terms">
                <Button variant="outline" className="w-full sm:w-auto">
                  اقرأ الشروط والأحكام
                </Button>
              </Link>
              <Link to="/register">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600">
                  إنشاء حساب جديد
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
