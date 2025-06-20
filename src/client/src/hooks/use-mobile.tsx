
import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // فحص أولي
    checkMobile();

    // إضافة مستمع للتغيير
    window.addEventListener('resize', checkMobile);

    // تنظيف المستمع
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}
