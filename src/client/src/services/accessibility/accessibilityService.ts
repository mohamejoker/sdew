
interface AccessibilityCheck {
  id: string;
  name: string;
  description: string;
  severity: 'error' | 'warning' | 'notice';
  passed: boolean;
  details?: string;
}

interface AccessibilityReport {
  score: number;
  totalChecks: number;
  passedChecks: number;
  errors: AccessibilityCheck[];
  warnings: AccessibilityCheck[];
  notices: AccessibilityCheck[];
  suggestions: string[];
}

export class AccessibilityService {
  // فحص إمكانية الوصول للصفحة
  async checkPageAccessibility(): Promise<AccessibilityReport> {
    const checks: AccessibilityCheck[] = [];

    // فحص النصوص البديلة للصور
    checks.push(this.checkImageAltTexts());
    
    // فحص التباين اللوني
    checks.push(this.checkColorContrast());
    
    // فحص العناوين
    checks.push(this.checkHeadingStructure());
    
    // فحص التنقل بلوحة المفاتيح
    checks.push(this.checkKeyboardNavigation());
    
    // فحص التركيز المرئي
    checks.push(this.checkFocusIndicators());
    
    // فحص النماذج
    checks.push(this.checkFormLabels());
    
    // فحص ARIA
    checks.push(this.checkAriaLabels());
    
    // فحص الروابط
    checks.push(this.checkLinkTexts());

    const errors = checks.filter(c => c.severity === 'error' && !c.passed);
    const warnings = checks.filter(c => c.severity === 'warning' && !c.passed);
    const notices = checks.filter(c => c.severity === 'notice' && !c.passed);
    const passedChecks = checks.filter(c => c.passed).length;

    const score = Math.round((passedChecks / checks.length) * 100);

    return {
      score,
      totalChecks: checks.length,
      passedChecks,
      errors,
      warnings,
      notices,
      suggestions: this.generateSuggestions(errors, warnings)
    };
  }

  // فحص النصوص البديلة للصور
  private checkImageAltTexts(): AccessibilityCheck {
    const images = document.querySelectorAll('img');
    const imagesWithoutAlt = Array.from(images).filter(img => !img.getAttribute('alt'));
    
    return {
      id: 'img-alt',
      name: 'نصوص بديلة للصور',
      description: 'جميع الصور يجب أن تحتوي على نص بديل',
      severity: 'error',
      passed: imagesWithoutAlt.length === 0,
      details: imagesWithoutAlt.length > 0 ? `${imagesWithoutAlt.length} صورة بدون نص بديل` : undefined
    };
  }

  // فحص التباين اللوني
  private checkColorContrast(): AccessibilityCheck {
    // فحص أساسي للتباين - في التطبيق الحقيقي سيتم استخدام مكتبات متخصصة
    const contrastIssues = this.findContrastIssues();
    
    return {
      id: 'color-contrast',
      name: 'التباين اللوني',
      description: 'التباين بين النص والخلفية يجب أن يكون كافياً',
      severity: 'error',
      passed: contrastIssues.length === 0,
      details: contrastIssues.length > 0 ? `${contrastIssues.length} عنصر بتباين ضعيف` : undefined
    };
  }

  // فحص بنية العناوين
  private checkHeadingStructure(): AccessibilityCheck {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headingLevels = Array.from(headings).map(h => parseInt(h.tagName.charAt(1)));
    
    let isStructureValid = true;
    let issues = [];

    // فحص وجود H1
    if (!document.querySelector('h1')) {
      isStructureValid = false;
      issues.push('لا يوجد عنوان H1');
    }

    // فحص التسلسل المنطقي
    for (let i = 1; i < headingLevels.length; i++) {
      if (headingLevels[i] > headingLevels[i-1] + 1) {
        isStructureValid = false;
        issues.push('تسلسل العناوين غير منطقي');
        break;
      }
    }

    return {
      id: 'heading-structure',
      name: 'بنية العناوين',
      description: 'العناوين يجب أن تكون مرتبة منطقياً',
      severity: 'warning',
      passed: isStructureValid,
      details: issues.length > 0 ? issues.join(', ') : undefined
    };
  }

  // فحص التنقل بلوحة المفاتيح
  private checkKeyboardNavigation(): AccessibilityCheck {
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
    const elementsWithoutTabindex = Array.from(interactiveElements).filter(el => {
      const tabindex = el.getAttribute('tabindex');
      return tabindex === '-1';
    });

    return {
      id: 'keyboard-nav',
      name: 'التنقل بلوحة المفاتيح',
      description: 'جميع العناصر التفاعلية يجب أن تكون قابلة للوصول بلوحة المفاتيح',
      severity: 'error',
      passed: elementsWithoutTabindex.length === 0,
      details: elementsWithoutTabindex.length > 0 ? `${elementsWithoutTabindex.length} عنصر غير قابل للوصول` : undefined
    };
  }

  // فحص مؤشرات التركيز
  private checkFocusIndicators(): AccessibilityCheck {
    // فحص أساسي - في التطبيق الحقيقي سيتم فحص CSS للتأكد من وجود focus styles
    const hasCustomFocusStyles = this.checkForFocusStyles();
    
    return {
      id: 'focus-indicators',
      name: 'مؤشرات التركيز',
      description: 'العناصر المركز عليها يجب أن تظهر مؤشر واضح',
      severity: 'warning',
      passed: hasCustomFocusStyles,
      details: !hasCustomFocusStyles ? 'لم يتم العثور على تنسيقات focus مخصصة' : undefined
    };
  }

