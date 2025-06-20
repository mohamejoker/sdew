
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Palette, 
  Type, 
  Layout, 
  FileText, 
  Zap,
  Moon
} from 'lucide-react';
import ColorSettings from './ColorSettings';
import TypographySettings from './TypographySettings';
import LayoutSettings from './LayoutSettings';
import ContentSettings from './ContentSettings';
import AnimationSettings from './AnimationSettings';
import ThemeSettings from './ThemeSettings';

const UIControlTabs = () => {
  return (
    <Tabs defaultValue="theme" className="h-full">
      <TabsList className="grid w-full grid-cols-6 gap-1 p-2">
        <TabsTrigger value="theme" className="text-xs">
          <Moon className="h-4 w-4" />
        </TabsTrigger>
        <TabsTrigger value="colors" className="text-xs">
          <Palette className="h-4 w-4" />
        </TabsTrigger>
        <TabsTrigger value="typography" className="text-xs">
          <Type className="h-4 w-4" />
        </TabsTrigger>
        <TabsTrigger value="layout" className="text-xs">
          <Layout className="h-4 w-4" />
        </TabsTrigger>
        <TabsTrigger value="content" className="text-xs">
          <FileText className="h-4 w-4" />
        </TabsTrigger>
        <TabsTrigger value="animation" className="text-xs">
          <Zap className="h-4 w-4" />
        </TabsTrigger>
      </TabsList>

      <div className="p-4 space-y-4">
        <TabsContent value="theme" className="space-y-4">
          <ThemeSettings />
        </TabsContent>

        <TabsContent value="colors" className="space-y-4">
          <ColorSettings />
        </TabsContent>

        <TabsContent value="typography" className="space-y-4">
          <TypographySettings />
        </TabsContent>

        <TabsContent value="layout" className="space-y-4">
          <LayoutSettings />
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <ContentSettings />
        </TabsContent>

        <TabsContent value="animation" className="space-y-4">
          <AnimationSettings />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default UIControlTabs;
