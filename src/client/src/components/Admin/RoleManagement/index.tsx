
import React, { useState } from 'react';
import { useSupabaseUsers } from '@/hooks/useSupabaseUsers';
import { useToast } from "@/components/ui/use-toast";
import { roleService, UserRole } from '@/services/roleService';
import RoleManagementHeader from './RoleManagementHeader';
import RoleStats from './RoleStats';
import RoleSearchFilters from './RoleSearchFilters';
import UsersTable from './UsersTable';
import LoadingSpinner from '@/components/Common/LoadingSpinner';

const RoleManagement = () => {
  const { data: users, isLoading, refetch } = useSupabaseUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const { toast } = useToast();

  const filteredUsers = users?.filter(user => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch = user.full_name?.toLowerCase().includes(searchTermLower) || 
                          user.id.toLowerCase().includes(searchTermLower) ||
                          user.email?.toLowerCase().includes(searchTermLower);
    const matchesRole = selectedRole === 'all' || user.roles.includes(selectedRole);
    return matchesSearch && matchesRole;
  }) || [];

  const handleRoleChange = async (userId: string, newRole: 'admin' | 'user') => {
    const result = await roleService.updateUserRole(userId, newRole as UserRole);

    if (result.success) {
      toast({
        title: "نجاح",
        description: "تم تحديث الدور بنجاح.",
      });
      refetch();
    } else {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث الدور.",
        variant: "destructive",
      });
      console.error('Error updating role:', result.error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <RoleManagementHeader />
      <RoleStats users={users || []} />
      <RoleSearchFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />
      <UsersTable users={filteredUsers} onRoleChange={handleRoleChange} />
    </div>
  );
};

export default RoleManagement;
