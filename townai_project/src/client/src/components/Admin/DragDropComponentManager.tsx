
import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Move, Trash2, Copy, Settings, Eye, Plus, Grid, 
  Layout, Type, Image, Box, Circle, Square
} from 'lucide-react';

interface Component {
  id: string;
  type: string;
  name: string;
  icon: any;
  position: { x: number; y: number };
  size: { width: number; height: number };
  style: Record<string, any>;
  content?: string;
  children?: Component[];
}

interface ComponentLibraryItem {
  type: string;
  name: string;
  icon: any;
  defaultStyle: Record<string, any>;
  category: string;
}

const componentLibrary: ComponentLibraryItem[] = [
  {
    type: 'container',
    name: 'حاوية',
    icon: Layout,
    category: 'layout',
    defaultStyle: {
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '8px',
      border: '1px solid #e9ecef',
      minHeight: '100px'
    }
  },
  {
    type: 'text',
    name: 'نص',
    icon: Type,
    category: 'content',
    defaultStyle: {
      fontSize: '16px',
      color: '#333',
      fontWeight: 'normal'
    }
  },
  {
    type: 'button',
    name: 'زر',
    icon: Box,
    category: 'interactive',
    defaultStyle: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer'
    }
  },
  {
    type: 'image',
    name: 'صورة',
    icon: Image,
    category: 'media',
    defaultStyle: {
      width: '200px',
      height: '150px',
      objectFit: 'cover',
      borderRadius: '8px'
    }
  }
];

const DragDropComponentManager = () => {
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<ComponentLibraryItem | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (item: ComponentLibraryItem) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedItem || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newComponent: Component = {
      id: `${draggedItem.type}-${Date.now()}`,
      type: draggedItem.type,
      name: draggedItem.name,
      icon: draggedItem.icon,
      position: { x, y },
      size: { width: 200, height: 100 },
      style: { ...draggedItem.defaultStyle },
      content: draggedItem.type === 'text' ? 'نص تجريبي' : draggedItem.type === 'button' ? 'اضغط هنا' : ''
    };

    setComponents(prev => [...prev, newComponent]);
    setDraggedItem(null);
  };

  const deleteComponent = (id: string) => {
    setComponents(prev => prev.filter(comp => comp.id !== id));
    setSelectedComponent(null);
  };

  const duplicateComponent = (id: string) => {
    const component = components.find(comp => comp.id === id);
    if (!component) return;

    const newComponent: Component = {
      ...component,
      id: `${component.type}-${Date.now()}`,
      position: { x: component.position.x + 20, y: component.position.y + 20 }
    };

    setComponents(prev => [...prev, newComponent]);
  };

  const updateComponentStyle = (id: string, newStyle: Record<string, any>) => {
    setComponents(prev => prev.map(comp =>
      comp.id === id ? { ...comp, style: { ...comp.style, ...newStyle } } : comp
    ));
  };

  const categories = [...new Set(componentLibrary.map(item => item.category))];

  return (
    <div className="h-screen flex">
      {/* Component Library Sidebar */}
      <div className="w-80 bg-gray-50 border-r overflow-y-auto">
        <div className="p-4">
          <h3 className="text-lg font-bold mb-4">مكتبة المكونات</h3>
          
          {categories.map(category => (
            <div key={category} className="mb-6">
              <h4 className="font-medium text-sm text-gray-600 mb-3 uppercase tracking-wide">
                {category === 'layout' && 'التخطيط'}
                {category === 'content' && 'المحتوى'}
                {category === 'interactive' && 'التفاعل'}
                {category === 'media' && 'الوسائط'}
              </h4>
              
              <div className="grid grid-cols-2 gap-2">
                {componentLibrary
                  .filter(item => item.category === category)
                  .map((item) => (
                    <div
                      key={item.type}
                      draggable
                      onDragStart={() => handleDragStart(item)}
                      className="p-3 border rounded-lg cursor-move hover:bg-white hover:shadow-md transition-all bg-white"
                    >
                      <item.icon className="h-6 w-6 mb-2 text-blue-600 mx-auto" />
                      <p className="text-xs text-center font-medium">{item.name}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative overflow-auto bg-white">
        <div
          ref={canvasRef}
          className="relative min-h-full min-w-full"
          style={{ minHeight: '800px', minWidth: '1200px' }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {/* Grid Background */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(#ccc 1px, transparent 1px),
                linear-gradient(90deg, #ccc 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />

          {/* Drop Zone Indicator */}
          {draggedItem && (
            <div className="absolute inset-0 bg-blue-50 border-2 border-dashed border-blue-300 flex items-center justify-center">
              <div className="text-blue-600 text-xl font-medium">
                اسحب وأفلت {draggedItem.name} هنا
              </div>
            </div>
          )}

          {/* Rendered Components */}
          {components.map((component) => (
            <div
              key={component.id}
              className={`absolute cursor-pointer transition-all ${
                selectedComponent === component.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''
              }`}
              style={{
                left: component.position.x,
                top: component.position.y,
                width: component.size.width,
                height: component.size.height,
                ...component.style
              }}
              onClick={() => setSelectedComponent(component.id)}
            >
              {component.type === 'text' && (
                <div style={component.style}>{component.content}</div>
              )}
              
              {component.type === 'button' && (
                <button style={component.style}>{component.content}</button>
              )}
              
              {component.type === 'image' && (
                <div 
                  style={{
                    ...component.style,
                    background: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%), linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 10px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#666'
                  }}
                >
                  <Image className="h-8 w-8" />
                </div>
              )}
              
              {component.type === 'container' && (
                <div style={component.style} className="flex items-center justify-center text-gray-500">
                  حاوية فارغة
                </div>
              )}

              {selectedComponent === component.id && (
                <div className="absolute -top-10 left-0 flex space-x-1 bg-white rounded shadow-lg p-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => duplicateComponent(component.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteComponent(component.id)}
                    className="h-8 w-8 p-0 text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Properties Panel */}
      <div className="w-80 bg-gray-50 border-l p-4 overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">خصائص المكون</h3>
        
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
                    <label className="text-sm font-medium">لون الخلفية</label>
                    <input 
                      type="color" 
                      value={component.style.backgroundColor || '#ffffff'}
                      onChange={(e) => updateComponentStyle(component.id, { backgroundColor: e.target.value })}
                      className="w-full mt-1"
                    />
                  </div>
                  
                  {(component.type === 'text' || component.type === 'button') && (
                    <>
                      <div>
                        <label className="text-sm font-medium">حجم الخط</label>
                        <input 
                          type="number" 
                          value={parseInt(component.style.fontSize) || 16}
                          onChange={(e) => updateComponentStyle(component.id, { fontSize: `${e.target.value}px` })}
                          className="w-full mt-1 px-2 py-1 border rounded"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">لون النص</label>
                        <input 
                          type="color" 
                          value={component.style.color || '#000000'}
                          onChange={(e) => updateComponentStyle(component.id, { color: e.target.value })}
                          className="w-full mt-1"
                        />
                      </div>
                    </>
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
  );
};

export default DragDropComponentManager;
