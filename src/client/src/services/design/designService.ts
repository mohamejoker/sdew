
import { ChatMessage, AIAgentResponse } from '../types/aiTypes';

export interface DesignRequest {
  type: 'post' | 'ad' | 'banner' | 'logo' | 'infographic';
  platform: 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'youtube';
  text: string;
  colors?: string[];
  style: 'modern' | 'classic' | 'minimalist' | 'bold' | 'creative';
  brand?: {
    name: string;
    colors: string[];
  };
}

export interface DesignTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  dimensions: {
    width: number;
    height: number;
  };
  preview?: string;
}

interface DesignSuggestion {
  id: string;
  type: 'image' | 'text';
  content: string;
  timestamp: Date;
}

interface DesignService {
  generateDesignResponse: (prompt: string) => ChatMessage;
  generateErrorResponse: (error: string) => ChatMessage;
  generateDesign: (request: DesignRequest) => Promise<AIAgentResponse>;
  generateInfographic: (title: string, data: Array<{label: string, value: number}>) => Promise<AIAgentResponse>;
  createBrandKit: (brandName: string, colors: string[], style: string) => Promise<AIAgentResponse>;
  getTemplates: () => DesignTemplate[];
}

const mockTemplates: DesignTemplate[] = [
  {
    id: '1',
    name: 'منشور إنستقرام عصري',
    description: 'تصميم عصري للمنشورات',
    type: 'post',
    dimensions: { width: 1080, height: 1080 }
  },
  {
    id: '2', 
    name: 'إعلان فيسبوك',
    description: 'إعلان جذاب لفيسبوك',
    type: 'ad',
    dimensions: { width: 1200, height: 628 }
  },
  {
    id: '3',
    name: 'بانر ويب',
    description: 'بانر احترافي للمواقع',
    type: 'banner', 
    dimensions: { width: 1920, height: 600 }
  },
  {
    id: '4',
    name: 'شعار بسيط',
    description: 'تصميم شعار مينيماليست',
    type: 'logo',
    dimensions: { width: 500, height: 500 }
  }
];

const initialDesignSuggestions: DesignSuggestion[] = [
  {
    id: '1',
    type: 'text',
    content: 'اقتراح تصميم أولي',
    timestamp: new Date()
  },
  {
    id: '2',
    type: 'image',
    content: 'رابط لصورة تصميم مقترح',
    timestamp: new Date()
  }
];

export const designService: DesignService = {
  generateDesignResponse: (prompt: string): ChatMessage => {
    const designKeywords = ['تصميم', 'إعلان', 'بوست', 'لوجو', 'بانر', 'صورة'];
    const hasDesignKeyword = designKeywords.some(keyword => prompt.includes(keyword));

    if (hasDesignKeyword) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: `سأساعدك في إنشاء تصميم احترافي! يمكنني:

🎨 **أنواع التصاميم المتاحة:**
- تصاميم إعلانات لوسائل التواصل
- بوستات انستغرام وفيسبوك
- لوجوهات وهويات بصرية
- بانرات ويب
- انفوجرافيك

✨ **ميزات التصميم:**
- قوالب جاهزة للتخصيص
- ألوان وخطوط احترافية
- تصدير بجودة عالية
- تكامل مع خدمات التسويق

هل تريد البدء في تصميم معين؟`,
        type: 'text',
        timestamp: new Date()
      };
    }

    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: 'كيف يمكنني مساعدتك في التصميم اليوم؟',
      type: 'text',
      timestamp: new Date()
    };
  },

  generateErrorResponse: (error: string): ChatMessage => {
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: `عذراً، حدث خطأ: ${error}. يرجى المحاولة مرة أخرى.`,
      type: 'text',
      timestamp: new Date()
    };
  },

  generateDesign: async (request: DesignRequest): Promise<AIAgentResponse> => {
    // محاكاة إنشاء التصميم
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      message: `🎨 تم إنشاء ${request.type === 'post' ? 'منشور' : request.type === 'ad' ? 'إعلان' : request.type === 'logo' ? 'شعار' : 'تصميم'} بنجاح!

📝 **النص:** ${request.text}
🎭 **النمط:** ${request.style}
📱 **المنصة:** ${request.platform}
${request.brand ? `🏷️ **العلامة التجارية:** ${request.brand.name}` : ''}

سيتم حفظ التصميم في مكتبة الوسائط الخاصة بك.`,
      type: 'action',
      actions: [
        {
          label: 'تحميل التصميم',
          action: 'download_design',
          icon: 'Download'
        },
        {
          label: 'تعديل التصميم',
          action: 'edit_design',
          icon: 'Edit'
        },
        {
          label: 'مشاركة التصميم',
          action: 'share_design',
          icon: 'Share'
        }
      ]
    };
  },

  generateInfographic: async (title: string, data: Array<{label: string, value: number}>): Promise<AIAgentResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const dataText = data.map(item => `• ${item.label}: ${item.value}%`).join('\n');
    
    return {
      message: `📊 تم إنشاء الإنفوجرافيك بنجاح!

📋 **العنوان:** ${title}
📈 **البيانات:**
${dataText}

الإنفوجرافيك جاهز للاستخدام والمشاركة.`,
      type: 'action',
      actions: [
        {
          label: 'تحميل الإنفوجرافيك',
          action: 'download_infographic',
          icon: 'Download'
        },
        {
          label: 'تخصيص الألوان',
          action: 'customize_colors',
          icon: 'Palette'
        }
      ]
    };
  },

  createBrandKit: async (brandName: string, colors: string[], style: string): Promise<AIAgentResponse> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      message: `🎨 تم إنشاء الهوية البصرية لـ "${brandName}" بنجاح!

🏷️ **اسم العلامة:** ${brandName}
🎭 **النمط:** ${style}
🎨 **الألوان الأساسية:** ${colors.join(', ')}

تتضمن الهوية البصرية:
• شعار أساسي ومتغيرات
• بطاقات أعمال
• قوالب منشورات اجتماعية
• دليل الهوية البصرية`,
      type: 'action',
      actions: [
        {
          label: 'تحميل حزمة الهوية',
          action: 'download_brand_kit',
          icon: 'Package'
        },
        {
          label: 'معاينة الهوية',
          action: 'preview_brand',
          icon: 'Eye'
        }
      ]
    };
  },

  getTemplates: (): DesignTemplate[] => {
    return mockTemplates;
  }
};
