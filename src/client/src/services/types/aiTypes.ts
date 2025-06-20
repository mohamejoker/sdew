
export interface AIAgentResponse {
  message: string;
  type: 'text' | 'action' | 'suggestion' | 'analysis' | 'plan';
  actions?: Array<{
    label: string;
    action: string;
    data?: any;
    icon?: string;
  }>;
  suggestions?: string[];
  analysis?: {
    score: number;
    insights: string[];
    recommendations: string[];
  };
  plan?: {
    title: string;
    steps: Array<{
      step: string;
      description: string;
      priority: 'high' | 'medium' | 'low';
    }>;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'action' | 'suggestion' | 'analysis' | 'plan';
  actions?: Array<{
    label: string;
    action: string;
    data?: any;
    icon?: string;
  }>;
  analysis?: {
    score: number;
    insights: string[];
    recommendations: string[];
  };
  attachments?: Array<{
    type: 'image' | 'document';
    url: string;
    name: string;
  }>;
}

export interface ConversationMemory {
  userId?: string;
  preferences: {
    platforms: string[];
    industry: string;
    goals: string[];
    budget?: string;
  };
  pastInteractions: Array<{
    topic: string;
    context: string;
    timestamp: Date;
  }>;
  achievements: Array<{
    goal: string;
    completedAt: Date;
    result: string;
  }>;
}
