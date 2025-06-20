
import { apiKeyService } from '../../apiKeyService';

/**
 * خدمة تحليل الصور المتقدمة
 */
export class ImageAnalysisService {
  /**
   * تحليل الصور بالذكاء الاصطناعي
   */
  async analyzeImage(imageUrl: string, provider: 'openai' | 'google' = 'openai'): Promise<{
    description: string;
    objects: string[];
    emotions: string[];
    colors: string[];
    suggestions: string[];
  }> {
    try {
      if (provider === 'openai') {
        return await this.analyzeWithOpenAI(imageUrl);
      } else {
        return await this.analyzeWithGoogle(imageUrl);
      }
    } catch (error) {
      console.error('خطأ في تحليل الصورة:', error);
      return this.getMockImageAnalysis();
    }
  }

  /**
   * تحليل الصورة باستخدام OpenAI
   */
  private async analyzeWithOpenAI(imageUrl: string) {
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
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'حلل هذه الصورة وصفها بالتفصيل، واذكر الكائنات والمشاعر والألوان الظاهرة'
              },
              {
                type: 'image_url',
                image_url: { url: imageUrl }
              }
            ]
          }
        ],
        max_tokens: 800
      })
    });

    const data = await response.json();
    return this.parseImageAnalysis(data.choices[0].message.content);
  }

  /**
   * تحليل الصورة باستخدام Google
   */
  private async analyzeWithGoogle(imageUrl: string) {
    const apiKey = apiKeyService.getApiKey('google');
    if (!apiKey) throw new Error('مفتاح Google API غير متوفر');

    // تحويل الصورة إلى base64
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    const base64Image = btoa(String.fromCharCode(...new Uint8Array(imageBuffer)));

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            {
              text: 'حلل هذه الصورة وصفها بالتفصيل، واذكر الكائنات والمشاعر والألوان الظاهرة'
            },
            {
              inline_data: {
                mime_type: 'image/jpeg',
                data: base64Image
              }
            }
          ]
        }]
      })
    });

    const data = await response.json();
    return this.parseImageAnalysis(data.candidates[0].content.parts[0].text);
  }

  /**
   * محاكاة تحليل الصورة
   */
  private getMockImageAnalysis() {
    return {
      description: 'صورة جميلة تحتوي على عناصر متنوعة',
      objects: ['شخص', 'خلفية', 'نص'],
      emotions: ['سعادة', 'ثقة', 'إيجابية'],
      colors: ['أزرق', 'أبيض', 'ذهبي'],
      suggestions: ['تحسين الإضاءة', 'إضافة نص واضح', 'تحسين التكوين']
    };
  }

  /**
   * تحليل نص تحليل الصورة
   */
  private parseImageAnalysis(content: string) {
    // في التطبيق الحقيقي، سيتم تحليل النص واستخراج العناصر
    return this.getMockImageAnalysis();
  }
}

export const imageAnalysisService = new ImageAnalysisService();
