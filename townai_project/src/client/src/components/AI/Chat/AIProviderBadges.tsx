
import React from 'react';
import { Brain, Globe, Zap } from 'lucide-react';

const AIProviderBadges: React.FC = () => {
  const providers = [
    { name: 'OpenAI GPT-4', icon: Brain, color: 'from-green-500 to-blue-500' },
    { name: 'Google Gemini', icon: Globe, color: 'from-blue-500 to-purple-500' },
    { name: 'Grok AI', icon: Zap, color: 'from-purple-500 to-pink-500' }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {providers.map((provider, index) => {
        const IconComponent = provider.icon;
        return (
          <div key={index} className="flex items-center bg-white rounded-full px-4 py-2 shadow-lg border border-gray-200">
            <div className={`w-6 h-6 bg-gradient-to-r ${provider.color} rounded-full flex items-center justify-center mr-2`}>
              <IconComponent className="h-3 w-3 text-white" />
            </div>
            <span className="font-semibold text-gray-700 text-sm">{provider.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default AIProviderBadges;
