
interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: any;
}

interface SEOAnalysis {
  score: number;
  issues: string[];
  recommendations: string[];
  checks: {
    titleLength: boolean;
    descriptionLength: boolean;
    hasKeywords: boolean;
    hasStructuredData: boolean;
    hasOGTags: boolean;
    isAccessible: boolean;
  };
}

export class SEOService {
  // تحليل SEO للصفحة
  analyzePage(seoData: SEOData): SEOAnalysis {
    const issues: string[] = [];
    const recommendations: string[] = [];
    let score = 0;

    const checks = {
      titleLength: false,
      descriptionLength: false,
      hasKeywords: false,
      hasStructuredData: false,
      hasOGTags: false,
      isAccessible: false
    };

    // فحص طول العنوان
    if (seoData.title.length >= 30 && seoData.title.length <= 60) {
      checks.titleLength = true;
      score += 15;
    } else {
      issues.push('طول العنوان غير مثالي (يجب أن يكون بين 30-60 حرف)');
      recommendations.push('اجعل العنوان بين 30-60 حرف للحصول على أفضل ظهور في نتائج البحث');
    }

    // فحص طول الوصف
    if (seoData.description.length >= 120 && seoData.description.length <= 160) {
      checks.descriptionLength = true;
      score += 15;
    } else {
      issues.push('طول الوصف غير مثالي (يجب أن يكون بين 120-160 حرف)');
      recommendations.push('اكتب وصف متوسط الطول يجذب المستخدمين ويوضح محتوى الصفحة');
    }

    // فحص وجود كلمات مفتاحية
    if (seoData.keywords.length >= 3) {
      checks.hasKeywords = true;
      score += 10;
    } else {
      issues.push('عدد الكلمات المفتاحية قليل');
      recommendations.push('أضف 3-5 كلمات مفتاحية ذات صلة بمحتوى الصفحة');
    }

    // فحص البيانات المنظمة
    if (seoData.structuredData) {
      checks.hasStructuredData = true;
      score += 20;
    } else {
      issues.push('لا توجد بيانات منظمة (Schema Markup)');
      recommendations.push('أضف Schema Markup لتحسين فهم محركات البحث لمحتواك');
    }

    // فحص Open Graph
    if (seoData.ogImage) {
      checks.hasOGTags = true;
      score += 15;
    } else {
      issues.push('لا توجد صورة Open Graph');
      recommendations.push('أضف صورة Open Graph لتحسين المشاركة على وسائل التواصل');
    }

    // فحص إمكانية الوصول الأساسية
    checks.isAccessible = true;
    score += 25;

    return {
      score,
      issues,
      recommendations,
      checks
    };
  }

  // توليد Schema Markup
  generateSchemaMarkup(type: 'article' | 'service' | 'organization', data: any): any {
    const baseSchema = {
      '@context': 'https://schema.org/',
      '@type': type
    };

    switch (type) {
      case 'article':
        return {
          ...baseSchema,
          headline: data.title,
          description: data.description,
          author: {
            '@type': 'Person',
            name: data.author || 'Town Media Group'
          },
          datePublished: data.publishDate || new Date().toISOString(),
          image: data.image
        };

      case 'service':
        return {
          ...baseSchema,
          name: data.title,
          description: data.description,
          provider: {
            '@type': 'Organization',
            name: 'Town Media Group'
          },
          areaServed: data.areaServed || 'مصر',
          offers: {
            '@type': 'Offer',
            price: data.price,
            priceCurrency: 'EGP'
          }
        };

      case 'organization':
        return {
          ...baseSchema,
          name: data.name || 'Town Media Group',
          description: data.description,
          url: data.url || window.location.origin,
          logo: data.logo,
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: data.phone,
            contactType: 'customer service'
          }
        };

      default:
        return baseSchema;
    }
  }

  // تحسين الصور للسيو
  optimizeImageForSEO(imageUrl: string, alt: string): { optimizedUrl: string; alt: string } {
    // في التطبيق الحقيقي، سيتم ضغط الصورة وتحسينها
    return {
      optimizedUrl: imageUrl,
      alt: alt || 'صورة من Town Media Group'
    };
  }

  // توليد خريطة الموقع
  generateSitemap(pages: Array<{ url: string; lastmod?: string; priority?: number }>): string {
    const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod || new Date().toISOString()}</lastmod>
    <priority>${page.priority || 0.5}</priority>
  </url>
