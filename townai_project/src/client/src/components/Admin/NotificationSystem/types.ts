
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  recipients: number;
  status: 'draft' | 'sent' | 'scheduled';
  createdAt: string;
  scheduledAt?: string;
}
