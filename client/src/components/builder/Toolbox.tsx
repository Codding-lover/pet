import React from 'react';
import { useEditor } from '@craftjs/core';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Type, 
  Square, 
  Image as ImageIcon, 
  MousePointer, 
  Menu,
  Plus
} from 'lucide-react';

// Import builder components
import { Text, Container, Image, Button as BuilderButton, Navigation } from './index';

export const Toolbox: React.FC = () => {
  const { connectors, query } = useEditor();

  const components = [
    {
      name: 'Text',
      icon: Type,
      component: Text,
      description: 'Add text, headings, or paragraphs'
    },
    {
      name: 'Container',
      icon: Square,
      component: Container,
      description: 'Layout container with flexbox'
    },
    {
      name: 'Image',
      icon: ImageIcon,
      component: Image,
      description: 'Add images with customizable styling'
    },
    {
      name: 'Button',
      icon: MousePointer,
      component: BuilderButton,
      description: 'Interactive buttons with links'
    },
    {
      name: 'Navigation',
      icon: Menu,
      component: Navigation,
      description: 'Navigation menu with links'
    }
  ];

  return (
    <div className="space-y-2" data-testid="toolbox">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Components</h3>
      
      {components.map((comp) => {
        const IconComponent = comp.icon;
        return (
          <Card
            key={comp.name}
            className="p-3 cursor-pointer hover:bg-gray-50 transition-colors"
            ref={(ref: HTMLDivElement) => {
              if (ref) {
                connectors.create(ref, React.createElement(comp.component as any));
              }
            }}
            data-testid={`toolbox-${comp.name.toLowerCase()}`}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded">
                <IconComponent className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-sm">{comp.name}</div>
                <div className="text-xs text-gray-500">{comp.description}</div>
              </div>
            </div>
          </Card>
        );
      })}
      
      <div className="pt-4">
        <div className="text-xs text-gray-500 text-center">
          Drag components to the canvas to add them
        </div>
      </div>
    </div>
  );
};