
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserCog, Users, Shield, Edit } from 'lucide-react';
import { toast } from 'sonner';

const RoleManagement = () => {
  const queryClient = useQueryClient();

  const { data: users } = useQuery({
    queryKey: ['users-with-roles'],
    queryFn: async () => {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, email, created_at');

      const { data: userRoles } = await supabase
        .from('user_roles')
        .select('user_id, role');

      return profiles?.map(profile => ({
        ...profile,
        roles: userRoles?.filter(role => role.user_id === profile.id).map(r => r.role) || []
      })) || [];
    }
  });

  const assignRole = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: 'admin' | 'editor' | 'viewer' }) => {
      // Remove existing role first
      await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      // Add new role
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users-with-roles'] });
      toast.success('تم تحديث الدور بنجاح');
    }
  });

  const getRoleBadge = (roles: string[]) => {
    if (roles.includes('admin')) {
      return <Badge className="bg-red-100 text-red-800">مدير</Badge>;
    }
    if (roles.includes('editor')) {
      return <Badge className="bg-blue-100 text-blue-800">محرر</Badge>;
    }
    if (roles.includes('viewer')) {
      return <Badge className="bg-green-100 text-green-800">مشاهد</Badge>;
    }
    return <Badge variant="outline">مستخدم</Badge>;
  };

  const roleStats = {
    admins: users?.filter(user => user.roles.includes('admin')).length || 0,
    editors: users?.filter(user => user.roles.includes('editor')).length || 0,
    viewers: users?.filter(user => user.roles.includes('viewer')).length || 0
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <UserCog className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold">إدارة الأدوار والصلاحيات</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-500" />
              المديرون
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{roleStats.admins}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCog className="h-5 w-5 text-blue-500" />
              المحررون
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{roleStats.editors}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-500" />
              المشاهدون
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{roleStats.viewers}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>إدارة أدوار المستخدمين</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users?.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-medium">{user.full_name || 'مستخدم'}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                  {getRoleBadge(user.roles)}
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={user.roles[0] || 'viewer'}
                    onValueChange={(role) => assignRole.mutate({ userId: user.id, role: role as 'admin' | 'editor' | 'viewer' })}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viewer">مشاهد</SelectItem>
                      <SelectItem value="editor">محرر</SelectItem>
                      <SelectItem value="admin">مدير</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleManagement;
