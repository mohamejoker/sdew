
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface RoleSearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedRole: string;
  setSelectedRole: (role: string) => void;
}

const RoleSearchFilters: React.FC<RoleSearchFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedRole,
  setSelectedRole
}) => {
  const isMobile = useIsMobile();

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          البحث والتصفية
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
          <div className={isMobile ? '' : 'col-span-2'}>
            <Input
              placeholder="البحث عن المستخدمين..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">جميع الأدوار</option>
            <option value="admin">مدير</option>
            <option value="user">مستخدم</option>
          </select>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleSearchFilters;
