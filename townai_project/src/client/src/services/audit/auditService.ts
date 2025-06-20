
interface AuditLogEntry {
  action: string;
  table_name?: string;
  record_id?: string;
  old_values?: any;
  new_values?: any;
  ip_address?: string;
  user_agent?: string;
}

class AuditService {
  private getCurrentIP(): string {
    // In a real application, you would get this from a service
    return '127.0.0.1';
  }

  private getUserAgent(): string {
    return navigator.userAgent;
  }

  async logAction(entry: AuditLogEntry): Promise<void> {
    try {
      // For now, we'll just log to console until the audit_logs table is properly configured
      console.log('Audit Log:', {
        action: entry.action,
        table_name: entry.table_name,
        record_id: entry.record_id,
        old_values: entry.old_values,
        new_values: entry.new_values,
        ip_address: entry.ip_address || this.getCurrentIP(),
        user_agent: entry.user_agent || this.getUserAgent(),
        timestamp: new Date().toISOString()
      });

      // TODO: When audit_logs table is available in Supabase types, uncomment and use:
      /*
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.warn('No authenticated user for audit log');
        return;
      }

      const auditEntry = {
        user_id: user.id,
        action: entry.action,
        table_name: entry.table_name,
        record_id: entry.record_id,
        old_values: entry.old_values ? JSON.stringify(entry.old_values) : null,
        new_values: entry.new_values ? JSON.stringify(entry.new_values) : null,
        ip_address: entry.ip_address || this.getCurrentIP(),
        user_agent: entry.user_agent || this.getUserAgent(),
        created_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('audit_logs')
        .insert([auditEntry]);

      if (error) {
        console.error('Failed to log audit entry:', error);
      } else {
        console.log('Audit entry logged:', entry.action);
      }
      */
    } catch (error) {
      console.error('Error in audit logging:', error);
    }
  }

  async getAuditLogs(limit: number = 100) {
    try {
      // For now, return empty array until audit_logs table is available
      console.log('Audit logs requested, returning empty array for now');
      return [];
      
      // TODO: When audit_logs table is available in Supabase types, uncomment and use:
      /*
      const { data, error } = await supabase
        .from('audit_logs')
        .select(`
          id,
          action,
          table_name,
          record_id,
          old_values,
          new_values,
          ip_address,
          user_agent,
          created_at,
          profiles!inner(full_name)
        `)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching audit logs:', error);
        return [];
      }

      return data || [];
      */
    } catch (error) {
      console.error('Error in getAuditLogs:', error);
      return [];
    }
  }

  // Helper methods for common actions
  async logLogin() {
    await this.logAction({ action: 'user_login' });
  }

  async logLogout() {
    await this.logAction({ action: 'user_logout' });
  }

  async logCreate(tableName: string, recordId: string, newValues: any) {
    await this.logAction({
      action: 'create',
      table_name: tableName,
      record_id: recordId,
      new_values: newValues
    });
  }

  async logUpdate(tableName: string, recordId: string, oldValues: any, newValues: any) {
    await this.logAction({
      action: 'update',
      table_name: tableName,
      record_id: recordId,
      old_values: oldValues,
      new_values: newValues
    });
  }

  async logDelete(tableName: string, recordId: string, oldValues: any) {
    await this.logAction({
      action: 'delete',
      table_name: tableName,
      record_id: recordId,
      old_values: oldValues
    });
  }
}

export const auditService = new AuditService();
