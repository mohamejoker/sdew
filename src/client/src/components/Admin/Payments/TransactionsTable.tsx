
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Eye, Download, RefreshCw } from 'lucide-react';
import { Transaction } from './types';

interface TransactionsTableProps {
  transactions: Transaction[];
  getStatusBadge: (status: string) => React.ReactNode;
  getPaymentMethodIcon: (method: string) => React.ReactNode;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions, getStatusBadge, getPaymentMethodIcon }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>رقم المعاملة</TableHead>
            <TableHead>العميل</TableHead>
            <TableHead>المبلغ</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>طريقة الدفع</TableHead>
            <TableHead>الخدمة</TableHead>
            <TableHead>التاريخ</TableHead>
            <TableHead>الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{transaction.id}</TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{transaction.customer}</p>
                  <p className="text-sm text-gray-500">{transaction.email}</p>
                </div>
              </TableCell>
              <TableCell className="font-bold">{transaction.amount}</TableCell>
              <TableCell>{getStatusBadge(transaction.status)}</TableCell>
              <TableCell>{getPaymentMethodIcon(transaction.method)}</TableCell>
              <TableCell className="max-w-32 truncate">{transaction.service}</TableCell>
              <TableCell className="text-sm">{transaction.date}</TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionsTable;
