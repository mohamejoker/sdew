
import { useState, useEffect } from 'react';

interface CountdownTime {
  hours: number;
  minutes: number;
  seconds: number;
}

export const useCountdown = (targetHours: number = 24): CountdownTime => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    hours: targetHours,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset countdown when it reaches zero
          hours = targetHours;
          minutes = 0;
          seconds = 0;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetHours]);

  return timeLeft;
};
