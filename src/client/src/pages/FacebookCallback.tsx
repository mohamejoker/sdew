
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle, Facebook } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const FacebookCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        if (error) {
          setStatus('error');
          setMessage(errorDescription || 'حدث خطأ أثناء الربط مع Facebook');
          return;
        }

        if (!code) {
          setStatus('error');
          setMessage('لم يتم استلام رمز التفويض من Facebook');
          return;
        }

        if (!user) {
          setStatus('error');
          setMessage('يجب تسجيل الدخول أولاً');
          return;
        }

        // هنا يمكن إضافة معالجة رمز Facebook
        // وحفظ التفويض في قاعدة البيانات
        
        setStatus('success');
        setMessage('تم ربط حسابك مع Facebook بنجاح!');
        
        // توجيه المستخدم إلى لوحة التحكم بعد 3 ثواني
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);

      } catch (error) {
        console.error('Facebook callback error:', error);
        setStatus('error');
        setMessage('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
      }
    };

    handleCallback();
  }, [searchParams, user, navigate]);

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-8 w-8 animate-spin text-blue-600" />;
      case 'success':
        return <CheckCircle className="h-8 w-8 text-green-600" />;
      case 'error':
        return <XCircle className="h-8 w-8 text-red-600" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'loading':
        return 'border-blue-200 bg-blue-50';
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Card className={`${getStatusColor()} border-2`}>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Facebook className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">
              {status === 'loading' && 'جارٍ معالجة الطلب...'}
              {status === 'success' && 'تم بنجاح!'}
              {status === 'error' && 'حدث خطأ'}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="text-center space-y-6">
            <div className="flex justify-center">
              {getStatusIcon()}
            </div>
            
            <p className="text-gray-700 leading-relaxed">
              {message}
            </p>

            {status === 'loading' && (
              <div className="space-y-2">
                <div className="text-sm text-gray-600">
                  يرجى الانتظار...
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
              </div>
            )}

            {status === 'success' && (
              <div className="space-y-4">
                <div className="text-sm text-green-700 bg-green-100 p-3 rounded-lg">
                  سيتم توجيهك إلى لوحة التحكم خلال ثواني...
                </div>
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  الانتقال إلى لوحة التحكم
                </Button>
              </div>
            )}

            {status === 'error' && (
              <div className="space-y-4">
                <div className="text-sm text-red-700 bg-red-100 p-3 rounded-lg">
                  يمكنك إعادة المحاولة أو التواصل مع الدعم إذا استمر الخطأ
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/dashboard')}
                    className="flex-1"
                  >
                    العودة للوحة التحكم
                  </Button>
                  <Button 
                    onClick={() => window.location.reload()}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    إعادة المحاولة
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Support Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            تحتاج مساعدة؟{' '}
            <a 
              href="/support" 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              تواصل مع الدعم
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FacebookCallback;
