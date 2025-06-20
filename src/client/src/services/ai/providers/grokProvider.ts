
import { apiKeyService } from '../../apiKeyService';

export class GrokProvider {
  private apiKey: string | null = null;

  constructor() {
    this.apiKey = apiKeyService.getApiKey('grok');
  }

  async callGrok(messages: any[], model: string = 'grok-2'): Promise<string> {
    if (!this.apiKey) {
      throw new Error('مفتاح Grok API غير متوفر');
    }

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 1000,
        temperature: 0.7,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`Grok API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  async generateStrategy(businessData: any): Promise<string> {
    const prompt = `بناءً على البيانات التالية، اقترح استراتيجية تسويقية شاملة:\n${JSON.stringify(businessData, null, 2)}`;
    
    return await this.callGrok([
      { role: 'system', content: 'أنت استشاري تسويق رقمي خبير' },
      { role: 'user', content: prompt }
    ]);
  }
}

export const grokProvider = new GrokProvider();
