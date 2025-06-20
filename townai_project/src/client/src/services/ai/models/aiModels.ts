
/**
 * تعريفات نماذج الذكاء الاصطناعي
 */
export interface AIModel {
  id: string;
  name: string;
  provider: 'openai' | 'anthropic' | 'google' | 'grok';
  capabilities: string[];
  costPerToken: number;
  maxTokens: number;
}

export interface AITask {
  id: string;
  type: 'content_generation' | 'image_analysis' | 'sentiment_analysis' | 'translation' | 'summarization' | 'content_analysis';
  input: any;
  output?: any;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
  modelUsed?: string;
  tokensUsed?: number;
  cost?: number;
}

export const AI_MODELS: AIModel[] = [
  {
    id: 'gpt-4.1-2025-04-14',
    name: 'GPT-4.1',
    provider: 'openai',
    capabilities: ['text', 'vision', 'code'],
    costPerToken: 0.01,
    maxTokens: 128000
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'openai',
    capabilities: ['text', 'code'],
    costPerToken: 0.002,
    maxTokens: 16000
  },
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'google',
    capabilities: ['text', 'vision', 'analysis'],
    costPerToken: 0.0125,
    maxTokens: 2000000
  },
  {
    id: 'grok-2',
    name: 'Grok 2',
    provider: 'grok',
    capabilities: ['text', 'realtime', 'x-integration'],
    costPerToken: 0.02,
    maxTokens: 131072
  }
];
