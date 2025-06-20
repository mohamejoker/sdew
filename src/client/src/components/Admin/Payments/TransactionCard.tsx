
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Eye, Download, RefreshCw } from 'lucide-react';
import { Transaction } from './types';

interface TransactionCardProps {
  transaction: Transaction;
  getStatusBadge: (status: string) => React.ReactNode;
  getPaymentMethodIcon: (method: string) => React.ReactNode;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction, getStatusBadge, getPaymentMethodIcon }) => {
  return (
    <Card className="border">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{transaction.customer}</p>
              <p className="text-sm text-gray-600">{transaction.email}</p>
            </div>
            <div className="text-left">
              <p className="font-bold text-lg">{transaction.amount}</p>
              <p className="text-xs text-gray-500">{transaction.id}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            {getStatusBadge(transaction.status)}
            {getPaymentMethodIcon(transaction.method)}
          </div>
          
          <div className="border-t pt-3">
            <p className="text-sm text-gray-600 mb-2">{transaction.service}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{transaction.date}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 ml-2" />
                    عرض التفاصيل
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 ml-2" />
                    تحميل الفاتورة
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <RefreshCw className="h-4 w-4 ml-2" />
                    إعادة المعالجة
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionCard;
