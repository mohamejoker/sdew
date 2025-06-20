
import type { SocialAccount } from '../types/socialTypes';

/**
 * خدمة تخزين الحسابات
 */
export class AccountStorage {
  /**
   * جلب البيانات المحفوظة
   */
  getSavedAccounts(): SocialAccount[] {
    try {
      const stored = localStorage.getItem('analyzed_accounts');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('خطأ في جلب الحسابات المحفوظة:', error);
      return [];
    }
  }

  /**
   * حفظ الحساب في التخزين المحلي
   */
  saveAccount(account: SocialAccount): void {
    try {
      const accounts = this.getSavedAccounts();
      const existingIndex = accounts.findIndex(
        a => a.username === account.username && a.platform === account.platform
      );

      if (existingIndex >= 0) {
        accounts[existingIndex] = account;
      } else {
        accounts.push(account);
      }

      // الاحتفاظ بآخر 50 حساب فقط
      if (accounts.length > 50) {
        accounts.splice(0, accounts.length - 50);
      }

      localStorage.setItem('analyzed_accounts', JSON.stringify(accounts));
    } catch (error) {
      console.error('خطأ في حفظ الحساب:', error);
    }
  }

  /**
   * حذف حساب محفوظ
   */
  deleteAccount(username: string, platform: string): boolean {
    try {
      const accounts = this.getSavedAccounts();
      const filteredAccounts = accounts.filter(
        a => !(a.username === username && a.platform === platform)
      );
      
      localStorage.setItem('analyzed_accounts', JSON.stringify(filteredAccounts));
      return filteredAccounts.length < accounts.length;
    } catch (error) {
      console.error('خطأ في حذف الحساب:', error);
      return false;
    }
  }

  /**
   * مسح جميع الحسابات المحفوظة
   */
  clearAllAccounts(): void {
    try {
      localStorage.removeItem('analyzed_accounts');
    } catch (error) {
      console.error('خطأ في مسح الحسابات:', error);
    }
  }
}

export const accountStorage = new AccountStorage();
