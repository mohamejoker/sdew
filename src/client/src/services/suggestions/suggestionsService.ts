
export interface Suggestion {
  id: string;
  title: string;
  description: string;
  category: 'marketing' | 'content' | 'analytics' | 'growth' | 'engagement';
  priority: 'high' | 'medium' | 'low';
  isImplemented: boolean;
  estimatedImpact: 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'medium' | 'hard';
  timeToImplement: string;
  tags: string[];
}

export class SuggestionsService {
  private suggestions: Suggestion[] = [
    // اقتراحات التسويق
    {
      id: 'marketing-1',
      title: 'استراتيجية المحتوى الموسمي',
      description: 'إنشاء محتوى مخصص للمناسبات والأعياد لزيادة التفاعل بنسبة 45%',
      category: 'marketing',
      priority: 'high',
      isImplemented: false,
      estimatedImpact: 'high',
      difficulty: 'medium',
      timeToImplement: '2-3 أسابيع',
      tags: ['محتوى', 'مناسبات', 'تفاعل']
    },
    {
      id: 'marketing-2',
      title: 'حملات التأثير المصغر',
      description: 'التعاون مع المؤثرين المصغرين لتحقيق ROI أفضل بنسبة 60%',
      category: 'marketing',
      priority: 'medium',
      isImplemented: false,
      estimatedImpact: 'high',
      difficulty: 'easy',
      timeToImplement: '1-2 أسبوع',
      tags: ['مؤثرين', 'ROI', 'تعاون']
    },
    
    // اقتراحات المحتوى
    {
      id: 'content-1',
      title: 'فيديوهات قصيرة تفاعلية',
      description: 'إنتاج فيديوهات 15-30 ثانية بمعدل مشاهدة 80% أعلى',
      category: 'content',
      priority: 'high',
      isImplemented: false,
      estimatedImpact: 'high',
      difficulty: 'medium',
      timeToImplement: '1 أسبوع',
      tags: ['فيديو', 'تفاعلي', 'قصير']
    },
    {
      id: 'content-2',
      title: 'القصص التفاعلية اليومية',
      description: 'نشر قصص يومية بأسئلة واستطلاعات لزيادة المتابعة بنسبة 35%',
      category: 'content',
      priority: 'medium',
      isImplemented: true,
      estimatedImpact: 'medium',
      difficulty: 'easy',
      timeToImplement: 'مكتمل',
      tags: ['قصص', 'يومي', 'استطلاعات']
    },
    
    // اقتراحات التحليلات
    {
      id: 'analytics-1',
      title: 'تتبع متقدم للتحويلات',
      description: 'تطبيق نظام تتبع شامل لقياس ROI بدقة 95%',
      category: 'analytics',
      priority: 'high',
      isImplemented: false,
      estimatedImpact: 'high',
      difficulty: 'hard',
      timeToImplement: '3-4 أسابيع',
      tags: ['تتبع', 'تحويلات', 'ROI']
    },
    {
      id: 'analytics-2',
      title: 'تقارير أداء أسبوعية',
      description: 'تقارير آلية مفصلة لتحسين القرارات بنسبة 50%',
      category: 'analytics',
      priority: 'medium',
      isImplemented: false,
      estimatedImpact: 'medium',
      difficulty: 'medium',
      timeToImplement: '1-2 أسبوع',
      tags: ['تقارير', 'أسبوعي', 'آلي']
    },
    
    // اقتراحات النمو
    {
      id: 'growth-1',
      title: 'برنامج الإحالة المكافآت',
      description: 'نظام مكافآت للعملاء المحيلين يزيد النمو بنسبة 120%',
      category: 'growth',
      priority: 'high',
      isImplemented: false,
      estimatedImpact: 'high',
      difficulty: 'medium',
      timeToImplement: '2 أسبوع',
      tags: ['إحالة', 'مكافآت', 'نمو']
    },
    {
      id: 'growth-2',
      title: 'استراتيجية التسعير المرن',
      description: 'تطبيق أسعار ديناميكية لزيادة المبيعات بنسبة 40%',
      category: 'growth',
      priority: 'medium',
      isImplemented: false,
      estimatedImpact: 'medium',
      difficulty: 'hard',
      timeToImplement: '3 أسابيع',
      tags: ['تسعير', 'مرن', 'مبيعات']
    },
    
    // اقتراحات التفاعل
    {
      id: 'engagement-1',
      title: 'مسابقات أسبوعية تفاعلية',
      description: 'مسابقات منتظمة تزيد التفاعل بنسبة 200%',
      category: 'engagement',
      priority: 'high',
      isImplemented: true,
      estimatedImpact: 'high',
      difficulty: 'easy',
      timeToImplement: 'مكتمل',
      tags: ['مسابقات', 'أسبوعي', 'تفاعل']
    },
    {
      id: 'engagement-2',
      title: 'محتوى تفاعلي مباشر',
      description: 'بث مباشر أسبوعي للتفاعل المباشر مع الجمهور',
      category: 'engagement',
      priority: 'medium',
      isImplemented: false,
      estimatedImpact: 'high',
      difficulty: 'medium',
      timeToImplement: '1 أسبوع',
      tags: ['مباشر', 'تفاعل', 'جمهور']
    }
  ];

  getAllSuggestions(): Suggestion[] {
    return this.suggestions;
  }

  getSuggestionsByCategory(category: Suggestion['category']): Suggestion[] {
    return this.suggestions.filter(s => s.category === category);
  }

  getSuggestionsByPriority(priority: Suggestion['priority']): Suggestion[] {
    return this.suggestions.filter(s => s.priority === priority);
  }

  getUnimplementedSuggestions(): Suggestion[] {
    return this.suggestions.filter(s => !s.isImplemented);
  }

  implementSuggestion(id: string): void {
    const suggestion = this.suggestions.find(s => s.id === id);
    if (suggestion) {
      suggestion.isImplemented = true;
    }
  }

  addCustomSuggestion(suggestion: Omit<Suggestion, 'id'>): Suggestion {
    const newSuggestion: Suggestion = {
      ...suggestion,
      id: `custom-${Date.now()}`
    };
    this.suggestions.push(newSuggestion);
    return newSuggestion;
  }

  getStats() {
    const total = this.suggestions.length;
    const implemented = this.suggestions.filter(s => s.isImplemented).length;
    const highPriority = this.suggestions.filter(s => s.priority === 'high').length;
    const highImpact = this.suggestions.filter(s => s.estimatedImpact === 'high').length;

    return {
      total,
      implemented,
      pending: total - implemented,
      completionRate: Math.round((implemented / total) * 100),
      highPriority,
      highImpact
    };
  }
}

export const suggestionsService = new SuggestionsService();
