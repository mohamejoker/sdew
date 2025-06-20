
import { CoreAIService } from './core/coreAIService';
import { TaskManagementService } from './core/taskManagementService';
import type { AIModel, AITask } from './models/aiModels';

/**
 * خدمة الذكاء الاصطناعي المتقدمة
 */
class AdvancedAIService {
  private coreService: CoreAIService;
  private taskService: TaskManagementService;

  constructor() {
    this.coreService = new CoreAIService();
    this.taskService = new TaskManagementService();
  }

  /**
   * تحليل المحتوى بالذكاء الاصطناعي
   */
  async analyzeContent(content: string, type: 'post' | 'story' | 'reel' | 'video') {
    return await this.coreService.analyzeContent(content, type);
  }

  /**
   * توليد المحتوى بالذكاء الاصطناعي
   */
  async generateContent(prompt: string, platform: string, style: string, provider: 'openai' | 'google' | 'grok' = 'openai') {
    return await this.coreService.generateContent(prompt, platform, style, provider);
  }

  /**
   * تحليل الصور بالذكاء الاصطناعي
   */
  async analyzeImage(imageUrl: string, provider: 'openai' | 'google' = 'openai') {
    return await this.coreService.analyzeImage(imageUrl, provider);
  }

  /**
   * استدعاء AI حسب المزود المختار
   */
  async callAI(message: string, provider: 'openai' | 'google' | 'grok' = 'openai', model?: string): Promise<string> {
    return await this.coreService.callAI(message, provider, model);
  }

  /**
   * الحصول على النماذج المتاحة
   */
  getAvailableModels(provider?: string): AIModel[] {
    return this.coreService.getAvailableModels(provider);
  }

  /**
   * الحصول على مزود متاح
   */
  async getAvailableModel(): Promise<{ provider: string; model: string } | null> {
    return await this.coreService.getAvailableModel();
  }

  /**
   * إدارة المهام
   */
  getTasks(status?: AITask['status']): AITask[] {
    return this.taskService.getTasks(status);
  }

  getTaskById(id: string): AITask | undefined {
    return this.taskService.getTaskById(id);
  }

  /**
   * إحصائيات الاستخدام
   */
  getUsageStats() {
    return this.taskService.getUsageStats();
  }
}

export const advancedAI = new AdvancedAIService();
export type { AIModel, AITask };
