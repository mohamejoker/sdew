
interface SecurityAlert {
  id: string;
  type: 'login_attempt' | 'data_breach' | 'suspicious_activity' | 'system_error';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: Date;
  resolved: boolean;
  details?: any;
}

interface SecurityAudit {
  id: string;
  action: string;
  userId?: string;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  result: 'success' | 'failure';
  details?: any;
}

export class SecurityService {
  private alerts: SecurityAlert[] = [];
  private auditLog: SecurityAudit[] = [];
  private blockedIPs: Set<string> = new Set();
  private loginAttempts: Map<string, number> = new Map();

  // مراقبة محاولات الدخول
  trackLoginAttempt(email: string, ipAddress: string, success: boolean): void {
    const auditEntry: SecurityAudit = {
      id: this.generateId(),
      action: 'login_attempt',
      userId: success ? email : undefined,
      ipAddress,
      userAgent: navigator.userAgent,
      timestamp: new Date(),
      result: success ? 'success' : 'failure',
      details: { email, success }
    };

    this.auditLog.push(auditEntry);

    if (!success) {
      const attempts = this.loginAttempts.get(ipAddress) || 0;
      this.loginAttempts.set(ipAddress, attempts + 1);

      if (attempts >= 5) {
        this.createAlert({
          type: 'login_attempt',
          severity: 'high',
          message: `محاولات دخول متكررة مشبوهة من IP: ${ipAddress}`,
          details: { ipAddress, attempts: attempts + 1 }
        });

        this.blockIP(ipAddress);
      }
    } else {
      // إعادة تعيين العداد عند النجاح
      this.loginAttempts.delete(ipAddress);
    }
  }

  // حظر IP
  blockIP(ipAddress: string): void {
    this.blockedIPs.add(ipAddress);
    this.createAlert({
      type: 'suspicious_activity',
      severity: 'critical',
      message: `تم حظر IP مشبوه: ${ipAddress}`,
      details: { ipAddress, action: 'blocked' }
    });
  }

  // فحص IP محظور
  isIPBlocked(ipAddress: string): boolean {
    return this.blockedIPs.has(ipAddress);
  }

  // مراقبة الأنشطة المشبوهة
  detectSuspiciousActivity(userId: string, activity: any): void {
    // فحص الأنشطة غير العادية
    const recentActivities = this.auditLog
      .filter(log => log.userId === userId)
      .filter(log => Date.now() - log.timestamp.getTime() < 3600000); // آخر ساعة

    if (recentActivities.length > 50) { // أكثر من 50 نشاط في الساعة
      this.createAlert({
        type: 'suspicious_activity',
        severity: 'medium',
        message: `نشاط مشبوه للمستخدم ${userId} - أنشطة مفرطة`,
        details: { userId, activityCount: recentActivities.length }
      });
    }

    // فحص محاولات الوصول لصفحات محظورة
    if (activity.path && activity.path.includes('/admin') && !this.isAdmin(userId)) {
      this.createAlert({
        type: 'suspicious_activity',
        severity: 'high',
        message: `محاولة وصول غير مصرح بها للوحة الإدارة من ${userId}`,
        details: { userId, path: activity.path }
      });
    }
  }

  // تشفير البيانات الحساسة
  encryptSensitiveData(data: string): string {
    // تشفير بسيط (في الواقع يجب استخدام مكتبات تشفير قوية)
    return btoa(data);
  }

  decryptSensitiveData(encryptedData: string): string {
    try {
      return atob(encryptedData);
    } catch {
      throw new Error('فشل في فك التشفير');
    }
  }

  // فحص أمان كلمات المرور
  validatePasswordStrength(password: string): {
    isValid: boolean;
    score: number;
    issues: string[];
  } {
    const issues: string[] = [];
    let score = 0;

    if (password.length < 8) {
      issues.push('كلمة المرور قصيرة جداً (أقل من 8 أحرف)');
    } else {
      score += 1;
    }

    if (!/[a-z]/.test(password)) {
      issues.push('يجب أن تحتوي على أحرف صغيرة');
    } else {
      score += 1;
    }

    if (!/[A-Z]/.test(password)) {
      issues.push('يجب أن تحتوي على أحرف كبيرة');
    } else {
      score += 1;
    }

    if (!/[0-9]/.test(password)) {
      issues.push('يجب أن تحتوي على أرقام');
    } else {
      score += 1;
    }

    if (!/[!@#$%^&*]/.test(password)) {
      issues.push('يجب أن تحتوي على رموز خاصة');
    } else {
      score += 1;
    }

    return {
      isValid: issues.length === 0,
      score,
      issues
    };
  }

  // إنشاء تنبيه أمني
  private createAlert(alertData: Omit<SecurityAlert, 'id' | 'timestamp' | 'resolved'>): void {
    const alert: SecurityAlert = {
      ...alertData,
      id: this.generateId(),
      timestamp: new Date(),
      resolved: false
    };

    this.alerts.push(alert);

    // إرسال إشعار فوري للتنبيهات الحرجة
    if (alert.severity === 'critical') {
      this.sendCriticalAlert(alert);
    }
  }

  // إرسال تنبيه حرج
  private sendCriticalAlert(alert: SecurityAlert): void {
    console.warn('تنبيه أمني حرج:', alert);
    // في التطبيق الحقيقي، سيتم إرسال إشعارات عبر البريد الإلكتروني أو SMS
  }

  // فحص صلاحيات المشرف
  private isAdmin(userId: string): boolean {
    // فحص بسيط - في التطبيق الحقيقي سيتم الفحص من قاعدة البيانات
    return userId.includes('admin');
  }

  // سجل المراجعة الأمنية
  getSecurityAuditLog(limit: number = 100): SecurityAudit[] {
    return this.auditLog
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  // الحصول على التنبيهات الأمنية
  getSecurityAlerts(resolved?: boolean): SecurityAlert[] {
    return this.alerts
      .filter(alert => resolved === undefined || alert.resolved === resolved)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  // حل تنبيه أمني
  resolveAlert(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.resolved = true;
    }
  }

  // إحصائيات الأمان
  getSecurityStats() {
    const last24Hours = Date.now() - (24 * 60 * 60 * 1000);
    const recentAudits = this.auditLog.filter(log => log.timestamp.getTime() > last24Hours);
    const recentAlerts = this.alerts.filter(alert => alert.timestamp.getTime() > last24Hours);

    return {
      totalAuditEntries: this.auditLog.length,
      recentAuditEntries: recentAudits.length,
      totalAlerts: this.alerts.length,
      unresolvedAlerts: this.alerts.filter(a => !a.resolved).length,
      recentAlerts: recentAlerts.length,
      blockedIPs: this.blockedIPs.size,
      failedLogins: recentAudits.filter(a => a.action === 'login_attempt' && a.result === 'failure').length,
      successfulLogins: recentAudits.filter(a => a.action === 'login_attempt' && a.result === 'success').length
    };
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}

export const securityService = new SecurityService();
export type { SecurityAlert, SecurityAudit };
