
/**
 * خدمة تحليل روابط وسائل التواصل الاجتماعي
 */
export class URLParser {
  /**
   * كشف المنصة من الرابط
   */
  detectPlatform(url: string): 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'facebook' | null {
    const normalizedUrl = url.toLowerCase();
    
    if (normalizedUrl.includes('instagram.com')) return 'instagram';
    if (normalizedUrl.includes('tiktok.com')) return 'tiktok';
    if (normalizedUrl.includes('youtube.com') || normalizedUrl.includes('youtu.be')) return 'youtube';
    if (normalizedUrl.includes('twitter.com') || normalizedUrl.includes('x.com')) return 'twitter';
    if (normalizedUrl.includes('facebook.com')) return 'facebook';
    
    return null;
  }

  /**
   * استخراج اسم المستخدم من الرابط
   */
  extractUsername(url: string, platform: string): string {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;

      switch (platform) {
        case 'instagram':
          const instagramMatch = pathname.match(/^\/([^\/]+)\/?$/);
          return instagramMatch ? instagramMatch[1] : '';

        case 'tiktok':
          const tiktokMatch = pathname.match(/^\/@?([^\/]+)\/?$/);
          return tiktokMatch ? tiktokMatch[1] : '';

        case 'youtube':
          const youtubeMatch = pathname.match(/^\/@?([^\/]+)\/?$/) || pathname.match(/^\/c\/([^\/]+)\/?$/);
          return youtubeMatch ? youtubeMatch[1] : '';

        case 'twitter':
          const twitterMatch = pathname.match(/^\/([^\/]+)\/?$/);
          return twitterMatch ? twitterMatch[1] : '';

        case 'facebook':
          const facebookMatch = pathname.match(/^\/([^\/]+)\/?$/);
          return facebookMatch ? facebookMatch[1] : '';

        default:
          return '';
      }
    } catch (error) {
      return '';
    }
  }

  /**
   * بناء رابط الملف الشخصي
   */
  buildProfileUrl(platform: string, username: string): string {
    switch (platform) {
      case 'instagram': return `https://instagram.com/${username}`;
      case 'tiktok': return `https://tiktok.com/@${username}`;
      case 'youtube': return `https://youtube.com/@${username}`;
      case 'twitter': return `https://twitter.com/${username}`;
      case 'facebook': return `https://facebook.com/${username}`;
      default: return '';
    }
  }
}

export const urlParser = new URLParser();
