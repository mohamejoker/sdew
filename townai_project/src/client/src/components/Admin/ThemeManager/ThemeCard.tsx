
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Edit, 
  Trash2, 
  Copy, 
  Download, 
  Star,
  Calendar,
  User,
  TrendingDown
} from 'lucide-react';

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

interface ThemeCardProps {
  theme: Theme;
  onSelect: (theme: Theme) => void;
  onActivate: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDownload: (id: string) => void;
  isMobile?: boolean;
}

const ThemeCard: React.FC<ThemeCardProps> = ({
  theme,
  onSelect,
  onActivate,
  onEdit,
  onDelete,
  onDuplicate,
  onDownload,
  isMobile = false
}) => {
  return (
    <Card className={`
      relative overflow-hidden transition-all duration-300 hover:shadow-lg
      ${theme.isActive ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'}
      ${isMobile ? 'w-full' : ''}
    `}>
      {/* معاينة الثيم */}
      <div 
        className="h-24 md:h-32 w-full rounded-t-lg"
        style={{ background: theme.preview }}
      />
      
      {/* شارات الحالة */}
      <div className="absolute top-2 right-2 flex flex-col gap-1">
        {theme.isActive && (
          <Badge className="bg-green-500 text-white text-xs">نشط</Badge>
        )}
        {theme.isDefault && (
          <Badge className="bg-blue-500 text-white text-xs">افتراضي</Badge>
        )}
      </div>

      <CardHeader className="pb-2">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {theme.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {theme.description}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* معلومات الثيم - تخطيط عمودي للهاتف */}
        <div className={`
          ${isMobile 
            ? 'space-y-2' 
            : 'grid grid-cols-2 gap-2 text-xs'
          }
        `}>
          <div className="flex items-center text-gray-500">
            <User className="h-3 w-3 ml-1" />
            <span className="truncate">{theme.author}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Calendar className="h-3 w-3 ml-1" />
            <span>{new Date(theme.createdAt).toLocaleDateString('ar-SA')}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <TrendingDown className="h-3 w-3 ml-1" />
            <span>{theme.downloads.toLocaleString()} تحميل</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Star className="h-3 w-3 ml-1 text-yellow-500" />
            <span>{theme.rating}/5</span>
          </div>
        </div>

        {/* أزرار التحكم - تخطيط محسن للهاتف */}
        <div className={`
          ${isMobile 
            ? 'flex flex-col space-y-2' 
            : 'flex flex-wrap gap-2'
          }
        `}>
          {!theme.isActive && (
            <Button
              size="sm"
              onClick={() => onActivate(theme.id)}
              className={`
                ${isMobile ? 'w-full' : 'flex-1'}
                bg-green-600 hover:bg-green-700
              `}
            >
              <Play className="h-4 w-4 ml-2" />
              تفعيل
            </Button>
          )}
          
          <div className={`
            ${isMobile 
              ? 'grid grid-cols-2 gap-2' 
              : 'flex gap-1'
            }
          `}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(theme.id)}
              className={isMobile ? 'w-full' : ''}
            >
              <Edit className="h-4 w-4 ml-2" />
              {isMobile ? 'تحرير' : ''}
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDuplicate(theme.id)}
              className={isMobile ? 'w-full' : ''}
            >
              <Copy className="h-4 w-4 ml-2" />
              {isMobile ? 'نسخ' : ''}
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDownload(theme.id)}
              className={isMobile ? 'w-full' : ''}
            >
              <Download className="h-4 w-4 ml-2" />
              {isMobile ? 'تنزيل' : ''}
            </Button>
            
            {!theme.isDefault && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDelete(theme.id)}
                className={`
                  ${isMobile ? 'w-full' : ''}
                  text-red-600 hover:text-red-700 hover:bg-red-50
                `}
              >
                <Trash2 className="h-4 w-4 ml-2" />
                {isMobile ? 'حذف' : ''}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeCard;
