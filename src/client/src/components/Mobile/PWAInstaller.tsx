
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const PWAInstaller = () => {
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    
    const result = await installPrompt.prompt();
    console.log('تثبيت PWA:', result);
    setInstallPrompt(null);
  };

  if (!installPrompt) return null;

  return (
    <Card className="max-w-md mx-auto border-2 border-blue-500">
      <CardContent className="p-6 text-center">
        <Download className="h-8 w-8 text-blue-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">ثبّت التطبيق الآن</h3>
        <p className="text-gray-600 mb-4">اضغط لتثبيت التطبيق على جهازك</p>
        <Button onClick={handleInstall} className="w-full">
          <Download className="h-4 w-4 mr-2" />
          تثبيت التطبيق
        </Button>
      </CardContent>
    </Card>
  );
};

export default PWAInstaller;
