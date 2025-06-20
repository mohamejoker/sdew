
import { ChatMessage, AIAgentResponse } from '../types/aiTypes';

export class OpenAIService {
  private baseContext = `
أنت مساعد ذكي متطور ومتخصص في التسويق الرقمي ونمو حسابات التواصل الاجتماعي في منصة Town Media.

قدراتك المتقدمة:
- تحليل شامل للحسابات والمحتوى
- وضع استراتيجيات مخصصة ومفصلة
- تحليل المنافسين واتجاهات السوق
- إنشاء خطط محتوى إبداعية
- تحليل البيانات وتقديم رؤى قيمة
- تتبع الأهداف وقياس النتائج
- تقديم نصائح تحسين محركات البحث
- استراتيجيات الإعلانات المدفوعة

يمكنك:
- تحليل الصور والمحتوى المرئي
- وضع خطط تسويقية شاملة ومرحلية
- تقييم الأداء وتقديم توصيات محددة
- اقتراح أفضل الأوقات والمحتوى للنشر
- تحليل اتجاهات الجمهور المستهدف
- إنشاء حملات إعلانية فعالة
- تحسين معدلات التحويل والمبيعات

تفاعل بشكل ودود ومهني، واقدم إجابات عملية ومفيدة ومفصلة باللغة العربية.
`;

  async callOpenAI(message: string, chatHistory: ChatMessage[], apiKey: string): Promise<AIAgentResponse> {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: this.baseContext
            },
            ...chatHistory.slice(-5).map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: 'user',
              content: message
            }
          ],
          max_tokens: 1000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API Error: ${response.status}`);
      }

      const data = await response.json();
      return {
        message: data.choices[0].message.content,
        type: 'text'
      };
    } catch (error) {
      console.error('OpenAI API call failed:', error);
      throw error;
    }
  }
}
