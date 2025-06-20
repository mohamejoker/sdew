import { AIAgentResponse, ChatMessage } from '../types/aiTypes';
import { designResponseService } from './designResponses';

export class MockResponseService {
  getNoApiKeyResponse(): AIAgentResponse {
    return {
      message: `لاستخدام المساعد الذكي بكامل قدراته، يرجى إضافة مفتاح OpenAI API الخاص بك في الإعدادات.

يمكنك الحصول على مفتاح مجاني من منصة OpenAI والاستمتاع بخدمات الذكاء الاصطناعي المتقدمة.

في الوقت الحالي، يمكنني مساعدتك بالوضع التجريبي المحدود.`,
      type: 'text',
      actions: [
        {
          label: 'إعداد مفتاح API',
          action: 'setup_api_key',
          icon: 'Key'
        }
      ]
    };
  }

  getAdvancedMockResponse(message: string, chatHistory: ChatMessage[]): AIAgentResponse {
    const lowerMessage = message.toLowerCase();
    
    // التحقق من طلبات التصميم أولاً
    const designResponse = designResponseService.getDesignSuggestions(message);
    if (designResponse) {
      return designResponse;
    }
    
    // Advanced Analytics Response
    if (lowerMessage.includes('تحليل') || lowerMessage.includes('تقييم')) {
      return {
        message: 'بناءً على تحليلي المتقدم لحسابك، إليك التقييم الشامل والتوصيات المخصصة:',
        type: 'analysis',
        analysis: {
          score: 78,
          insights: [
            'معدل التفاعل أعلى من المتوسط بنسبة 15%',
            'المحتوى المرئي يحقق تفاعل أكبر بـ 40%',
            'أفضل أوقات النشر: 8-10 صباحاً و 7-9 مساءً',
            'الجمهور المستهدف يفضل المحتوى التعليمي والترفيهي'
          ],
          recommendations: [
            'زيادة المحتوى المرئي (فيديو، انفوجرافيك)',
            'تحسين استخدام الهاشتاجات المتخصصة',
            'إنشاء سلاسل محتوى تفاعلي',
            'التفاعل المباشر مع التعليقات خلال ساعة'
          ]
        },
        actions: [
          {
            label: 'إنشاء خطة محتوى مخصصة',
            action: 'create_content_strategy',
            icon: 'Calendar'
          },
          {
            label: 'تحليل المنافسين',
            action: 'analyze_competitors',
            icon: 'TrendingUp'
          },
          {
            label: 'تحسين الملف الشخصي',
            action: 'optimize_profile',
            icon: 'User'
          }
        ]
      };
    }

    // Strategic Planning Response
    if (lowerMessage.includes('استراتيجية') || lowerMessage.includes('خطة')) {
      return {
        message: 'سأضع لك استراتيجية شاملة ومرحلية لتحقيق أهدافك:',
        type: 'plan',
        plan: {
          title: 'استراتيجية النمو الرقمي - 90 يوم',
          steps: [
            {
              step: 'المرحلة الأولى (الأسابيع 1-2)',
              description: 'تحسين الملف الشخصي وإنشاء هوية بصرية متسقة',
              priority: 'high'
            },
            {
              step: 'المرحلة الثانية (الأسابيع 3-6)',
              description: 'إنتاج محتوى عالي الجودة وبناء جدول نشر منتظم',
              priority: 'high'
            },
            {
              step: 'المرحلة الثالثة (الأسابيع 7-10)',
              description: 'تنفيذ حملات إعلانية مستهدفة وتحليل النتائج',
              priority: 'medium'
            },
            {
              step: 'المرحلة الرابعة (الأسابيع 11-12)',
              description: 'تحسين الاستراتيجية وتوسيع الوصول',
              priority: 'medium'
            }
          ]
        },
        actions: [
          {
            label: 'بدء تنفيذ الخطة',
            action: 'start_strategy_implementation',
            icon: 'Play'
          },
          {
            label: 'تخصيص الخطة',
            action: 'customize_strategy',
            icon: 'Settings'
          }
        ]
      };
    }

    // Followers Growth Response
    if (lowerMessage.includes('متابع') || lowerMessage.includes('follower')) {
      return {
        message: 'استراتيجية شاملة لزيادة المتابعين بجودة عالية ومعدل تفاعل ممتاز:',
        type: 'suggestion',
        suggestions: [
          'كيف أنشئ محتوى فيرالي؟',
          'ما أفضل استراتيجيات التعاون؟',
          'كيف أستهدف الجمهور المناسب؟',
          'طرق تحسين خوارزمية المنصات'
        ],
        actions: [
          {
            label: 'خدمات المتابعين المتميزة',
            action: 'view_premium_followers',
            data: { category: 'premium_followers' },
            icon: 'Users'
          },
          {
            label: 'استراتيجية النمو العضوي',
            action: 'organic_growth_strategy',
            icon: 'TrendingUp'
          },
          {
            label: 'تحليل الجمهور المستهدف',
            action: 'audience_analysis',
            icon: 'Target'
          },
          {
            label: 'برنامج التعاون مع المؤثرين',
            action: 'influencer_collaboration',
            icon: 'Users'
          }
        ]
      };
    }

    // Content Creation Response with Design Integration
    if (lowerMessage.includes('محتوى') || lowerMessage.includes('محتوي')) {
      return {
        message: 'دعني أساعدك في إنشاء محتوى إبداعي وجذاب يحقق أهدافك التسويقية:',
        type: 'action',
        actions: [
          {
            label: '🎨 تصميم محتوى بصري',
            action: 'open_design_studio',
            icon: 'Palette'
          },
          {
            label: 'مولد الأفكار الإبداعية',
            action: 'content_idea_generator',
            icon: 'Lightbulb'
          },
          {
            label: 'قوالب المحتوى الجاهزة',
            action: 'content_templates',
            icon: 'Layout'
          },
          {
            label: 'جدولة المحتوى الذكية',
            action: 'smart_scheduling',
            icon: 'Calendar'
          },
          {
            label: 'تحليل أداء المحتوى',
            action: 'content_performance',
            icon: 'BarChart'
          }
        ],
        suggestions: [
          'أفكار محتوى لهذا الأسبوع',
          'كيف أنشئ محتوى تفاعلي؟',
          'استراتيجيات السرد المؤثر',
          'تحسين المحتوى لمحركات البحث',
          'تصميم منشورات بصرية جذابة'
        ]
      };
    }

    // Pricing and Services Response
    if (lowerMessage.includes('أسعار') || lowerMessage.includes('سعر') || lowerMessage.includes('خدمات')) {
      return {
        message: 'لدينا باقات شاملة ومتنوعة تناسب جميع الاحتياجات مع ضمان النتائج:',
        type: 'action',
        actions: [
          {
            label: 'الباقات والأسعار',
            action: 'view_pricing_plans',
            icon: 'DollarSign'
          },
          {
            label: 'استشارة مجانية',
            action: 'free_consultation',
            icon: 'MessageCircle'
          },
          {
            label: 'خدمات مخصصة',
            action: 'custom_services',
            icon: 'Settings'
          },
          {
            label: 'عروض خاصة',
            action: 'special_offers',
            icon: 'Gift'
          }
        ]
      };
    }

    // Default Enhanced Response with Design Options
    return {
      message: `مرحباً! أنا مساعدك الذكي المتطور في Town Media. أستطيع مساعدتك في تحقيق نجاح استثنائي لحساباتك على مواقع التواصل الاجتماعي من خلال:

• تحليل شامل ومتقدم لحساباتك والمنافسين
• وضع استراتيجيات مخصصة ومبتكرة  
• إنشاء محتوى إبداعي وجذاب
• 🎨 تصميم صور وإعلانات احترافية
• تحسين الأداء وزيادة التفاعل
• إدارة الحملات الإعلانية بذكاء
• تتبع النتائج وتحليل البيانات

كيف يمكنني مساعدتك اليوم؟`,
      type: 'suggestion',
      actions: [
        {
          label: '🎨 استوديو التصميم',
          action: 'open_design_studio',
          icon: 'Palette'
        }
      ],
      suggestions: [
        'حلل حسابي وقيم أدائي',
        'ضع لي استراتيجية نمو شاملة',
        'اقترح أفكار محتوى إبداعية',
        '🎨 صمم لي إعلان احترافي',
        'كيف أزيد متابعيني بجودة عالية؟',
        'ما أفضل خدماتكم لحالتي؟'
      ]
    };
  }

  async analyzeImage(imageUrl: string): Promise<AIAgentResponse> {
    // Mock image analysis
    return {
      message: 'تحليل الصورة المرفوعة:',
      type: 'analysis',
      analysis: {
        score: 85,
        insights: [
          'جودة الصورة عالية ومناسبة للنشر',
          'الألوان متناسقة وجذابة',
          'التكوين البصري ممتاز',
          'مناسبة لجميع منصات التواصل'
        ],
        recommendations: [
          'إضافة نص تحفيزي للصورة',
          'استخدام هاشتاجات مناسبة',
          'النشر في الأوقات الذروة',
          'إنشاء سلسلة من الصور المشابهة'
        ]
      },
      actions: [
        {
          label: '🎨 تحسين التصميم',
          action: 'enhance_image_design',
          icon: 'Edit'
        },
        {
          label: 'إنشاء نسخ متعددة',
          action: 'create_image_variations',
          icon: 'Copy'
        }
      ]
    };
  }
}
