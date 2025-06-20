
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, Play, Save, Download, Upload, RefreshCw, 
  Eye, EyeOff, Maximize2, Minimize2, Copy, Check
} from 'lucide-react';

interface CSSRule {
  selector: string;
  properties: Record<string, string>;
}

const LiveCSSEditor = () => {
  const [cssCode, setCssCode] = useState(`/* أضف CSS مخصص هنا */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 60px 20px;
  text-align: center;
  color: white;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.btn-primary {
  background: #4f46e5;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: #4338ca;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}`);

  const [isPreviewMode, setIsPreviewMode] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const applyCSS = () => {
    try {
      // Remove existing custom styles
      const existingStyle = document.getElementById('live-css-editor');
      if (existingStyle) {
        existingStyle.remove();
      }

      // Create new style element
      const styleElement = document.createElement('style');
      styleElement.id = 'live-css-editor';
      styleElement.textContent = cssCode;
      document.head.appendChild(styleElement);
      
      setErrors([]);
    } catch (error) {
      setErrors([`خطأ في CSS: ${error}`]);
    }
  };

  const validateCSS = (css: string) => {
    const newErrors: string[] = [];
    
    // Basic CSS validation
    const lines = css.split('\n');
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('/*') && !trimmedLine.endsWith('*/')) {
        if (trimmedLine.includes('{') && !trimmedLine.includes('}')) {
          // Check for unclosed braces in subsequent lines
          let found = false;
          for (let i = index + 1; i < lines.length; i++) {
            if (lines[i].includes('}')) {
              found = true;
              break;
            }
          }
          if (!found) {
            newErrors.push(`السطر ${index + 1}: قوس مفتوح غير مغلق`);
          }
        }
      }
    });
    
    setErrors(newErrors);
  };

  useEffect(() => {
    if (isPreviewMode) {
      applyCSS();
    }
    validateCSS(cssCode);
  }, [cssCode, isPreviewMode]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cssCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('فشل في النسخ:', err);
    }
  };

  const downloadCSS = () => {
    const blob = new Blob([cssCode], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'custom-styles.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/css') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCssCode(content);
      };
      reader.readAsText(file);
    }
  };

  const presetStyles = [
    {
      name: 'ثيم داكن',
      css: `/* ثيم داكن */
body {
  background-color: #1a1a1a;
  color: #ffffff;
}

.card {
  background-color: #2d2d2d;
  border: 1px solid #404040;
}

.btn-primary {
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
}`
    },
    {
      name: 'ثيم ملون',
      css: `/* ثيم ملون */
.hero-section {
  background: linear-gradient(45deg, #ff9a9e, #fecfef, #fecfef);
}

.btn-primary {
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 25px;
}`
    }
  ];

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
      <Card className={`${isFullscreen ? 'h-full rounded-none' : ''}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Code className="h-6 w-6 text-blue-600" />
              <CardTitle>محرر CSS المباشر</CardTitle>
              <Badge className="bg-green-100 text-green-800">مباشر</Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
              >
                {isPreviewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {isPreviewMode ? 'إيقاف المعاينة' : 'تفعيل المعاينة'}
              </Button>
              
              <Button size="sm" variant="outline" onClick={copyToClipboard}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              
              <Button size="sm" variant="outline" onClick={downloadCSS}>
                <Download className="h-4 w-4" />
              </Button>
              
              <label className="cursor-pointer">
                <Button size="sm" variant="outline" asChild>
                  <span>
                    <Upload className="h-4 w-4" />
                  </span>
                </Button>
                <input
                  type="file"
                  accept=".css"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <Tabs defaultValue="editor" className="h-full">
            <TabsList className="w-full justify-start rounded-none border-b">
              <TabsTrigger value="editor">المحرر</TabsTrigger>
              <TabsTrigger value="presets">القوالب الجاهزة</TabsTrigger>
              <TabsTrigger value="preview">المعاينة</TabsTrigger>
            </TabsList>
            
            <TabsContent value="editor" className="p-4 h-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">كود CSS</h3>
                    <div className="flex items-center space-x-2">
                      <Badge variant={errors.length > 0 ? "destructive" : "secondary"}>
                        {errors.length > 0 ? `${errors.length} خطأ` : 'صحيح'}
                      </Badge>
                    </div>
                  </div>
                  
                  <textarea
                    value={cssCode}
                    onChange={(e) => setCssCode(e.target.value)}
                    className="w-full h-96 p-4 border rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{
                      backgroundColor: '#1e1e1e',
                      color: '#d4d4d4',
                      lineHeight: '1.5'
                    }}
                    dir="ltr"
                    placeholder="/* أضف CSS مخصص هنا */"
                  />
                  
                  {errors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <h4 className="text-red-800 font-medium mb-2">أخطاء CSS:</h4>
                      <ul className="text-red-700 text-sm space-y-1">
                        {errors.map((error, index) => (
                          <li key={index}>• {error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">المعاينة المباشرة</h3>
                  <div className="border rounded-lg p-4 bg-gray-50 h-96 overflow-auto">
                    <div className="hero-section rounded-lg mb-4">
                      <h1 className="hero-title">عنوان تجريبي</h1>
                      <p className="mb-4">هذا نص تجريبي لمعاينة التصميم</p>
                      <button className="btn-primary">زر تجريبي</button>
                    </div>
                    
                    <div className="card p-4 rounded-lg mb-4">
                      <h3 className="text-lg font-bold mb-2">بطاقة تجريبية</h3>
                      <p className="text-gray-600">محتوى البطاقة التجريبية</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="presets" className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {presetStyles.map((preset, index) => (
                  <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{preset.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="text-sm bg-gray-100 p-3 rounded overflow-auto max-h-32">
                        {preset.css.substring(0, 200)}...
                      </pre>
                      <Button 
                        className="w-full mt-3"
                        onClick={() => setCssCode(preset.css)}
                      >
                        تطبيق هذا القالب
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">معاينة شاملة</h3>
                  <Button onClick={applyCSS}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    تحديث المعاينة
                  </Button>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                  <div className="hero-section rounded-lg mb-6">
                    <h1 className="hero-title">منصة التسويق الرقمي</h1>
                    <p className="text-lg mb-4">نمو ذكي لوسائل التواصل الاجتماعي</p>
                    <button className="btn-primary mr-3">ابدأ الآن</button>
                    <button className="btn-secondary">تعرف أكثر</button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="card p-4 rounded-lg">
                        <h3 className="text-lg font-bold mb-2">خدمة {i}</h3>
                        <p className="text-gray-600 mb-4">وصف الخدمة التجريبية</p>
                        <button className="btn-primary w-full">اطلب الآن</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveCSSEditor;
