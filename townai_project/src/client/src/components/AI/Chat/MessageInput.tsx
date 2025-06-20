
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Image, Send, Sparkles, CheckCircle, Eye, Code } from 'lucide-react';

interface MessageInputProps {
  input: string;
  setInput: (input: string) => void;
  onSend: () => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isTyping: boolean;
  currentProvider: any;
}

const MessageInput: React.FC<MessageInputProps> = ({
  input,
  setInput,
  onSend,
  onImageUpload,
  onKeyPress,
  isTyping,
  currentProvider
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="border-t p-4">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-full"
        >
          <Image className="h-4 w-4" />
        </Button>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="اكتب رسالتك، اطلب تحليل حساب، أو ارفع صورة للتحليل..."
          className="flex-1 rounded-full border-2 border-gray-200 focus:border-blue-500"
          disabled={isTyping}
        />
        <Button
          onClick={onSend}
          disabled={!input.trim() || isTyping}
          className={`rounded-full w-12 h-12 bg-gradient-to-r ${currentProvider?.color}`}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onImageUpload}
        className="hidden"
      />
      
      <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-500">
        <Badge variant="secondary" className="flex items-center gap-1">
          <Sparkles className="h-3 w-3" />
          ذكاء اصطناعي حقيقي
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          متعدد المزودين
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Eye className="h-3 w-3" />
          تحليل الصور
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Code className="h-3 w-3" />
          API حقيقي
        </Badge>
      </div>
    </div>
  );
};

export default MessageInput;
