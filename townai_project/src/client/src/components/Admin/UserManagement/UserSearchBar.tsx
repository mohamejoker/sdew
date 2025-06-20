
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserSearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

const UserSearchBar: React.FC<UserSearchBarProps> = ({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "البحث..." 
}) => {
  return (
    <div className="relative">
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pr-10 pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
      />
      {searchTerm && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSearchChange('')}
          className="absolute left-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default UserSearchBar;
