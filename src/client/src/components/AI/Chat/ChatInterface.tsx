
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Send, 
  Image, 
  Brain, 
  User, 
  Settings, 
  Download, 
  Share,
  Clock,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { chatPlansService } from '@/services/ai/chatPlansService';
import { advancedAI } from '@/services/ai/advancedAI';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  tokens?: number;
  cost?: number;
}

interface ChatInterfaceProps {
  currentPlan: string;
  onUpgradeNeeded: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ currentPlan, onUpgradeNeeded }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationTitle, setConversationTitle] = useState('محادثة جديدة');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // رسالة الترحيب
    const welcomeMessage: Message = {
      id: 'welcome',
      type: 'ai',
      content: `🤖 **مرحباً بك في محادثة الذكاء الاصطناعي!**\n\nأنا هنا لمساعدتك في:\n\n🔍 **تحليل حساباتك** على جميع المنصات\n📊 **وضع استراتيجيات تسويقية** مخصصة\n🎨 **إنشاء محتوى إبداعي** وجذاب\n📈 **تحليل المنافسين** ودراسة السوق\n💡 **نصائح لتحسين الأداء** والنمو\n\nما الذي تريد مساعدة فيه اليوم؟`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // فحص حدود الاستخدام
    const usageCheck = await chatPlansService.checkUsageLimit('user123', currentPlan);
    
    if (!usageCheck.canSend) {
      onUpgradeNeeded();
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageText = input;
    setInput('');
    setIsTyping(true);

    try {
      // تسجيل استخدام الرسالة
      await chatPlansService.recordMessageUsage('user123', currentPlan);

      let response = '';
      let tokens = 0;
      let cost = 0;

      // تحديد نوع الطلب وإجراء المعالجة المناسبة
      if (messageText.includes('تحليل') || messageText.startsWith('http')) {
        const analysis = await advancedAI.analyzeContent(messageText, 'post');
        response = `🔍 **تحليل شامل:**\n\n📊 **النتائج:**\n• تقييم المحتوى: ${analysis.sentiment}\n• توقع التفاعل: ${analysis.engagement_prediction}/10\n• أفضل وقت للنشر: ${analysis.best_posting_time}\n\n🏷️ **هاشتاجات مقترحة:**\n${analysis.hashtag_suggestions.map(tag => `#${tag}`).join(' ')}\n\n💡 **نصائح التحسين:**\n${analysis.optimization_tips.map(tip => `• ${tip}`).join('\n')}`;
        tokens = 150;
        cost = 0.003;
      } else if (messageText.includes('محتوى') || messageText.includes('اكتب')) {
        const content = await advancedAI.generateContent(messageText, 'instagram', 'احترافي');
        response = `✨ **محتوى جديد:**\n\n📝 **العنوان:**\n${content.title}\n\n📄 **النص:**\n${content.content}\n\n🏷️ **الهاشتاجات:**\n${content.hashtags.join(' ')}\n\n📢 **دعوة للعمل:**\n${content.call_to_action}`;
        tokens = 200;
        cost = 0.004;
      } else {
        response = await advancedAI.callAI(messageText);
        tokens = Math.floor(Math.random() * 100) + 50;
        cost = tokens * 0.00002;
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: response,
        timestamp: new Date(),
        tokens,
        cost
      };

      setMessages(prev => [...prev, aiMessage]);

      // تحديث عنوان المحادثة إذا كانت أول رسالة
      if (messages.length === 1) {
        const title = messageText.slice(0, 50) + (messageText.length > 50 ? '...' : '');
        setConversationTitle(title);
      }

    } catch (error: any) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: `❌ **خطأ:** ${error.message}\n\n💡 تأكد من الاتصال بالإنترنت وحاول مرة أخرى.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);

      toast({
        title: "خطأ في المعالجة",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const imageUrl = reader.result as string;
      
      // إضافة رسالة الصورة
      const imageMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: `🖼️ تم رفع صورة للتحليل`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, imageMessage]);
      setIsTyping(true);
      
      try {
        const analysis = await advancedAI.analyzeImage(imageUrl);
        
        const analysisMessage: Message = {
          id: Date.now().toString(),
          type: 'ai',
          content: `🖼️ **تحليل الصورة:**\n\n📝 **الوصف:** ${analysis.description}\n\n🎯 **العناصر:** ${analysis.objects.join('، ')}\n\n😊 **المشاعر:** ${analysis.emotions.join('، ')}\n\n🎨 **الألوان:** ${analysis.colors.join('، ')}\n\n💡 **اقتراحات:** ${analysis.suggestions.join('، ')}`,
          timestamp: new Date(),
          tokens: 120,
          cost: 0.006
        };
        
        setMessages(prev => [...prev, analysisMessage]);
      } catch (error: any) {
        toast({
          title: "خطأ في تحليل الصورة",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setIsTyping(false);
      }
    };
    
    reader.readAsDataURL(file);
  };

  const exportChat = () => {
    const chatContent = messages.map(msg => 
      `[${msg.timestamp.toLocaleString('ar-EG')}] ${msg.type === 'user' ? 'أنت' : 'AI'}: ${msg.content}`
    ).join('\n\n');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `محادثة-AI-${new Date().toLocaleDateString('ar-EG')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareChat = () => {
    const summary = `محادثة مع الذكاء الاصطناعي - ${conversationTitle}`;
    if (navigator.share) {
      navigator.share({
        title: summary,
        text: `تفاعلت مع AI للحصول على نصائح تسويقية مخصصة`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "تم النسخ",
        description: "تم نسخ رابط المحادثة"
      });
    }
  };

  return (
    <Card className="h-[700px] flex flex-col">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <Brain className="h-6 w-6" />
            <div>
              <h3 className="font-bold">{conversationTitle}</h3>
              <p className="text-blue-100 text-sm flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date().toLocaleString('ar-EG')}
              </p>
            </div>
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={exportChat} className="text-white hover:bg-white/20">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={shareChat} className="text-white hover:bg-white/20">
              <Share className="h-4 w-4" />
            </Button>
            <Badge className="bg-white/20 text-white">
              <MessageSquare className="h-3 w-3 mr-1" />
              {messages.length - 1} رسالة
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start gap-3 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                  }`}>
                    {message.type === 'user' ? <User className="h-4 w-4" /> : <Brain className="h-4 w-4" />}
                  </div>
                  
                  <div className={`rounded-2xl p-4 ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    
                    {message.tokens && (
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
                        <Badge variant="outline" className="text-xs">
                          {message.tokens} رمز
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          ${message.cost?.toFixed(4)}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white flex items-center justify-center">
                    <Brain className="h-4 w-4" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                      </div>
                      <span className="text-sm text-gray-600">AI يفكر...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="border-t p-4">
          <div className="flex items-end gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-full flex-shrink-0"
            >
              <Image className="h-4 w-4" />
            </Button>
            
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اكتب رسالتك هنا... مثل: 'حلل حساب @username' أو 'اكتب محتوى عن التسويق الرقمي'"
              className="flex-1 min-h-[50px] max-h-[120px] resize-none"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={isTyping}
            />
            
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="rounded-full w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          
          <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-500">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              ذكاء اصطناعي متقدم
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Image className="h-3 w-3" />
              تحليل الصور
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Brain className="h-3 w-3" />
              استراتيجيات مخصصة
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
