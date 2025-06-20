# TownAI

## فكرة المشروع
نظام متكامل لإدارة الخدمات والطلبات والمستخدمين مع لوحة تحكم وواجهة أمامية حديثة مبنية بـ React وواجهة خلفية بـ Node.js/Express وTypeScript.

## المتطلبات
- Node.js >= 18
- PostgreSQL

## خطوات التشغيل
1. انسخ ملف .env.example إلى .env وعدل بيانات الاتصال بقاعدة البيانات.
2. ثبّت الحزم:
   ```bash
   npm install
   ```
3. شغّل قاعدة البيانات (PostgreSQL) ثم نفذ:
   ```bash
   npm run db:push
   ```
4. لتشغيل السيرفر:
   ```bash
   npm run dev
   ```
5. لتشغيل الواجهة الأمامية:
   ```bash
   cd client && npm install && npm run dev
   ```

## أوامر مهمة
- `npm run dev` لتشغيل الباك اند
- `npm run build` للبناء
- `npm run lint` لفحص الكود
- `npm run test` لتشغيل الاختبارات

## تعليمات أخرى
- جميع الأسرار في ملف .env
- لا ترفع ملف .env إلى git
- راجع CHANGELOG.md لأي تحديثات
