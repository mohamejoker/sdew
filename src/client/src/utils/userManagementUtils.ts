
import { type SupaUser } from '@/hooks/useSupabaseUsers';

// This is a simplified user type for the export function
export type FormattedUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar: string;
  phone: string;
  lastLogin: string;
};

export const getRoleColor = (role: string): string => {
  switch (role) {
    case 'admin': return 'bg-red-100 text-red-800 border-red-200';
    case 'moderator': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'user': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getRoleLabel = (role: string): string => {
  switch (role) {
    case 'admin': return 'مدير';
    case 'moderator': return 'مشرف';
    case 'user': return 'مستخدم';
    default: return 'غير محدد';
  }
};

export const formatSupabaseUsers = (users: SupaUser[]): FormattedUser[] => {
    return users.map(user => ({
        id: user.id,
        name: user.full_name || 'مستخدم غير مسجل',
        email: user.email || `user${user.id.slice(0, 8)}@example.com`,
        role: user.roles.length > 0 ? user.roles[0] : 'user',
        status: 'active', // Assuming status is always active, as per original code
        avatar: user.full_name ? user.full_name.charAt(0).toUpperCase() : 'U',
        phone: '+966501234567', // Static phone number from original code
        lastLogin: user.created_at ? new Date(user.created_at).toLocaleDateString('ar-SA') : 'غير محدد'
    }));
};

export const exportUsersToCSV = (users: FormattedUser[]): void => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "الاسم,البريد الإلكتروني,الدور,الحالة,آخر دخول\n"
      + users.map(user => 
          `${user.name},${user.email},${getRoleLabel(user.role)},${user.status === 'active' ? 'نشط' : 'غير نشط'},${user.lastLogin}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `users_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
