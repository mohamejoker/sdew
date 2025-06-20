
import { AIAgentResponse } from '../types/aiTypes';
import { designService } from '../design/designService';

export class DesignResponseService {
  getDesignSuggestions(message: string): AIAgentResponse | null {
    const lowerMessage = message.toLowerCase();
    
    // تصميم الصور والإعلانات
    if (lowerMessage.includes('تصميم') || lowerMessage.includes('إعلان') || lowerMessage.includes('صور')) {
      return {
        message: `🎨 أهلاً بك في استوديو التصميم الذكي! يمكنني مساعدتك في إنشاء تصاميم احترافية ومذهلة:

✨ **خدمات التصميم المتاحة:**
• تصاميم منشورات إنستقرام وفيسبوك
• إعلانات تجارية جذابة ومؤثرة
• بانرات ويب احترافية
• شعارات وهويات بصرية
• إنفوجرافيك تفاعلي
• تصاميم ستوريز متحركة

🎯 **مميزات متقدمة:**
• قوالب جاهزة قابلة للتخصيص
• ذكاء اصطناعي لاختيار الألوان والخطوط
• تحسين التصاميم لكل منصة
• إنشاء هوية بصرية متكاملة`,
        type: 'action',
        actions: [
          {
            label: '🎨 فتح استوديو التصميم',
            action: 'open_design_studio',
            icon: 'Palette'
          },
          {
            label: '📱 تصميم منشور إنستقرام',
            action: 'create_instagram_post',
            data: { type: 'post', platform: 'instagram' },
            icon: 'Image'
          },
          {
            label: '📢 إنشاء إعلان تجاري',
            action: 'create_ad_design',
            data: { type: 'ad' },
            icon: 'Zap'
          },
          {
            label: '📊 إنشاء إنفوجرافيك',
            action: 'create_infographic',
            data: { type: 'infographic' },
            icon: 'BarChart'
          },
          {
            label: '🏷️ تصميم شعار',
            action: 'create_logo',
            data: { type: 'logo' },
            icon: 'Sparkles'
          },
          {
            label: '🎭 هوية بصرية متكاملة',
            action: 'create_brand_kit',
            icon: 'Palette'
          }
        ],
        suggestions: [
          'أنشئ لي تصميم منشور عن منتجي الجديد',
          'أريد إعلان جذاب لحملتي التسويقية',
          'صمم لي شعار احترافي لشركتي',
          'إنشاء إنفوجرافيك عن خدماتنا',
          'تصميم بانر لموقعي الإلكتروني',
          'هوية بصرية شاملة لعلامتي التجارية'
        ]
      };
    }

    // شعارات ولوجو
    if (lowerMessage.includes('شعار') || lowerMessage.includes('لوجو') || lowerMessage.includes('logo')) {
      return {
        message: `🏷️ مرحباً بك في قسم تصميم الشعارات الاحترافية! 

سأساعدك في إنشاء شعار مميز وفريد لعلامتك التجارية مع:
• تصاميم عصرية ومبتكرة
• ألوان متناسقة مع هويتك
• خطوط احترافية وواضحة
• نسخ بأحجام مختلفة`,
        type: 'action',
        actions: [
          {
            label: 'إنشاء شعار جديد',
            action: 'create_logo_design',
            data: { type: 'logo' },
            icon: 'Sparkles'
          },
          {
            label: 'تطوير شعار موجود',
            action: 'improve_existing_logo',
            icon: 'Edit'
          },
          {
            label: 'حزمة هوية بصرية',
            action: 'brand_identity_package',
            icon: 'Package'
          }
        ]
      };
    }

    // إنفوجرافيك
    if (lowerMessage.includes('إنفوجرافيك') || lowerMessage.includes('infographic') || lowerMessage.includes('بيانات')) {
      return {
        message: `📊 استوديو الإنفوجرافيك التفاعلي!

أقوم بتحويل البيانات والمعلومات إلى تصاميم بصرية جذابة ومفهومة:
• رسوم بيانية متقدمة
• إحصائيات تفاعلية
• مخططات ملونة
• تصاميم معلوماتية شاملة`,
        type: 'action',
        actions: [
          {
            label: 'إنشاء إنفوجرافيك',
            action: 'create_infographic_design',
            icon: 'BarChart'
          },
          {
            label: 'تحويل البيانات لرسوم',
            action: 'data_to_visual',
            icon: 'TrendingUp'
          }
        ]
      };
    }

    return null;
  }

  async handleDesignAction(action: string, data?: any): Promise<AIAgentResponse> {
    switch (action) {
      case 'create_instagram_post':
        return await designService.generateDesign({
          type: 'post',
          platform: 'instagram',
          text: 'منشور إنستقرام احترافي',
          style: 'modern'
        });

      case 'create_ad_design':
        return await designService.generateDesign({
          type: 'ad',
          platform: 'facebook',
          text: 'إعلان تجاري مؤثر',
          style: 'bold'
        });

      case 'create_infographic':
        return await designService.generateInfographic(
          'إحصائيات الأعمال',
          [
            { label: 'نمو المبيعات', value: 85 },
            { label: 'رضا العملاء', value: 92 },
            { label: 'زيادة الأرباح', value: 78 }
          ]
        );

      case 'create_logo':
        return await designService.generateDesign({
          type: 'logo',
          platform: 'instagram',
          text: 'شعار احترافي',
          style: 'minimalist'
        });

      default:
        return {
          message: 'تم تنفيذ الإجراء بنجاح! 🎨',
          type: 'text'
        };
    }
  }
}

export const designResponseService = new DesignResponseService();
