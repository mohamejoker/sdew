
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, Move, Copy, Trash2, Eye, Save, Undo, Redo,
  Layout, Type, Image, Video, Grid, Box, Circle,
  MousePointer, Hand, ZoomIn, ZoomOut
} from 'lucide-react';

interface ComponentItem {
  id: string;
  type: string;
  name: string;
  icon: any;
  position: { x: number; y: number };
  size: { width: number; height: number };
  style: Record<string, any>;
  content?: string;
}

const VisualPageBuilder = () => {
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [draggedComponent, setDraggedComponent] = useState<string | null>(null);
  const [tool, setTool] = useState<'select' | 'move' | 'text' | 'image'>('select');
  const canvasRef = useRef<HTMLDivElement>(null);

  const componentLibrary = [
    { type: 'text', name: 'نص', icon: Type, defaultContent: 'اكتب هنا' },
    { type: 'button', name: 'زر', icon: Box, defaultContent: 'اضغط هنا' },
    { type: 'image', name: 'صورة', icon: Image, defaultContent: '' },
    { type: 'video', name: 'فيديو', icon: Video, defaultContent: '' },
    { type: 'container', name: 'حاوية', icon: Layout, defaultContent: '' },
    { type: 'grid', name: 'شبكة', icon: Grid, defaultContent: '' },
  ];

  const tools = [
    { id: 'select', name: 'تحديد', icon: MousePointer },
    { id: 'move', name: 'نقل', icon: Hand },
    { id: 'text', name: 'نص', icon: Type },
    { id: 'image', name: 'صورة', icon: Image },
  ];

  const addComponent = (type: string) => {
    const libraryItem = componentLibrary.find(item => item.type === type);
    if (!libraryItem) return;

    const newComponent: ComponentItem = {
      id: `${type}-${Date.now()}`,
      type,
      name: libraryItem.name,
      icon: libraryItem.icon,
      position: { x: 100, y: 100 },
      size: { width: 200, height: 100 },
      style: {
        backgroundColor: type === 'container' ? '#f3f4f6' : '#ffffff',
        border: '2px dashed #d1d5db',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        color: '#374151'
      },
      content: libraryItem.defaultContent
    };

    setComponents(prev => [...prev, newComponent]);
  };

  const moveComponent = (id: string, x: number, y: number) => {
    setComponents(prev => prev.map(comp =>
      comp.id === id ? { ...comp, position: { x, y } } : comp
    ));
  };

  const deleteComponent = (id: string) => {
    setComponents(prev => prev.filter(comp => comp.id !== id));
    setSelectedComponent(null);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (tool === 'select') {
      setSelectedComponent(null);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Toolbar */}
      <Card className="border-0 shadow-sm rounded-none">
        <CardHeader className="py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <h2 className="text-lg font-bold">محرر الصفحات المرئي</h2>
              <Badge className="bg-green-100 text-green-800">تجريبي</Badge>
            </div>
            
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Button size="sm" variant="outline">
                <Undo className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Redo className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm">100%</span>
              <Button size="sm" variant="outline">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                معاينة
              </Button>
              <Button size="sm">
                <Save className="h-4 w-4 mr-2" />
                حفظ
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="flex flex-1">
        {/* Left Sidebar - Tools & Components */}
        <div className="w-64 border-r bg-gray-50 flex flex-col">
          {/* Tools */}
          <div className="p-4 border-b">
            <h3 className="font-medium mb-3">الأدوات</h3>
            <div className="grid grid-cols-2 gap-2">
              {tools.map((toolItem) => (
                <Button
                  key={toolItem.id}
                  size="sm"
                  variant={tool === toolItem.id ? "default" : "outline"}
                  onClick={() => setTool(toolItem.id as any)}
                  className="flex flex-col items-center p-3 h-auto"
                >
                  <toolItem.icon className="h-5 w-5 mb-1" />
                  <span className="text-xs">{toolItem.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Component Library */}
          <div className="p-4 flex-1">
            <h3 className="font-medium mb-3">مكتبة المكونات</h3>
            <div className="space-y-2">
              {componentLibrary.map((item) => (
                <Button
                  key={item.type}
                  variant="outline"
                  size="sm"
                  onClick={() => addComponent(item.type)}
                  className="w-full justify-start"
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative overflow-auto bg-white">
          <div
            ref={canvasRef}
            className="relative min-h-full cursor-crosshair"
            style={{ minWidth: '800px', minHeight: '600px' }}
            onClick={handleCanvasClick}
          >
            {/* Grid Background */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(#ccc 1px, transparent 1px),
                  linear-gradient(90deg, #ccc 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}
            />

            {/* Components */}
            {components.map((component) => (
              <div
                key={component.id}
                className={`absolute cursor-pointer transition-all ${
                  selectedComponent === component.id ? 'ring-2 ring-blue-500' : ''
                }`}
                style={{
                  left: component.position.x,
                  top: component.position.y,
                  width: component.size.width,
                  height: component.size.height,
                  ...component.style
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedComponent(component.id);
                }}
                onMouseDown={(e) => {
                  if (tool === 'move') {
                    setDraggedComponent(component.id);
                  }
                }}
              >
                {component.content && (
                  <span className="select-none">{component.content}</span>
                )}
                
                {selectedComponent === component.id && (
                  <>
                    {/* Resize handles */}
                    <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full cursor-nw-resize" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full cursor-ne-resize" />
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded-full cursor-sw-resize" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full cursor-se-resize" />
                    
                    {/* Action buttons */}
                    <div className="absolute -top-8 left-0 flex space-x-1 rtl:space-x-reverse">
                      <Button size="sm" variant="outline" className="h-6 w-6 p-0">
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-6 w-6 p-0"
                        onClick={() => deleteComponent(component.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-64 border-l bg-gray-50 p-4">
          <h3 className="font-medium mb-4">خصائص المكون</h3>
          
          {selectedComponent ? (
            <div className="space-y-4">
              {(() => {
                const component = components.find(c => c.id === selectedComponent);
                if (!component) return null;
                
                return (
                  <>
                    <div>
                      <label className="text-sm font-medium">النوع</label>
                      <p className="text-sm text-gray-600">{component.name}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">الموضع</label>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <input 
                          type="number" 
                          value={component.position.x}
                          onChange={(e) => moveComponent(component.id, parseInt(e.target.value), component.position.y)}
                          className="px-2 py-1 border rounded text-sm"
                          placeholder="X"
                        />
                        <input 
                          type="number" 
                          value={component.position.y}
                          onChange={(e) => moveComponent(component.id, component.position.x, parseInt(e.target.value))}
                          className="px-2 py-1 border rounded text-sm"
                          placeholder="Y"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">الحجم</label>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <input 
                          type="number" 
                          value={component.size.width}
                          className="px-2 py-1 border rounded text-sm"
                          placeholder="العرض"
                        />
                        <input 
                          type="number" 
                          value={component.size.height}
                          className="px-2 py-1 border rounded text-sm"
                          placeholder="الارتفاع"
                        />
                      </div>
                    </div>
                    
                    {component.content !== undefined && (
                      <div>
                        <label className="text-sm font-medium">المحتوى</label>
                        <textarea 
                          value={component.content}
                          onChange={(e) => {
                            setComponents(prev => prev.map(comp =>
                              comp.id === component.id ? { ...comp, content: e.target.value } : comp
                            ));
                          }}
                          className="w-full px-2 py-1 border rounded text-sm mt-1"
                          rows={3}
                        />
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          ) : (
            <p className="text-sm text-gray-500">اختر مكوناً لتحرير خصائصه</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisualPageBuilder;
