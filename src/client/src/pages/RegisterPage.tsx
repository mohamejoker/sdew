import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Brain, Eye, EyeOff } from 'lucide-react';
import SocialLoginButtons from '@/components/Auth/SocialLoginButtons';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { register } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "خطأ في كلمة المرور",
        description: "كلمات المرور غير متطابقة",
        variant: "destructive",
      });
      return;
    }
    if (password.length < 6) {
      toast({
        title: "كلمة مرور ضعيفة",
        description: "يجب أن تكون كلمة المرور أطول من 6 أحرف",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      await register(username, password);
      toast({
        title: "تم التسجيل بنجاح",
        description: "يمكنك الآن تسجيل الدخول",
      });
      setLocation('/login');
    } catch (error: any) {
      toast({
        title: "خطأ في التسجيل",
        description: error.message || "فشل في التسجيل",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">إنشاء حساب جديد</CardTitle>
          <p className="text-gray-600">انضم إلى منصة التسويق الذكي</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">اسم المستخدم</Label>
              <Input
                id="username"
                type="text"
                placeholder="اسم المستخدم"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="أدخل كلمة المرور"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="أعد إدخال كلمة المرور"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
              disabled={loading}
            >
              {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
            </Button>
          </form>

          <SocialLoginButtons />

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              لديك حساب بالفعل؟{' '}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">
                سجل دخولك
              </Link>
            </p>
            <div className="mt-4">
              <Link to="/" className="text-gray-500 hover:underline text-sm">
                العودة للصفحة الرئيسية
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
