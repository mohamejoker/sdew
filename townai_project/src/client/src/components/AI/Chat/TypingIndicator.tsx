
import React from 'react';

interface TypingIndicatorProps {
  currentProvider: any;
  selectedProvider: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ currentProvider, selectedProvider }) => {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${currentProvider?.color} text-white flex items-center justify-center`}>
          {currentProvider && <currentProvider.icon className="h-4 w-4" />}
        </div>
        <div className="bg-gray-100 rounded-2xl p-4">
          <div className="flex items-center gap-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
            </div>
            <span className="text-sm text-gray-600">
              {selectedProvider.toUpperCase()} يعالج...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
