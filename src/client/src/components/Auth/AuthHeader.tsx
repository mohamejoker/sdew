
import React from 'react';
import { Brain } from 'lucide-react';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Brain className="h-8 w-8 text-white" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  );
};

export default AuthHeader;