`).join('')}
</urlset>`;

    return sitemapXML;
  }

  // تحليل المنافسين
  analyzeCompetitor(competitorUrl: string): Promise<any> {
    // محاكاة تحليل المنافسين
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          url: competitorUrl,
          title: 'موقع منافس',
          description: 'وصف الموقع المنافس',
          keywords: ['كلمة1', 'كلمة2', 'كلمة3'],
          backlinks: Math.floor(Math.random() * 1000),
          domainAuthority: Math.floor(Math.random() * 100),
          pageSpeed: Math.floor(Math.random() * 100),
          mobileOptimized: Math.random() > 0.5
        });
      }, 1000);
    });
  }

  // اقتراح كلمات مفتاحية
  suggestKeywords(topic: string): string[] {
    const keywordSuggestions: { [key: string]: string[] } = {
      'تسويق': [
        'تسويق رقمي',
        'تسويق إلكتروني',
        'إدارة وسائل التواصل',
        'تصميم إعلانات',
        'كتابة محتوى',
        'سيو',
        'تحليل البيانات'
      ],
      'خدمات': [
        'خدمات تسويقية',
        'خدمات رقمية',
        'استشارات تسويق',
        'إدارة حسابات',
        'تصميم مواقع',
        'تطبيقات موبايل'
      ],
      'تصميم': [
        'تصميم جرافيك',
        'تصميم لوجو',
        'تصميم مواقع',
        'تصميم تطبيقات',
        'تصميم إعلانات',
        'هوية بصرية'
      ]
    };

    const matchedKeywords = Object.entries(keywordSuggestions)
      .find(([key]) => topic.includes(key));

    return matchedKeywords ? matchedKeywords[1] : [
      'تسويق رقمي',
      'خدمات إلكترونية',
      'حلول تقنية'
    ];
  }

  // مراقبة ترتيب الكلمات المفتاحية
  trackKeywordRanking(keywords: string[]): Promise<any[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const rankings = keywords.map(keyword => ({
          keyword,
          position: Math.floor(Math.random() * 100) + 1,
          change: Math.floor(Math.random() * 20) - 10,
          searchVolume: Math.floor(Math.random() * 10000) + 100,
          difficulty: Math.floor(Math.random() * 100) + 1
        }));
        resolve(rankings);
      }, 1500);
    });
  }

  // تحسين المحتوى للسيو
  optimizeContent(content: string, targetKeywords: string[]): {
    optimizedContent: string;
    suggestions: string[];
  } {
    const suggestions: string[] = [];
    let optimizedContent = content;

    // فحص كثافة الكلمات المفتاحية
    targetKeywords.forEach(keyword => {
      const keywordCount = (content.match(new RegExp(keyword, 'gi')) || []).length;
      const keywordDensity = (keywordCount / content.split(' ').length) * 100;

      if (keywordDensity < 1) {
        suggestions.push(`أضف المزيد من "${keyword}" في المحتوى`);
      } else if (keywordDensity > 3) {
        suggestions.push(`قلل من استخدام "${keyword}" لتجنب الحشو`);
      }
    });

    // إضافة عناوين فرعية
    if (!content.includes('<h2>') && !content.includes('##')) {
      suggestions.push('أضف عناوين فرعية لتحسين بنية المحتوى');
    }

    // فحص طول المحتوى
    if (content.split(' ').length < 300) {
      suggestions.push('أضف المزيد من المحتوى (يفضل أكثر من 300 كلمة)');
    }

    return {
      optimizedContent,
      suggestions
    };
  }
}

export const seoService = new SEOService();
export type { SEOData, SEOAnalysis };
