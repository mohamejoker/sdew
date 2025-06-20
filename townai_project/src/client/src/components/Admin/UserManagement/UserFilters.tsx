
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Search } from 'lucide-react';
import UserSearchBar from './UserSearchBar';
import { useIsMobile } from '@/hooks/use-mobile';

interface UserFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedRole: string;
  onRoleChange: (role: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  filteredCount: number;
  totalCount: number;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedRole,
  onRoleChange,
  selectedStatus,
  onStatusChange,
  filteredCount,
  totalCount,
  onClearFilters,
  hasActiveFilters,
}) => {
  const isMobile = useIsMobile();

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Search className="h-5 w-5" />
          البحث والتصفية
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-4'}`}>
          <div className={isMobile ? 'col-span-1' : 'col-span-2'}>
            <UserSearchBar 
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
              placeholder="البحث في الأسماء والإيميلات..."
            />
          </div>
          
          <div>
            <select
              value={selectedRole}
              onChange={(e) => onRoleChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">جميع الأدوار</option>
              <option value="admin">مدير</option>
              <option value="moderator">مشرف</option>
              <option value="user">مستخدم</option>
            </select>
          </div>
          
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Eye className="h-4 w-4" />
            <span>عرض {filteredCount} من {totalCount} مستخدم</span>
          </div>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClearFilters}
              className="text-blue-600 hover:text-blue-800"
            >
              مسح التصفية
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserFilters;
