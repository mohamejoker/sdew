
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { User, Brain, Activity } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  provider?: 'openai' | 'google' | 'grok';
  model?: string;
  tokensUsed?: number;
  cost?: number;
  attachments?: Array<{
    type: 'image' | 'analysis' | 'suggestion';
    data: any;
  }>;
}

interface ChatMessageProps {
  message: Message;
  currentProvider: any;
  providers: any[];
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, currentProvider, providers }) => {
  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start gap-3 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          message.type === 'user' 
            ? 'bg-blue-500 text-white' 
            : message.type === 'ai'
            ? `bg-gradient-to-r ${currentProvider?.color} text-white`
            : 'bg-gray-500 text-white'
        }`}>
          {message.type === 'user' ? (
            <User className="h-4 w-4" />
          ) : message.type === 'ai' ? (
            currentProvider && <currentProvider.icon className="h-4 w-4" />
          ) : (
            <Activity className="h-4 w-4" />
          )}
        </div>
        
        <div className={`rounded-2xl p-4 ${
          message.type === 'user'
            ? 'bg-blue-500 text-white'
            : message.type === 'system'
            ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
            : 'bg-gray-100 text-gray-900'
        }`}>
          <div className="whitespace-pre-wrap">{message.content}</div>
          
          {message.provider && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
              <Badge variant="outline" className="flex items-center gap-1">
                <Brain className="h-3 w-3" />
                {providers.find(p => p.id === message.provider)?.name}
              </Badge>
              {message.tokensUsed && (
                <Badge variant="outline">
                  {message.tokensUsed} رمز مميز
                </Badge>
              )}
              {message.cost && (
                <Badge variant="outline">
                  ${message.cost.toFixed(4)}
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
