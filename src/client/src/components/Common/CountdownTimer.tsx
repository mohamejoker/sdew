
import React from 'react';
import { useCountdown } from '@/hooks/useCountdown';

interface CountdownTimerProps {
  targetHours?: number;
  variant?: 'large' | 'small';
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  targetHours = 24, 
  variant = 'large',
  className = ''
}) => {
  const { hours, minutes, seconds } = useCountdown(targetHours);

  const boxClass = variant === 'large' 
    ? "bg-red-500 text-white px-6 py-4 rounded-xl font-black text-2xl shadow-lg"
    : "bg-red-500 text-white px-3 py-2 rounded-lg font-bold text-lg";

  const labelClass = variant === 'large' 
    ? "text-sm mt-1"
    : "text-xs mt-1";

  return (
    <div className={`flex justify-center gap-3 ${className}`}>
      <div className={boxClass}>
        {hours.toString().padStart(2, '0')}
        <div className={labelClass}>ساعة</div>
      </div>
      <div className="text-3xl font-bold text-yellow-300 self-center">:</div>
      <div className={boxClass}>
        {minutes.toString().padStart(2, '0')}
        <div className={labelClass}>دقيقة</div>
      </div>
      <div className="text-3xl font-bold text-yellow-300 self-center">:</div>
      <div className={boxClass}>
        {seconds.toString().padStart(2, '0')}
        <div className={labelClass}>ثانية</div>
      </div>
    </div>
  );
};

export default CountdownTimer;
