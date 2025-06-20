
import React from 'react';

export interface PaymentStat {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: string;
  trend: 'up' | 'down';
}

export type TransactionStatus = 'completed' | 'pending' | 'failed' | 'refunded' | 'cancelled';

export interface Transaction {
  id: string;
  customer: string;
  email: string;
  amount: string;
  status: TransactionStatus;
  method: string;
  date: string;
  service: string;
}
