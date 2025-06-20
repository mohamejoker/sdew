
import { openaiProvider } from './ai/providers/openaiProvider';
import { googleProvider } from './ai/providers/googleProvider';
import { grokProvider } from './ai/providers/grokProvider';

export interface AIAgentResponse {
  message: string;
  type: 'text' | 'action' | 'suggestion' | 'analysis' | 'plan';
  actions?: Array<{
    label: string;
    action: string;
    data?: any;
    icon?: string;
  }>;
  suggestions?: string[];
  analysis?: {
    score: number;
    insights: string[];
    recommendations: string[];
  };
  plan?: {
    title: string;
    steps: Array<{
      step: string;
      description: string;
      priority: 'high' | 'medium' | 'low';
    }>;
  };
}

export class AIAgent {
  private providers = {
    openai: openaiProvider,
    google: googleProvider,
    grok: grokProvider
  };

  private conversationHistory: string[] = [];

  async generateContent(prompt: string, provider: 'openai' | 'google' | 'grok' = 'openai'): Promise<string> {
    try {
      this.conversationHistory.push(prompt);
      
      switch (provider) {
        case 'openai':
          return await this.providers.openai.generateContent(prompt, 'marketing');
        case 'google':
          return await this.providers.google.callGemini(prompt);
        case 'grok':
          return await this.providers.grok.callGrok([
            { role: 'user', content: prompt }
          ]);
        default:
          throw new Error('مزود غير مدعوم');
      }
    } catch (error) {
      console.error('خطأ في توليد المحتوى:', error);
      throw error;
    }
  }

  async analyzeImage(imageUrl: string): Promise<AIAgentResponse> {
    const result = await this.providers.openai.analyzeImage(imageUrl);
    return {
      message: result,
      type: 'analysis',
      analysis: {
        score: Math.floor(Math.random() * 30) + 70,
        insights: [
          'جودة الصورة ممتازة',
          'الإضاءة مناسبة للمحتوى',
          'التركيب البصري جذاب'
        ],
        recommendations: [
          'يمكن تحسين الألوان قليلاً',
          'إضافة نص توضيحي',
          'استخدام فلاتر مناسبة'
        ]
      }
    };
  }

  async generateStrategy(businessData: any): Promise<string> {
    return await this.providers.grok.generateStrategy(businessData);
  }

  async analyzeData(data: any[], analysisType: 'trends' | 'insights' | 'predictions' = 'insights'): Promise<string> {
    return await this.providers.google.analyzeData(data, analysisType);
  }

  getConversationSummary(): string {
    if (this.conversationHistory.length === 0) {
      return 'لا توجد محادثات سابقة';
    }
    
    const lastMessages = this.conversationHistory.slice(-3);
    return `آخر المواضيع: ${lastMessages.join(', ').substring(0, 100)}...`;
  }
}

export const aiAgent = new AIAgent();
