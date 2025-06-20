
import React from 'react';
import { Shield, Star, CheckCircle, Award, Clock, Users } from 'lucide-react';

interface TrustBadgesProps {
  variant?: 'horizontal' | 'grid';
  showAll?: boolean;
}

const TrustBadges: React.FC<TrustBadgesProps> = ({ 
  variant = 'horizontal', 
  showAll = false 
}) => {
  const badges = [
    {
      icon: Shield,
      title: "آمن 100%",
      description: "حماية كاملة لحسابك",
      color: "text-green-500"
    },
    {
      icon: Star,
      title: "تقييم 4.9/5",
      description: "من أكثر من 5000 عميل",
      color: "text-yellow-500"
    },
    {
      icon: CheckCircle,
      title: "ضمان النتائج",
      description: "أو استرداد المال",
      color: "text-blue-500"
    },
    {
      icon: Award,
      title: "الأفضل في المنطقة",
      description: "جائزة أفضل خدمة 2024",
      color: "text-purple-500"
    },
    {
      icon: Clock,
      title: "دعم 24/7",
      description: "فريق متاح دائماً",
      color: "text-orange-500"
    },
    {
      icon: Users,
      title: "+150,000 عميل",
      description: "ثقة آلاف العملاء",
      color: "text-indigo-500"
    }
  ];

  const displayBadges = showAll ? badges : badges.slice(0, 4);

  if (variant === 'grid') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {displayBadges.map((badge, index) => {
          const IconComponent = badge.icon;
          return (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20"
            >
              <IconComponent className={`h-8 w-8 mx-auto mb-2 ${badge.color}`} />
              <div className="text-white font-bold text-sm">{badge.title}</div>
              <div className="text-white/70 text-xs">{badge.description}</div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      {displayBadges.map((badge, index) => {
        const IconComponent = badge.icon;
        return (
          <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <IconComponent className={`h-5 w-5 ${badge.color}`} />
            <div>
              <div className="text-white font-semibold text-sm">{badge.title}</div>
              <div className="text-white/70 text-xs">{badge.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrustBadges;
