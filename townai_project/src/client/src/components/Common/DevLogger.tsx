
import React, { useEffect } from 'react';

const DevLogger = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // تسجيل رسائل التطوير فقط في بيئة التطوير
      const originalLog = console.log;
      const originalError = console.error;
      const originalWarn = console.warn;

      console.log = (...args) => {
        if (args.some(arg => typeof arg === 'string' && arg.includes('[DEV]'))) {
          originalLog('[🔧 DEV]', ...args);
        } else {
          originalLog(...args);
        }
      };

      console.error = (...args) => {
        originalError('[❌ ERROR]', ...args);
      };

      console.warn = (...args) => {
        originalWarn('[⚠️ WARN]', ...args);
      };

      console.log('[DEV] تم تفعيل نظام تسجيل التطوير');
    }
  }, []);

  // في بيئة الإنتاج، لا يرجع أي محتوى
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs p-2 rounded z-50">
      وضع التطوير مفعل
    </div>
  );
};

export default DevLogger;
