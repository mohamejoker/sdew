// إعدادات المشروع العامة
export const config = {
  apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
  jwtSecret: process.env.JWT_SECRET || 'your-very-secret-key',
};
