
import React from 'react';
import { Brain } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  variant?: 'default' | 'white' | 'dark';
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '',
  variant = 'default'
}) => {
  const sizeConfig = {
    sm: { 
      icon: 'h-6 w-6', 
      container: 'w-8 h-8', 
      text: 'text-lg', 
      gap: 'gap-2' 
    },
    md: { 
      icon: 'h-8 w-8', 
      container: 'w-12 h-12', 
      text: 'text-xl', 
      gap: 'gap-3' 
    },
    lg: { 
      icon: 'h-10 w-10', 
      container: 'w-16 h-16', 
      text: 'text-2xl', 
      gap: 'gap-4' 
    },
    xl: { 
      icon: 'h-12 w-12', 
      container: 'w-20 h-20', 
      text: 'text-3xl', 
      gap: 'gap-5' 
    }
  };

  const variantConfig = {
    default: {
      gradient: 'from-blue-500 to-purple-600',
      textColor: 'text-gray-900',
      iconColor: 'text-white'
    },
    white: {
      gradient: 'from-white to-gray-100',
      textColor: 'text-white',
      iconColor: 'text-blue-600'
    },
    dark: {
      gradient: 'from-gray-800 to-gray-900',
      textColor: 'text-gray-900',
      iconColor: 'text-white'
    }
  };

  const config = sizeConfig[size];
  const colors = variantConfig[variant];

  return (
    <div className={`flex items-center ${config.gap} ${className}`}>
      <div className={`
        ${config.container} 
        bg-gradient-to-r ${colors.gradient} 
        rounded-xl flex items-center justify-center 
        shadow-lg hover:shadow-xl transition-shadow duration-300
        hover:scale-105 transform transition-transform
      `}>
        <Brain className={`${config.icon} ${colors.iconColor}`} />
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`
            ${config.text} font-bold ${colors.textColor} 
            bg-gradient-to-r from-blue-600 to-purple-600 
            bg-clip-text text-transparent
          `}>
            منصة التسويق الذكي
          </span>
          <span className="text-sm text-gray-500 font-medium">
            Smart Marketing Platform
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
