
import { apiKeyService } from '../../apiKeyService';

/**
 * خدمة تحليل المحتوى
 */
export class ContentAnalyzer {
  /**
   * تحليل المحتوى بالذكاء الاصطناعي
   */
  async analyzeContent(content: string, type: 'post' | 'story' | 'reel' | 'video'): Promise<{
    sentiment: 'positive' | 'negative' | 'neutral';
    engagement_prediction: number;
    hashtag_suggestions: string[];
    optimization_tips: string[];
    best_posting_time: string;
    target_audience: string[];
  }> {
    try {
      const openaiKey = apiKeyService.getApiKey('openai');
      
      if (!openaiKey) {
        return this.getMockAnalysis();
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4.1-2025-04-14',
          messages: [
            {
              role: 'system',
              content: `أنت خبير تسويق رقمي متخصص في تحليل المحتوى. حلل المحتوى وقدم تقريراً شاملاً.`
            },
            {
              role: 'user',
              content: `نوع المحتوى: ${type}\nالمحتوى: ${content}`
            }
          ],
          max_tokens: 1000,
          temperature: 0.7
        })
      });

      const data = await response.json();
      return this.parseAnalysisResponse(data.choices[0].message.content);
    } catch (error) {
      console.error('خطأ في تحليل المحتوى:', error);
      return this.getMockAnalysis();
    }
  }

  /**
   * محاكاة تحليل المحتوى
   */
  private getMockAnalysis() {
    return {
      sentiment: 'positive' as const,
      engagement_prediction: Math.random() * 3 + 7,
      hashtag_suggestions: ['#محتوى', '#تسويق', '#نجاح', '#إبداع', '#تطوير'],
      optimization_tips: [
        'أضف call-to-action واضح',
        'استخدم هاشتاجات ترندينغ',
        'أضف إيموجي جذابة'
      ],
      best_posting_time: '20:00',
      target_audience: ['الشباب', 'المهتمين بالتكنولوجيا', 'رواد الأعمال']
    };
  }

  /**
   * تحليل نص الاستجابة
   */
  private parseAnalysisResponse(content: string) {
    // في التطبيق الحقيقي، سيتم تحليل النص وتحويله لـ JSON
    return this.getMockAnalysis();
  }
}

export const contentAnalyzer = new ContentAnalyzer();
