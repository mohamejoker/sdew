
export interface AIServiceInterface {
  callAI(message: string, provider: 'openai' | 'google' | 'grok', model?: string): Promise<string>;
  analyzeContent(content: string, type: 'post' | 'story' | 'reel' | 'video'): Promise<any>;
  generateContent(prompt: string, platform: string, style: string, provider?: 'openai' | 'google' | 'grok'): Promise<any>;
  analyzeImage(imageUrl: string, provider?: 'openai' | 'google'): Promise<any>;
  getAvailableModels(provider?: string): any[];
  getAvailableModel(): Promise<{ provider: string; model: string } | null>;
}
