
import { apiKeyService } from '../../apiKeyService';

export class OpenAIProvider {
  private apiKey: string | null = null;

  constructor() {
    this.apiKey = apiKeyService.getApiKey('openai');
  }

  async callChatCompletion(messages: any[], model: string = 'gpt-4o-mini'): Promise<string> {
    if (!this.apiKey) {
      throw new Error('مفتاح OpenAI API غير متوفر');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  async analyzeImage(imageUrl: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('مفتاح OpenAI API غير متوفر');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'حلل هذه الصورة وصف محتواها بالتفصيل'
              },
              {
                type: 'image_url',
                image_url: { url: imageUrl }
              }
            ]
          }
        ],
        max_tokens: 500
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  }

  async generateContent(prompt: string, type: 'social_post' | 'article' | 'marketing'): Promise<string> {
    const systemPrompts = {
      social_post: 'أنت خبير في كتابة المحتوى لوسائل التواصل الاجتماعي',
      article: 'أنت كاتب مقالات محترف',
      marketing: 'أنت خبير في التسويق الرقمي'
    };

    return await this.callChatCompletion([
      { role: 'system', content: systemPrompts[type] },
      { role: 'user', content: prompt }
    ]);
  }
}

export const openaiProvider = new OpenAIProvider();
