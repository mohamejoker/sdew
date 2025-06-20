
import { useState, useEffect } from 'react';

export const useVisibilityCounter = (min: number = 15, max: number = 50) => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    // Set initial random count
    setVisitorCount(Math.floor(Math.random() * (max - min + 1)) + min);

    // Update count every 5-15 seconds
    const interval = setInterval(() => {
      setVisitorCount(prev => {
        const change = Math.floor(Math.random() * 7) - 3; // -3 to +3
        const newCount = prev + change;
        return Math.max(min, Math.min(max, newCount));
      });
    }, Math.random() * 10000 + 5000); // 5-15 seconds

    return () => clearInterval(interval);
  }, [min, max]);

  return visitorCount;
};
