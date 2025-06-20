
import { ConversationMemory } from '../types/aiTypes';

export class ConversationMemoryManager {
  private memory: ConversationMemory = {
    preferences: {
      platforms: [],
      industry: '',
      goals: []
    },
    pastInteractions: [],
    achievements: []
  };

  updateMemory(update: Partial<ConversationMemory>) {
    this.memory = { ...this.memory, ...update };
  }

  addInteraction(topic: string, context: string) {
    this.memory.pastInteractions = [
      ...this.memory.pastInteractions.slice(-10), // Keep last 10 interactions
      {
        topic,
        context,
        timestamp: new Date()
      }
    ];
  }

  extractTopic(message: string): string {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('متابع') || lowerMessage.includes('follower')) return 'زيادة المتابعين';
    if (lowerMessage.includes('محتوى') || lowerMessage.includes('محتوي')) return 'إنشاء المحتوى';
    if (lowerMessage.includes('استراتيجية') || lowerMessage.includes('خطة')) return 'الاستراتيجية';
    if (lowerMessage.includes('تحليل')) return 'التحليل';
    if (lowerMessage.includes('إعلان')) return 'الإعلانات';
    return 'عام';
  }

  getConversationSummary(): string {
    const recentTopics = this.memory.pastInteractions
      .slice(-5)
      .map(interaction => interaction.topic)
      .filter((topic, index, arr) => arr.indexOf(topic) === index);
    
    return `المواضيع الأخيرة: ${recentTopics.join('، ')}`;
  }

  getMemory(): ConversationMemory {
    return this.memory;
  }
}
