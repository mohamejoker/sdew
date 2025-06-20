
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SuggestionsPanel from '@/components/Suggestions/SuggestionsPanel';
import MockDataDisplay from '@/components/Suggestions/MockDataDisplay';

const SuggestionsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          الاقتراحات والبيانات الوهمية
        </h1>
        <p className="text-gray-600">
          استعرض الاقتراحات والتوصيات مع عرض البيانات التجريبية
        </p>
      </div>

      <Tabs defaultValue="suggestions" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="suggestions">الاقتراحات والتوصيات</TabsTrigger>
          <TabsTrigger value="mockdata">البيانات الوهمية</TabsTrigger>
        </TabsList>

        <TabsContent value="suggestions">
          <SuggestionsPanel />
        </TabsContent>

        <TabsContent value="mockdata">
          <MockDataDisplay />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuggestionsPage;