  // فحص تسميات النماذج
  private checkFormLabels(): AccessibilityCheck {
    const inputs = document.querySelectorAll('input, select, textarea');
    const inputsWithoutLabels = Array.from(inputs).filter(input => {
      const id = input.getAttribute('id');
      const hasLabel = id && document.querySelector(`label[for="${id}"]`);
      const hasAriaLabel = input.getAttribute('aria-label');
      const hasAriaLabelledby = input.getAttribute('aria-labelledby');
      
      return !hasLabel && !hasAriaLabel && !hasAriaLabelledby;
    });

    return {
      id: 'form-labels',
      name: 'تسميات النماذج',
      description: 'جميع حقول النماذج يجب أن تحتوي على تسميات واضحة',
      severity: 'error',
      passed: inputsWithoutLabels.length === 0,
      details: inputsWithoutLabels.length > 0 ? `${inputsWithoutLabels.length} حقل بدون تسمية` : undefined
    };
  }

  // فحص ARIA labels
  private checkAriaLabels(): AccessibilityCheck {
    const elementsNeedingAria = document.querySelectorAll('[role="button"], [role="link"], [role="tab"]');
    const elementsWithoutAria = Array.from(elementsNeedingAria).filter(el => {
      return !el.getAttribute('aria-label') && !el.getAttribute('aria-labelledby');
    });

    return {
      id: 'aria-labels',
      name: 'تسميات ARIA',
      description: 'العناصر المخصصة يجب أن تحتوي على تسميات ARIA',
      severity: 'warning',
      passed: elementsWithoutAria.length === 0,
      details: elementsWithoutAria.length > 0 ? `${elementsWithoutAria.length} عنصر بدون ARIA label` : undefined
    };
  }

  // فحص نصوص الروابط
  private checkLinkTexts(): AccessibilityCheck {
    const links = document.querySelectorAll('a');
    const linksWithPoorText = Array.from(links).filter(link => {
      const text = link.textContent?.trim().toLowerCase();
      const poorTexts = ['هنا', 'اضغط هنا', 'المزيد', 'اقرأ المزيد', 'رابط'];
      return poorTexts.includes(text || '');
    });

    return {
      id: 'link-texts',
      name: 'نصوص الروابط',
      description: 'الروابط يجب أن تحتوي على نصوص وصفية واضحة',
      severity: 'notice',
      passed: linksWithPoorText.length === 0,
      details: linksWithPoorText.length > 0 ? `${linksWithPoorText.length} رابط بنص غير وصفي` : undefined
    };
  }

  // فحص مشاكل التباين (محاكاة)
  private findContrastIssues(): any[] {
    // في التطبيق الحقيقي، سيتم حساب التباين الفعلي
    return [];
  }

  // فحص تنسيقات التركيز
  private checkForFocusStyles(): boolean {
    // في التطبيق الحقيقي، سيتم فحص CSS المحمل
    return true;
  }

  // توليد اقتراحات التحسين
  private generateSuggestions(errors: AccessibilityCheck[], warnings: AccessibilityCheck[]): string[] {
    const suggestions: string[] = [];

    if (errors.find(e => e.id === 'img-alt')) {
      suggestions.push('أضف نصوص بديلة وصفية لجميع الصور');
    }

    if (errors.find(e => e.id === 'form-labels')) {
      suggestions.push('ربط جميع حقول النماذج بتسميات واضحة');
    }

    if (warnings.find(w => w.id === 'heading-structure')) {
      suggestions.push('رتب العناوين بشكل منطقي (H1, H2, H3...)');
    }

    if (warnings.find(w => w.id === 'focus-indicators')) {
      suggestions.push('أضف تنسيقات واضحة للعناصر المركز عليها');
    }

    suggestions.push('استخدم أدوات قارئ الشاشة لاختبار إمكانية الوصول');
    suggestions.push('تأكد من إمكانية التنقل بلوحة المفاتيح فقط');

    return suggestions;
  }

  // إضافة تحسينات إمكانية الوصول تلقائياً
  applyAccessibilityFixes(): void {
    // إضافة skip link
    this.addSkipLink();
    
    // تحسين التركيز
    this.improveFocusManagement();
    
    // إضافة ARIA landmarks
    this.addAriaLandmarks();
  }

  private addSkipLink(): void {
    if (!document.querySelector('.skip-link')) {
      const skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.textContent = 'تخطي إلى المحتوى الرئيسي';
      skipLink.className = 'skip-link';
      skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        transition: top 0.3s;
      `;
      
      skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
      });
      
      skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
      });
      
      document.body.insertBefore(skipLink, document.body.firstChild);
    }
  }

  private improveFocusManagement(): void {
    const style = document.createElement('style');
    style.textContent = `
      *:focus {
        outline: 2px solid #0066cc;
        outline-offset: 2px;
      }
      
      .focus-visible {
        outline: 2px solid #0066cc;
        outline-offset: 2px;
      }
    `;
    document.head.appendChild(style);
  }

  private addAriaLandmarks(): void {
    // إضافة role="main" للمحتوى الرئيسي
    const main = document.querySelector('main');
    if (main && !main.getAttribute('role')) {
      main.setAttribute('role', 'main');
      main.setAttribute('id', 'main-content');
    }

    // إضافة role="navigation" للقوائم
    const navs = document.querySelectorAll('nav');
    navs.forEach(nav => {
      if (!nav.getAttribute('role')) {
        nav.setAttribute('role', 'navigation');
      }
    });
  }
}

export const accessibilityService = new AccessibilityService();
export type { AccessibilityCheck, AccessibilityReport };
