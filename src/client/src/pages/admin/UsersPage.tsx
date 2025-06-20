
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import UsersHeader from '@/components/Admin/Users/UsersHeader';
import UsersStats from '@/components/Admin/Users/UsersStats';
import UsersFilters from '@/components/Admin/Users/UsersFilters';
import UsersList from '@/components/Admin/Users/UsersList';

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  const { data: userStats } = useQuery({
    queryKey: ['user-stats'],
    queryFn: async () => {
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { count: newUsersToday } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString());

      return {
        totalUsers: totalUsers || 0,
        newUsersToday: newUsersToday || 0,
        activeUsers: Math.floor((totalUsers || 0) * 0.7),
        inactiveUsers: Math.floor((totalUsers || 0) * 0.3)
      };
    }
  });

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  }) || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <UsersHeader />
      <UsersStats stats={userStats} />
      <UsersFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <UsersList users={filteredUsers} />
    </div>
  );
};

export default UsersPage;
