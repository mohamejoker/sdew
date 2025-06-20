
import { apiKeyService } from '../../apiKeyService';
import { contentAnalyzer } from '../analysis/contentAnalyzer';
import { contentGenerator } from '../generation/contentGenerator';
import { imageAnalysisService } from '../analysis/imageAnalysisService';
import { taskManager } from '../tasks/taskManager';
import { AI_MODELS } from '../models/aiModels';
import { openaiProvider } from '../providers/openaiProvider';
import { googleProvider } from '../providers/googleProvider';
import { grokProvider } from '../providers/grokProvider';
import type { AIModel, AITask } from '../models/aiModels';
import type { AIServiceInterface } from './aiServiceInterface';

export class CoreAIService implements AIServiceInterface {
  /**
   * استدعاء AI حسب المزود المختار
   */
  async callAI(message: string, provider: 'openai' | 'google' | 'grok' = 'openai', model?: string): Promise<string> {
    try {
      switch (provider) {
        case 'openai':
          return await this.callOpenAI(message, model);
        case 'google':
          return await this.callGemini(message);
        case 'grok':
          return await this.callGrok(message);
        default:
          throw new Error('مزود AI غير مدعوم');
      }
    } catch (error) {
      console.error(`خطأ في استدعاء ${provider}:`, error);
      throw error;
    }
  }

  /**
   * تحليل المحتوى بالذكاء الاصطناعي
   */
  async analyzeContent(content: string, type: 'post' | 'story' | 'reel' | 'video') {
    return await contentAnalyzer.analyzeContent(content, type);
  }

  /**
   * توليد المحتوى بالذكاء الاصطناعي
   */
  async generateContent(prompt: string, platform: string, style: string, provider: 'openai' | 'google' | 'grok' = 'openai') {
    return await contentGenerator.generateContent(prompt, platform, style, provider);
  }

  /**
   * تحليل الصور بالذكاء الاصطناعي
   */
  async analyzeImage(imageUrl: string, provider: 'openai' | 'google' = 'openai') {
    return await imageAnalysisService.analyzeImage(imageUrl, provider);
  }

  /**
   * استدعاء OpenAI
   */
  private async callOpenAI(message: string, model: string = 'gpt-4.1-2025-04-14'): Promise<string> {
    const apiKey = apiKeyService.getApiKey('openai');
    if (!apiKey) throw new Error('مفتاح OpenAI API غير متوفر');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: 'أنت مساعد ذكي متخصص في التسويق الرقمي ووسائل التواصل الاجتماعي.'
          },
          {
            role: 'user',
            content: message
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
   * استدعاء Google Gemini
   */
  private async callGemini(message: string): Promise<string> {
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
            text: message
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
   * استدعاء Grok
   */
  private async callGrok(message: string): Promise<string> {
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
            content: message
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
   * الحصول على النماذج المتاحة
   */
  getAvailableModels(provider?: string): AIModel[] {
    if (provider) {
      return AI_MODELS.filter(model => model.provider === provider);
    }
    return AI_MODELS;
  }

  /**
   * الحصول على مزود متاح
   */
  async getAvailableModel(): Promise<{ provider: string; model: string } | null> {
    const providers = apiKeyService.getActiveProviders();
    
    for (const provider of providers) {
      if (apiKeyService.hasApiKey(provider)) {
        switch (provider) {
          case 'openai':
            return { provider: 'openai', model: 'gpt-4' };
          case 'google':
            return { provider: 'google', model: 'gemini-pro' };
          case 'grok':
            return { provider: 'grok', model: 'grok-beta' };
        }
      }
    }
    
    return null;
  }
}
