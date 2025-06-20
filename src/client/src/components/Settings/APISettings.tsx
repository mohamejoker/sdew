
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Key, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface APISettingsProps {
  onApiKeyChange?: (apiKey: string) => void;
}

const APISettings: React.FC<APISettingsProps> = ({ onApiKeyChange }) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load API key from localStorage on component mount
    const savedApiKey = localStorage.getItem('openai_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setIsValid(true);
      if (onApiKeyChange) {
        onApiKeyChange(savedApiKey);
      }
    }
  }, [onApiKeyChange]);

  const validateApiKey = (key: string): boolean => {
    // Basic validation for OpenAI API key format
    return key.startsWith('sk-') && key.length > 20;
  };

  const handleApiKeyChange = (value: string) => {
    setApiKey(value);
    const valid = validateApiKey(value);
    setIsValid(valid);
  };

  const saveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال مفتاح API صحيح",
        variant: "destructive"
      });
      return;
    }

    if (!validateApiKey(apiKey)) {
      toast({
        title: "خطأ في التنسيق",
        description: "مفتاح API يجب أن يبدأ بـ sk- ويكون أطول من 20 حرف",
        variant: "destructive"
      });
      return;
    }

    try {
      localStorage.setItem('openai_api_key', apiKey);
      setIsValid(true);
      if (onApiKeyChange) {
        onApiKeyChange(apiKey);
      }
      toast({
        title: "تم الحفظ بنجاح",
        description: "تم حفظ مفتاح API الخاص بك بأمان",
      });
    } catch (error) {
      toast({
        title: "خطأ في الحفظ",
        description: "حدث خطأ أثناء حفظ المفتاح",
        variant: "destructive"
      });
    }
  };

  const removeApiKey = () => {
    localStorage.removeItem('openai_api_key');
    setApiKey('');
    setIsValid(null);
    if (onApiKeyChange) {
      onApiKeyChange('');
    }
    toast({
      title: "تم الحذف",
      description: "تم حذف مفتاح API",
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <Key className="h-5 w-5 text-blue-600" />
          <span>إعدادات OpenAI API</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            مفتاح API يتم حفظه محلياً في متصفحك فقط ولا يتم إرساله لأي خادم خارجي
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label htmlFor="api-key">مفتاح OpenAI API</Label>
          <div className="relative">
            <Input
              id="api-key"
              type={showApiKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => handleApiKeyChange(e.target.value)}
              placeholder="sk-..."
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute left-0 top-0 h-full px-3"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          
          {isValid === true && (
            <div className="flex items-center space-x-1 rtl:space-x-reverse text-green-600 text-sm">
              <CheckCircle className="h-4 w-4" />
              <span>مفتاح API صحيح</span>
            </div>
          )}
          
          {isValid === false && (
            <div className="flex items-center space-x-1 rtl:space-x-reverse text-red-600 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>تنسيق المفتاح غير صحيح</span>
            </div>
          )}
        </div>

        <div className="flex space-x-2 rtl:space-x-reverse">
          <Button onClick={saveApiKey} className="flex-1">
            حفظ المفتاح
          </Button>
          {apiKey && (
            <Button onClick={removeApiKey} variant="outline" className="flex-1">
              حذف المفتاح
            </Button>
          )}
        </div>

        <Alert>
          <AlertDescription className="text-xs">
            يمكنك الحصول على مفتاح API من{' '}
            <a 
              href="https://platform.openai.com/api-keys" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              منصة OpenAI
            </a>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default APISettings;
