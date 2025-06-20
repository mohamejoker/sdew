
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, RefreshCw, AlertCircle } from 'lucide-react';
import { providerService } from '@/services/providers/providerService';
import { useToast } from '@/hooks/use-toast';

interface ProviderBalanceProps {
  providerId: string;
  providerName: string;
}

const ProviderBalance: React.FC<ProviderBalanceProps> = ({ providerId, providerName }) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchBalance = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const providerBalance = await providerService.getProviderBalance(providerId);
      setBalance(providerBalance);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'فشل في جلب الرصيد';
      setError(errorMessage);
      toast({
        title: "خطأ في جلب الرصيد",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [providerId]);

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            رصيد {providerName}
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchBalance}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">{error}</span>
          </div>
        ) : balance !== null ? (
          <div className="space-y-2">
            <div className="text-2xl font-bold text-green-600">
              ${balance.toFixed(2)}
            </div>
            <Badge variant={balance > 10 ? "default" : "destructive"}>
              {balance > 10 ? "رصيد كافي" : "رصيد منخفض"}
            </Badge>
          </div>
        ) : (
          <div className="text-gray-500">جاري تحميل الرصيد...</div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProviderBalance;
