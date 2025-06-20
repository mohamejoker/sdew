
import React from 'react';
import { Users, Eye } from 'lucide-react';
import { useVisibilityCounter } from '@/hooks/useVisibilityCounter';

const VisitorCounter: React.FC = () => {
  const onlineCount = useVisibilityCounter(15, 45);
  const todayCount = useVisibilityCounter(150, 280);

  return (
    <div className="fixed top-4 right-4 z-40 space-y-2">
      <div className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-bold animate-pulse">
        <Users className="h-4 w-4" />
        <span>{onlineCount} شخص متصل الآن</span>
      </div>
      <div className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-bold">
        <Eye className="h-4 w-4" />
        <span>{todayCount} زائر اليوم</span>
      </div>
    </div>
  );
};

export default VisitorCounter;
