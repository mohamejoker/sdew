
import { apiKeyService } from '../../apiKeyService';

export class GoogleProvider {
  private apiKey: string | null = null;

  constructor() {
    this.apiKey = apiKeyService.getApiKey('google');
  }

  async callGemini(prompt: string, model: string = 'gemini-1.5-pro'): Promise<string> {
    if (!this.apiKey) {
      throw new Error('مفتاح Google API غير متوفر');
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Google API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }

  async analyzeData(data: any[], analysisType: 'trends' | 'insights' | 'predictions'): Promise<string> {
    const prompts = {
      trends: 'حلل البيانات التالية واستخرج الاتجاهات الرئيسية',
      insights: 'حلل البيانات واستخرج الرؤى المهمة',
      predictions: 'حلل البيانات وقدم توقعات للمستقبل'
    };

    const prompt = `${prompts[analysisType]}:\n${JSON.stringify(data, null, 2)}`;
    return await this.callGemini(prompt);
  }
}

export const googleProvider = new GoogleProvider();
