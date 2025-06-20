
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bot, User, Send, Sparkles, TrendingUp, Users, 
  Eye, Heart, MessageSquare, Share, Target, 
  Lightbulb, BarChart3, Zap, Star, CheckCircle,
  Instagram, Youtube, Twitter, Facebook
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  analytics?: any;
  actionButtons?: Array<{
    label: string;
    action: string;
    data?: any;
  }>;
}

interface EnhancedAIChatProps {
  onActionClick?: (action: string, data?: any) => void;
}

const EnhancedAIChat: React.FC<EnhancedAIChatProps> = ({ onActionClick }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // رسالة ترحيب من الذكاء الاصطناعي
    const welcomeMessage: Message = {
      id: 'welcome',
      type: 'ai',
      content: '👋 مرحباً! أنا وكيل الذكاء الاصطناعي المتطور. يمكنني مساعدتك في:\n\n🔍 تحليل حساباتك على السوشيال ميديا\n📊 اقتراح استراتيجيات نمو مخصصة\n🎯 تحليل المنافسين\n📈 تحسين المحتوى\n🛒 اختيار أفضل الخدمات\n\nما الذي تريد مساعدة فيه اليوم؟',
      timestamp: new Date(),
      suggestions: [
        'تحليل حسابي على Instagram',
        'اقتراح استراتيجية نمو',
        'تحليل المنافسين',
        'تحسين المحتوى'
      ]
    };
    setMessages([welcomeMessage]);
  }, []);

  const analyzeAccountFromLink = async (link: string) => {
    setIsAnalyzing(true);
    
    // محاكاة تحليل الحساب
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const analysisResult = {
      platform: 'Instagram',
      followers: '12.5K',
      engagement: '4.2%',
      avgLikes: '520',
      avgComments: '45',
      postFrequency: '3-4 posts/week',
      bestPostTime: '7-9 PM',
      contentTypes: ['صور شخصية 40%', 'قصص 30%', 'منتجات 20%', 'ريلز 10%'],
      recommendations: [
        'زيادة نشر الريلز لتحسين الوصول',
        'استخدام الهاشتاجات المحلية أكثر',
        'التفاعل مع المتابعين في أوقات الذروة',
        'إنشاء محتوى تفاعلي أكثر'
      ]
    };

    const analysisMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: `🔍 **تحليل شامل لحسابك على ${analysisResult.platform}**\n\n📊 **الإحصائيات الحالية:**\n• المتابعين: ${analysisResult.followers}\n• معدل التفاعل: ${analysisResult.engagement}\n• متوسط الإعجابات: ${analysisResult.avgLikes}\n• متوسط التعليقات: ${analysisResult.avgComments}\n• تكرار النشر: ${analysisResult.postFrequency}\n• أفضل وقت للنشر: ${analysisResult.bestPostTime}\n\n📈 **أنواع المحتوى:**\n${analysisResult.contentTypes.map(type => `• ${type}`).join('\n')}\n\n💡 **توصيات التحسين:**\n${analysisResult.recommendations.map(rec => `• ${rec}`).join('\n')}`,
      timestamp: new Date(),
      analytics: analysisResult,
      actionButtons: [
        { label: '🚀 احصل على متابعين مستهدفين', action: 'get_followers', data: { platform: 'instagram', type: 'targeted' } },
        { label: '❤️ زيادة التفاعل', action: 'boost_engagement', data: { platform: 'instagram' } },
        { label: '📹 خدمات الريلز', action: 'reels_services', data: { platform: 'instagram' } }
      ]
    };

    setMessages(prev => [...prev, analysisMessage]);
    setIsAnalyzing(false);
  };

  const generateAIResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    // محاكاة معالجة الذكاء الاصطناعي
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let response = '';
    let suggestions: string[] = [];
    let actionButtons: Array<{ label: string; action: string; data?: any }> = [];

    // معالجة الرسائل المختلفة
    if (userMessage.includes('تحليل') && userMessage.includes('حساب')) {
      response = '🔍 ممتاز! لتحليل حسابك بدقة، أرسل لي رابط حسابك على أي منصة.\n\nسأقوم بتحليل:\n• معدل التفاعل والنمو\n• جودة المتابعين\n• أفضل أوقات النشر\n• نوع المحتوى الأكثر نجاحاً\n• مقارنة مع المنافسين\n• اقتراحات تحسين مخصصة';
      suggestions = ['https://instagram.com/username', 'تحليل المنافسين', 'استراتيجية المحتوى'];
    } else if (userMessage.includes('استراتيجية') || userMessage.includes('نمو')) {
      response = '📈 **استراتيجية النمو المخصصة:**\n\n🎯 **المرحلة الأولى (أول شهر):**\n• زيادة المتابعين بنسبة 25-30%\n• تحسين معدل التفاعل إلى 5%+\n• نشر محتوى يومي متنوع\n\n🚀 **المرحلة الثانية (شهر 2-3):**\n• استهداف جمهور محدد\n• تعاونات مع مؤثرين\n• حملات إعلانية مدفوعة\n\n💎 **المرحلة الثالثة (شهر 4-6):**\n• بناء مجتمع قوي\n• محتوى حصري ومميز\n• تحقيق الدخل من المحتوى';
      actionButtons = [
        { label: '🎯 تطبيق الاستراتيجية', action: 'apply_strategy', data: { type: 'growth' } },
        { label: '📊 تتبع التقدم', action: 'track_progress' }
      ];
    } else if (userMessage.includes('منافس') || userMessage.includes('تحليل المنافسين')) {
      response = '🕵️ **تحليل المنافسين المتقدم:**\n\nسأحلل منافسيك وأقدم لك:\n• استراتيجياتهم في المحتوى\n• أوقات نشرهم المثلى\n• نوع المحتوى الأكثر تفاعلاً\n• الهاشتاجات المستخدمة\n• معدلات نموهم\n• نقاط القوة والضعف\n\nأرسل لي روابط 3-5 منافسين لك';
      suggestions = ['تحليل منافس محدد', 'مقارنة الأداء', 'استراتيجية التفوق'];
    } else if (userMessage.includes('محتوى') || userMessage.includes('تحسين')) {
      response = '✨ **اقتراحات تحسين المحتوى:**\n\n📝 **أنواع المحتوى المقترحة:**\n• محتوى تعليمي (30%)\n• محتوى ترفيهي (25%)\n• محتوى شخصي (20%)\n• محتوى ترويجي (15%)\n• محتوى تفاعلي (10%)\n\n🎨 **التحسينات المرئية:**\n• استخدام ألوان موحدة\n• قوالب تصميم ثابتة\n• جودة عالية للصور\n• فيديوهات قصيرة وجذابة';
      actionButtons = [
        { label: '🎨 خدمات التصميم', action: 'design_services' },
        { label: '📹 إنتاج المحتوى', action: 'content_creation' }
      ];
    } else if (userMessage.startsWith('http')) {
      await analyzeAccountFromLink(userMessage);
      setIsTyping(false);
      return;
    } else {
      response = 'شكراً لك! 😊 كيف يمكنني مساعدتك أكثر في تطوير حضورك الرقمي؟';
      suggestions = ['تحليل حساب جديد', 'خدمات أخرى', 'استشارة شخصية'];
    }

    const aiMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: response,
      timestamp: new Date(),
      suggestions,
      actionButtons
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageText = input;
    setInput('');

    await generateAIResponse(messageText);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleActionClick = (action: string, data?: any) => {
    if (onActionClick) {
      onActionClick(action, data);
    }
    
    toast({
      title: "تم تنفيذ الإجراء",
      description: "سيتم توجيهك للخدمة المناسبة",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto h-[600px] flex flex-col">
      <CardHeader className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardTitle className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">الوكيل الذكي المتطور</h3>
            <p className="text-blue-100 text-sm">مدعوم بالذكاء الاصطناعي • نشط الآن</p>
          </div>
          <div className="mr-auto flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">متصل</span>
          </div>
        </CardTitle>
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
                      : message.type === 'ai'
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : 'bg-gray-500 text-white'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : message.type === 'ai' ? (
                      <Bot className="h-4 w-4" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                  </div>
                  
                  <div className={`rounded-2xl p-4 ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs bg-white/50 hover:bg-white/70"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                    
                    {message.actionButtons && message.actionButtons.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.actionButtons.map((button, index) => (
                          <Button
                            key={index}
                            onClick={() => handleActionClick(button.action, button.data)}
                            className="text-xs bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                          >
                            {button.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {(isTyping || isAnalyzing) && (
              <div className="flex justify-start">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {isAnalyzing ? 'يجري تحليل الحساب...' : 'يكتب...'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="اكتب رسالتك أو أرسل رابط حسابك للتحليل..."
              className="flex-1 rounded-full border-2 border-gray-200 focus:border-blue-500"
              disabled={isTyping || isAnalyzing}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isTyping || isAnalyzing}
              className="rounded-full w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-500">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              مدعوم بالذكاء الاصطناعي
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              استجابة فورية
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              تحليل دقيق
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedAIChat;
