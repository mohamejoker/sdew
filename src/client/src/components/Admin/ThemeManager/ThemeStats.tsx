
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, 
  Download, 
  Star, 
  Activity,
  TrendingUp,
  Users
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Theme {
  id: string;
  name: string;
  description: string;
  preview: string;
  isActive: boolean;
  isDefault: boolean;
  createdAt: string;
  author: string;
  downloads: number;
  rating: number;
}

interface ThemeStatsProps {
  themes: Theme[];
}

const ThemeStats: React.FC<ThemeStatsProps> = ({ themes }) => {
  const isMobile = useIsMobile();
  
  const totalThemes = themes.length;
  const activeTheme = themes.find(t => t.isActive);
  const totalDownloads = themes.reduce((sum, theme) => sum + theme.downloads, 0);
  const averageRating = themes.reduce((sum, theme) => sum + theme.rating, 0) / themes.length;

  const stats = [
    {
      icon: Palette,
      label: 'إجمالي الثيمات',
      value: totalThemes.toString(),
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Activity,
      label: 'الثيم النشط',
      value: activeTheme?.name || 'غير محدد',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Download,
      label: 'إجمالي التحميلات',
      value: totalDownloads.toLocaleString(),
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Star,
      label: 'متوسط التقييم',
      value: averageRating.toFixed(1),
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ];

  return (
    <div className={`
      ${isMobile 
        ? 'grid grid-cols-1 gap-3' 
        : 'grid grid-cols-2 md:grid-cols-4 gap-4'
      }
    `}>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="overflow-hidden">
            <CardContent className={`
              ${isMobile ? 'p-4' : 'p-6'}
            `}>
              <div className={`
                ${isMobile 
                  ? 'flex items-center space-x-3 rtl:space-x-reverse' 
                  : 'flex flex-col items-center text-center space-y-2'
                }
              `}>
                <div className={`
                  ${stat.bgColor} ${stat.color} 
                  ${isMobile ? 'p-2' : 'p-3'}
                  rounded-full
                `}>
                  <Icon className={`
                    ${isMobile ? 'h-5 w-5' : 'h-6 w-6'}
                  `} />
                </div>
                
                <div className={isMobile ? 'flex-1' : ''}>
                  <p className={`
                    ${isMobile ? 'text-sm' : 'text-xs'}
                    text-gray-600 font-medium
                  `}>
                    {stat.label}
                  </p>
                  <p className={`
                    ${isMobile ? 'text-lg' : 'text-2xl'}
                    font-bold text-gray-900 
                    ${isMobile && stat.value.length > 15 ? 'truncate' : ''}
                  `}>
                    {stat.value}
                  </p>
                </div>

                {/* مؤشر النشاط للثيم النشط */}
                {stat.label === 'الثيم النشط' && activeTheme && (
                  <div className={isMobile ? '' : 'mt-2'}>
                    <Badge className="bg-green-500 text-white text-xs">
                      نشط الآن
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ThemeStats;
