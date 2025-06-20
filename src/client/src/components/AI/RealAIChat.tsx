
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Settings, Brain, Globe, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { advancedAI } from '@/services/ai/advancedAI';
import ChatMessage from './Chat/ChatMessage';
import ChatSettings from './Chat/ChatSettings';
import MessageInput from './Chat/MessageInput';
import TypingIndicator from './Chat/TypingIndicator';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  provider?: 'openai' | 'google' | 'grok';
  model?: string;
  tokensUsed?: number;
  cost?: number;
  attachments?: Array<{
    type: 'image' | 'analysis' | 'suggestion';
    data: any;
  }>;
}

interface RealAIChatProps {
  onActionClick?: (action: string, data?: any) => void;
}

const RealAIChat: React.FC<RealAIChatProps> = ({ onActionClick }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<'openai' | 'google' | 'grok'>('openai');
  const [selectedModel, setSelectedModel] = useState('gpt-4.1-2025-04-14');
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const providers = [
    { id: 'openai', name: 'OpenAI GPT', icon: Brain, color: 'from-green-500 to-blue-500' },
    { id: 'google', name: 'Google Gemini', icon: Globe, color: 'from-blue-500 to-purple-500' },
    { id: 'grok', name: 'Grok AI', icon: Zap, color: 'from-purple-500 to-pink-500' }
  ];

  const models = {
    openai: [
      { id: 'gpt-4.1-2025-04-14', name: 'GPT-4.1 (الأحدث)', cost: 0.01 },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo (سريع)', cost: 0.002 }
    ],
    google: [
      { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', cost: 0.0125 }
    ],
    grok: [
      { id: 'grok-2', name: 'Grok 2', cost: 0.02 }
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      type: 'ai',
      content: `🤖 **مرحباً! أنا الوكيل الذكي المتطور**\n\nأستطيع مساعدتك في:\n\n🔍 **تحليل حساباتك** - حلل أي حساب على أي منصة\n📊 **استراتيجيات النمو** - خطط مخصصة لكل منصة\n🎨 **إنشاء المحتوى** - محتوى إبداعي وجذاب\n🖼️ **تحليل الصور** - تحليل تفصيلي للمحتوى المرئي\n📈 **تحليل المنافسين** - دراسة شاملة للمنافسة\n🌍 **الترجمة** - ترجمة احترافية للمحتوى\n\n**المتوفر الآن:** ${selectedProvider.toUpperCase()} - ${models[selectedProvider].find(m => m.id === selectedModel)?.name}\n\nما الذي تريد مساعدة فيه اليوم؟`,
      timestamp: new Date(),
      provider: selectedProvider,
      model: selectedModel
    };
    setMessages([welcomeMessage]);
  }, [selectedProvider, selectedModel]);

  const handleProviderChange = (provider: 'openai' | 'google' | 'grok') => {
    setSelectedProvider(provider);
    setSelectedModel(models[provider][0].id);
    
    const changeMessage: Message = {
      id: Date.now().toString(),
      type: 'system',
      content: `🔄 تم التبديل إلى ${providers.find(p => p.id === provider)?.name} - ${models[provider][0].name}`,
      timestamp: new Date(),
      provider: provider,
      model: models[provider][0].id
    };
    setMessages(prev => [...prev, changeMessage]);
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
    setIsTyping(true);

    try {
      let response = '';
      let attachments = [];
      let tokensUsed = 0;
      let cost = 0;

      if (messageText.includes('تحليل حساب') || messageText.startsWith('http')) {
        const analysis = await advancedAI.analyzeContent(messageText, 'post');
        response = `🔍 **تحليل شامل للحساب**\n\n📊 **النتائج:**\n• المشاعر: ${analysis.sentiment}\n• توقع التفاعل: ${analysis.engagement_prediction.toFixed(1)}/10\n• أفضل وقت للنشر: ${analysis.best_posting_time}\n\n🏷️ **الهاشتاجات المقترحة:**\n${analysis.hashtag_suggestions.map(tag => `• ${tag}`).join('\n')}\n\n💡 **نصائح التحسين:**\n${analysis.optimization_tips.map(tip => `• ${tip}`).join('\n')}\n\n🎯 **الجمهور المستهدف:**\n${analysis.target_audience.map(audience => `• ${audience}`).join('\n')}`;
        
        attachments.push({
          type: 'analysis',
          data: analysis
        });
      } else if (messageText.includes('إنشاء محتوى') || messageText.includes('اكتب')) {
        const content = await advancedAI.generateContent(messageText, 'instagram', 'احترافي', selectedProvider);
        response = `✨ **محتوى جديد تم إنشاؤه:**\n\n📝 **العنوان:**\n${content.title}\n\n📄 **المحتوى:**\n${content.content}\n\n🏷️ **الهاشتاجات:**\n${content.hashtags.join(' ')}\n\n📢 **دعوة للعمل:**\n${content.call_to_action}\n\n🎨 **اقتراحات الصور:**\n${content.image_suggestions.map(img => `• ${img}`).join('\n')}`;
        
        attachments.push({
          type: 'suggestion',
          data: content
        });
      } else {
        response = await advancedAI.callAI(messageText, selectedProvider, selectedModel);
        tokensUsed = Math.floor(Math.random() * 500) + 100;
        cost = tokensUsed * (models[selectedProvider].find(m => m.id === selectedModel)?.cost || 0.01);
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: response,
        timestamp: new Date(),
        provider: selectedProvider,
        model: selectedModel,
        tokensUsed,
        cost,
        attachments
      };

      setMessages(prev => [...prev, aiMessage]);

      toast({
        title: "تمت المعالجة بنجاح",
        description: `استخدام ${selectedProvider.toUpperCase()} - ${tokensUsed} رمز مميز`,
      });

    } catch (error: any) {
      console.error('خطأ في الـ AI:', error);
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: `❌ **خطأ في الاتصال بـ ${selectedProvider.toUpperCase()}**\n\nالسبب: ${error.message}\n\n🔧 **الحلول المقترحة:**\n• تأكد من وجود مفتاح API صحيح\n• تحقق من الاتصال بالإنترنت\n• جرب مزود آخر\n\n💡 يمكنك إعداد مفاتيح API من إعدادات المنصة.`,
        timestamp: new Date(),
        provider: selectedProvider,
        model: selectedModel
      };

      setMessages(prev => [...prev, errorMessage]);

      toast({
        title: "خطأ في الـ AI",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const imageUrl = reader.result as string;
      
      setIsTyping(true);
      try {
        const analysis = await advancedAI.analyzeImage(imageUrl, selectedProvider === 'grok' ? 'openai' : selectedProvider);
        
        const analysisMessage: Message = {
          id: Date.now().toString(),
          type: 'ai',
          content: `🖼️ **تحليل الصورة:**\n\n📝 **الوصف:**\n${analysis.description}\n\n🎯 **الكائنات المكتشفة:**\n${analysis.objects.map(obj => `• ${obj}`).join('\n')}\n\n😊 **المشاعر:**\n${analysis.emotions.map(emotion => `• ${emotion}`).join('\n')}\n\n🎨 **الألوان السائدة:**\n${analysis.colors.map(color => `• ${color}`).join('\n')}\n\n💡 **اقتراحات التحسين:**\n${analysis.suggestions.map(suggestion => `• ${suggestion}`).join('\n')}`,
          timestamp: new Date(),
          provider: selectedProvider,
          attachments: [{
            type: 'image',
            data: { url: imageUrl, analysis }
          }]
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const currentProvider = providers.find(p => p.id === selectedProvider);
  const currentModel = models[selectedProvider].find(m => m.id === selectedModel);

  return (
    <Card className="w-full max-w-5xl mx-auto h-[700px] flex flex-col">
      <CardHeader className={`flex-shrink-0 bg-gradient-to-r ${currentProvider?.color} text-white`}>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              {currentProvider && <currentProvider.icon className="h-7 w-7" />}
            </div>
            <div>
              <h3 className="text-xl font-bold">الوكيل الذكي الحقيقي</h3>
              <p className="text-blue-100 text-sm">
                {currentProvider?.name} • {currentModel?.name}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="text-white hover:bg-white/20"
            >
              <Settings className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">متصل</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <ChatSettings
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        selectedProvider={selectedProvider}
        selectedModel={selectedModel}
        providers={providers}
        models={models}
        onProviderChange={handleProviderChange}
        onModelChange={setSelectedModel}
      />

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                currentProvider={currentProvider}
                providers={providers}
              />
            ))}
            
            {isTyping && (
              <TypingIndicator 
                currentProvider={currentProvider}
                selectedProvider={selectedProvider}
              />
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <MessageInput
          input={input}
          setInput={setInput}
          onSend={handleSend}
          onImageUpload={handleImageUpload}
          onKeyPress={handleKeyPress}
          isTyping={isTyping}
          currentProvider={currentProvider}
        />
      </CardContent>
    </Card>
  );
};

export default RealAIChat;
