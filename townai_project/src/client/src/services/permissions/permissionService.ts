
export type Permission = 
  | 'users.read' | 'users.write' | 'users.delete'
  | 'orders.read' | 'orders.write' | 'orders.delete'
  | 'payments.read' | 'payments.write' | 'payments.refund'
  | 'analytics.read' | 'analytics.export'
  | 'system.read' | 'system.write' | 'system.admin'
  | 'content.read' | 'content.write' | 'content.publish'
  | 'notifications.read' | 'notifications.send'
  | 'security.read' | 'security.configure';

export type Role = 'admin' | 'manager' | 'moderator' | 'support' | 'analyst' | 'user';

export interface RolePermissions {
  role: Role;
  permissions: Permission[];
  description: string;
}

export class PermissionService {
  private rolePermissions: RolePermissions[] = [
    {
      role: 'admin',
      permissions: [
        'users.read', 'users.write', 'users.delete',
        'orders.read', 'orders.write', 'orders.delete',
        'payments.read', 'payments.write', 'payments.refund',
        'analytics.read', 'analytics.export',
        'system.read', 'system.write', 'system.admin',
        'content.read', 'content.write', 'content.publish',
        'notifications.read', 'notifications.send',
        'security.read', 'security.configure'
      ],
      description: 'صلاحيات كاملة لجميع أجزاء النظام'
    },
    {
      role: 'manager',
      permissions: [
        'users.read', 'users.write',
        'orders.read', 'orders.write',
        'payments.read', 'payments.write',
        'analytics.read', 'analytics.export',
        'content.read', 'content.write', 'content.publish',
        'notifications.read', 'notifications.send'
      ],
      description: 'إدارة المحتوى والطلبات والمدفوعات'
    },
    {
      role: 'moderator',
      permissions: [
        'users.read', 'users.write',
        'orders.read', 'orders.write',
        'content.read', 'content.write',
        'notifications.read'
      ],
      description: 'إدارة المحتوى والمستخدمين'
    },
    {
      role: 'support',
      permissions: [
        'users.read',
        'orders.read', 'orders.write',
        'payments.read',
        'notifications.read', 'notifications.send'
      ],
      description: 'دعم العملاء والطلبات'
    },
    {
      role: 'analyst',
      permissions: [
        'analytics.read', 'analytics.export',
        'orders.read',
        'payments.read',
        'users.read'
      ],
      description: 'تحليل البيانات والتقارير'
    },
    {
      role: 'user',
      permissions: [],
      description: 'مستخدم عادي'
    }
  ];

  hasPermission(userRole: Role, permission: Permission): boolean {
    const role = this.rolePermissions.find(r => r.role === userRole);
    return role ? role.permissions.includes(permission) : false;
  }

  getUserPermissions(userRole: Role): Permission[] {
    const role = this.rolePermissions.find(r => r.role === userRole);
    return role ? role.permissions : [];
  }

  canAccessRoute(userRole: Role, route: string): boolean {
    const routePermissions: { [key: string]: Permission } = {
      '/admin/users': 'users.read',
      '/admin/orders': 'orders.read',
      '/admin/payments': 'payments.read',
      '/admin/analytics': 'analytics.read',
      '/admin/system': 'system.read',
      '/admin/content': 'content.read',
      '/admin/security': 'security.read'
    };

    const requiredPermission = routePermissions[route];
    return requiredPermission ? this.hasPermission(userRole, requiredPermission) : false;
  }

  getAllRoles(): RolePermissions[] {
    return this.rolePermissions;
  }

  getRoleDescription(role: Role): string {
    const roleData = this.rolePermissions.find(r => r.role === role);
    return roleData ? roleData.description : 'دور غير معروف';
  }
}

export const permissionService = new PermissionService();
