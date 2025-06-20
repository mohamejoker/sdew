
import { apiKeyService } from '../../apiKeyService';

/**
 * خدمة توليد المحتوى
 */
export class ContentGenerator {
  /**
   * توليد المحتوى بالذكاء الاصطناعي
   */
  async generateContent(prompt: string, platform: string, style: string, provider: 'openai' | 'google' | 'grok' = 'openai'): Promise<{
    title: string;
    content: string;
    hashtags: string[];
    call_to_action: string;
    image_suggestions: string[];
  }> {
    try {
      const fullPrompt = `اكتب محتوى لـ ${platform} بأسلوب ${style} حول: ${prompt}. يجب أن يتضمن عنوان جذاب، محتوى مفصل، هاشتاجات مناسبة، دعوة للعمل، واقتراحات للصور.`;
      
      let response = '';
      switch (provider) {
        case 'openai':
          response = await this.generateWithOpenAI(fullPrompt);
          break;
        case 'google':
          response = await this.generateWithGoogle(fullPrompt);
          break;
        case 'grok':
          response = await this.generateWithGrok(fullPrompt);
          break;
      }

      return this.parseGeneratedContent(response);
    } catch (error) {
      console.error('خطأ في توليد المحتوى:', error);
      return this.getMockContent(prompt, platform, style);
    }
  }

  /**
   * توليد المحتوى باستخدام OpenAI
   */
  private async generateWithOpenAI(prompt: string): Promise<string> {
    const apiKey = apiKeyService.getApiKey('openai');
    if (!apiKey) throw new Error('مفتاح OpenAI API غير متوفر');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          {
            role: 'system',
            content: 'أنت مساعد ذكي متخصص في التسويق الرقمي ووسائل التواصل الاجتماعي.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  }

  /**
   * توليد المحتوى باستخدام Google
   */
  private async generateWithGoogle(prompt: string): Promise<string> {
    const apiKey = apiKeyService.getApiKey('google');
    if (!apiKey) throw new Error('مفتاح Google API غير متوفر');

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000
        }
      })
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }

  /**
   * توليد المحتوى باستخدام Grok
   */
  private async generateWithGrok(prompt: string): Promise<string> {
    const apiKey = apiKeyService.getApiKey('grok');
    if (!apiKey) throw new Error('مفتاح Grok API غير متوفر');

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'grok-2',
        messages: [
          {
            role: 'system',
            content: 'أنت مساعد ذكي متخصص في التسويق الرقمي.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
        stream: false
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  }

  /**
   * محاكاة توليد المحتوى
   */
  private getMockContent(prompt: string, platform: string, style: string) {
    return {
      title: 'محتوى إبداعي جديد',
      content: `محتوى مخصص لـ ${platform} بأسلوب ${style} حول ${prompt}`,
      hashtags: ['#محتوى', '#إبداع', '#تسويق'],
      call_to_action: 'شاركنا رأيك في التعليقات!',
      image_suggestions: ['صورة ملهمة', 'إنفوجرافيك', 'صورة المنتج']
    };
  }

  /**
   * تحليل المحتوى المولد
   */
  private parseGeneratedContent(content: string) {
    // في التطبيق الحقيقي، سيتم تحليل النص وتحويله لتنسيق مناسب
    return this.getMockContent('', '', '');
  }
}

export const contentGenerator = new ContentGenerator();
