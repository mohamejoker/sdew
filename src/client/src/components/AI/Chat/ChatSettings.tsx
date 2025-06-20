
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ChatSettingsProps {
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  selectedProvider: 'openai' | 'google' | 'grok';
  selectedModel: string;
  providers: any[];
  models: any;
  onProviderChange: (provider: 'openai' | 'google' | 'grok') => void;
  onModelChange: (model: string) => void;
}

const ChatSettings: React.FC<ChatSettingsProps> = ({
  showSettings,
  setShowSettings,
  selectedProvider,
  selectedModel,
  providers,
  models,
  onProviderChange,
  onModelChange
}) => {
  if (!showSettings) return null;

  return (
    <div className="border-b p-4 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">مزود الذكاء الاصطناعي</label>
          <Select value={selectedProvider} onValueChange={onProviderChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {providers.map(provider => (
                <SelectItem key={provider.id} value={provider.id}>
                  <div className="flex items-center gap-2">
                    <provider.icon className="h-4 w-4" />
                    {provider.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">النموذج</label>
          <Select value={selectedModel} onValueChange={onModelChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {models[selectedProvider].map((model: any) => (
                <SelectItem key={model.id} value={model.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{model.name}</span>
                    <Badge variant="secondary" className="ml-2">
                      ${model.cost}/1K
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={() => setShowSettings(false)}
            className="w-full"
          >
            إخفاء الإعدادات
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatSettings;
