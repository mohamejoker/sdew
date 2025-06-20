
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Brain, Target } from 'lucide-react';
import { aiAgent } from '@/services/aiAgent';

const ConversationMemory: React.FC = () => {
  const summary = aiAgent.getConversationSummary();

  return (
    <Card className="w-full bg-gradient-to-r from-indigo-50 to-purple-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
          <Brain className="h-4 w-4 text-purple-600" />
          <span>ذاكرة المحادثة</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">آخر جلسة: اليوم</span>
          </div>
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Target className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-600">{summary}</span>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="secondary" className="text-xs">
              تحليل متقدم
            </Badge>
            <Badge variant="secondary" className="text-xs">
              استراتيجية مخصصة
            </Badge>
            <Badge variant="secondary" className="text-xs">
              تحسين المحتوى
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationMemory;
