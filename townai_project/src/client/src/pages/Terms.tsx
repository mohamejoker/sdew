
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
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
              <Scale className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">الشروط والأحكام</h1>
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
                <FileText className="h-6 w-6 text-blue-600" />
                مقدمة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                مرحباً بك في Town Media Group. هذه الشروط والأحكام تحكم استخدامك لموقعنا وخدماتنا.
                باستخدام خدماتنا، فإنك توافق على الالتزام بهذه الشروط.
              </p>
              <p>
                يرجى قراءة هذه الشروط بعناية قبل استخدام خدماتنا. إذا كنت لا توافق على أي من هذه الشروط، 
                يرجى عدم استخدام خدماتنا.
              </p>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                وصف الخدمة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Town Media Group هي منصة تقدم خدمات التسويق الرقمي وإدارة وسائل التواصل الاجتماعي، بما في ذلك:
              </p>
              <ul className="list-disc list-inside space-y-1 mr-4">
                <li>تحليل أداء الحسابات على منصات التواصل الاجتماعي</li>
                <li>زيادة المتابعين والتفاعل بطرق آمنة ومشروعة</li>
                <li>إنشاء وإدارة حملات تسويقية</li>
                <li>تقديم استشارات في التسويق الرقمي</li>
                <li>خدمات الذكاء الاصطناعي لتحليل المحتوى</li>
                <li>إدارة المحتوى والنشر المجدول</li>
              </ul>
            </CardContent>
          </Card>

          {/* User Obligations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
                التزامات المستخدم
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <div>
                <h3 className="font-semibold text-lg mb-2">يجب عليك:</h3>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>تقديم معلومات صحيحة ومحدثة</li>
                  <li>الحفاظ على سرية بيانات تسجيل الدخول</li>
                  <li>استخدام الخدمات للأغراض المشروعة فقط</li>
                  <li>عدم انتهاك حقوق الآخرين أو قوانين الملكية الفكرية</li>
                  <li>الالتزام بسياسات منصات التواصل الاجتماعي</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">يُمنع عليك:</h3>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>استخدام الخدمات لأنشطة غير قانونية</li>
                  <li>محاولة الوصول غير المصرح به للنظام</li>
                  <li>نشر محتوى مؤذي أو مسيء</li>
                  <li>التلاعب في النظام أو محاولة خداعه</li>
                  <li>مشاركة حسابك مع أطراف أخرى</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Payment Terms */}
          <Card>
            <CardHeader>
              <CardTitle>شروط الدفع</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <div>
                <h3 className="font-semibold text-lg mb-2">الأسعار والدفع:</h3>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>جميع الأسعار مذكورة بالريال السعودي ما لم يُذكر غير ذلك</li>
                  <li>الدفع مطلوب مقدماً لجميع الخدمات</li>
                  <li>نحتفظ بالحق في تغيير الأسعار مع إشعار مسبق</li>
                  <li>المدفوعات غير قابلة للاسترداد إلا في حالات محددة</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">سياسة الاسترداد:</h3>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>يمكن طلب الاسترداد خلال 7 أيام من الشراء</li>
                  <li>الاسترداد متاح فقط إذا لم تبدأ الخدمة</li>
                  <li>سيتم معالجة طلبات الاسترداد خلال 5-10 أيام عمل</li>
                  <li>قد تُطبق رسوم معالجة على بعض المدفوعات</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle>الملكية الفكرية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <div>
                <h3 className="font-semibold text-lg mb-2">حقوق الملكية:</h3>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>جميع محتويات الموقع محمية بحقوق الطبع والنشر</li>
                  <li>لا يُسمح بنسخ أو توزيع المحتوى بدون إذن</li>
                  <li>العلامات التجارية المستخدمة هي ملك لأصحابها</li>
                  <li>تحتفظ بحقوق المحتوى الذي تنشئه</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Service Limitations */}
          <Card>
            <CardHeader>
              <CardTitle>قيود الخدمة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <div>
                <h3 className="font-semibold text-lg mb-2">حدود المسؤولية:</h3>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>نسعى لتقديم خدمة عالية الجودة لكن لا نضمن النتائج</li>
                  <li>قد تتأثر الخدمة بتغييرات سياسات المنصات الخارجية</li>
                  <li>لا نتحمل مسؤولية الأضرار غير المباشرة</li>
                  <li>قد نحد من الوصول في حالة إساءة الاستخدام</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">حالات القوة القاهرة:</h3>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>انقطاع الإنترنت أو الكهرباء</li>
                  <li>تغييرات في سياسات المنصات الخارجية</li>
                  <li>الكوارث الطبيعية أو الظروف الاستثنائية</li>
                  <li>التدخل الحكومي أو القانوني</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Account Termination */}
          <Card>
            <CardHeader>
              <CardTitle>إنهاء الحساب</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <div>
                <h3 className="font-semibold text-lg mb-2">يحق لنا إنهاء حسابك في حالة:</h3>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>انتهاك هذه الشروط والأحكام</li>
                  <li>عدم دفع الرسوم المستحقة</li>
                  <li>استخدام الخدمة لأغراض غير مشروعة</li>
                  <li>السلوك المسيء تجاه فريق الدعم</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">يحق لك إنهاء حسابك:</h3>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>في أي وقت عبر إعدادات الحساب</li>
                  <li>بالتواصل مع فريق الدعم</li>
                  <li>سيتم حذف بياناتك وفقاً لسياسة الخصوصية</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Legal */}
          <Card>
            <CardHeader>
              <CardTitle>الأحكام القانونية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <div>
                <h3 className="font-semibold text-lg mb-2">القانون المطبق:</h3>
                <p>
                  تخضع هذه الشروط والأحكام لقوانين المملكة العربية السعودية، وتختص المحاكم السعودية 
                  بالنظر في أي نزاعات قد تنشأ.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">تعديل الشروط:</h3>
                <p>
                  نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إخطارك بأي تغييرات مهمة عبر 
                  البريد الإلكتروني أو من خلال إشعار على الموقع.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>التواصل</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                إذا كان لديك أي أسئلة حول هذه الشروط والأحكام، يرجى التواصل معنا:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>البريد الإلكتروني:</strong> legal@townmediagroup.com</p>
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
              قرأت ووافقت على الشروط والأحكام
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/privacy">
                <Button variant="outline" className="w-full sm:w-auto">
                  اقرأ سياسة الخصوصية
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

export default Terms;
