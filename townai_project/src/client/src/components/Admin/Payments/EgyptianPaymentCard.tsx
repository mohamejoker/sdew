
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, CreditCard } from 'lucide-react';
import { EgyptianPaymentConfig } from '@/services/payment/egyptianPaymentConfigService';

interface EgyptianPaymentCardProps {
  config: EgyptianPaymentConfig;
  onEdit: (config: EgyptianPaymentConfig) => void;
  onDelete: (id: string) => void;
}

const EgyptianPaymentCard: React.FC<EgyptianPaymentCardProps> = ({
  config,
  onEdit,
  onDelete
}) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg text-white ${config.color_class}`}>
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">{config.display_name}</CardTitle>
              <p className="text-sm text-gray-600">{config.provider_name}</p>
            </div>
          </div>
          <Badge variant={config.is_active ? "default" : "secondary"}>
            {config.is_active ? 'مفعل' : 'معطل'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">الرسوم</span>
            <span className="font-medium">{config.fees_percentage}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">البادئات</span>
            <span className="text-sm">{config.prefixes.join(', ')}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">الوضع</span>
            <div className="flex gap-1">
              {config.manual_mode && <Badge variant="outline">يدوي</Badge>}
              {config.auto_mode && <Badge variant="outline">تلقائي</Badge>}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button size="sm" onClick={() => onEdit(config)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(config.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EgyptianPaymentCard;
