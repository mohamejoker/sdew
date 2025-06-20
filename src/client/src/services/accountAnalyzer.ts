
import { urlParser } from './social/parsers/urlParser';
import { dataFetcher } from './social/fetchers/dataFetcher';
import { socialAnalyzer } from './social/analyzers/socialAnalyzer';
import { accountStorage } from './social/storage/accountStorage';
import type { SocialAccount, AnalysisResult, AnalysisFilters } from './social/types/socialTypes';

/**
 * محلل الحسابات الاجتماعية الرئيسي
 */
class AccountAnalyzer {
  /**
   * تحليل الرابط واستخراج معلومات الحساب
   */
  async analyzeAccount(url: string, filters: AnalysisFilters = {}): Promise<AnalysisResult> {
    try {
      const platform = urlParser.detectPlatform(url);
      const username = urlParser.extractUsername(url, platform || '');

      if (!platform || !username) {
        throw new Error('رابط غير صالح أو منصة غير مدعومة');
      }

      const account = await dataFetcher.fetchAccountData(platform, username);
      const recommendations = socialAnalyzer.generateRecommendations(account);
      const suggestedServices = socialAnalyzer.generateServiceSuggestions(account);
      
      let competitorAnalysis;
      if (filters.includeCompetitorAnalysis) {
        competitorAnalysis = await socialAnalyzer.analyzeCompetitors(account);
      }

      // حفظ الحساب
      accountStorage.saveAccount(account);

      return {
        account,
        recommendations,
        suggestedServices,
        competitorAnalysis
      };
    } catch (error) {
      console.error('خطأ في تحليل الحساب:', error);
      throw error;
    }
  }

  /**
   * تحديث بيانات الحساب
   */
  async updateAccountData(username: string, platform: string): Promise<SocialAccount> {
    const account = await dataFetcher.fetchAccountData(platform, username);
    accountStorage.saveAccount(account);
    return account;
  }

  /**
   * جلب البيانات المحفوظة
   */
  getSavedAccounts(): SocialAccount[] {
    return accountStorage.getSavedAccounts();
  }

  /**
   * التحقق من توفر مفاتيح API
   */
  checkApiKeysAvailability(): { [key: string]: boolean } {
    return dataFetcher.checkApiKeysAvailability();
  }

  /**
   * حذف حساب محفوظ
   */
  deleteAccount(username: string, platform: string): boolean {
    return accountStorage.deleteAccount(username, platform);
  }

  /**
   * مسح جميع الحسابات
   */
  clearAllAccounts(): void {
    accountStorage.clearAllAccounts();
  }
}

export const accountAnalyzer = new AccountAnalyzer();
export type { SocialAccount, AnalysisResult, AnalysisFilters };
