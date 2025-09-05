import React, { useState } from 'react';
import { Editor, Frame, Element } from '@craftjs/core';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Save, Eye, EyeOff } from 'lucide-react';

// Import builder components
import { Text, Container, Image, Button as BuilderButton, Navigation } from './index';
import { Toolbox } from './Toolbox';
import { SettingsPanel } from './SettingsPanel';

interface VisualEditorProps {
  initialData?: string;
  onSave?: (data: string) => void;
  title?: string;
}

export const VisualEditor: React.FC<VisualEditorProps> = ({
  initialData,
  onSave,
  title = 'Visual Editor'
}) => {
  const [enabled, setEnabled] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);

  const handleSave = (query: any) => {
    const json = query.serialize();
    onSave?.(json);
  };

  return (
    <div className="h-full flex flex-col" data-testid="visual-editor">
      <Editor
        resolver={{
          Text,
          Container,
          Image,
          Button: BuilderButton,
          Navigation
        }}
        enabled={enabled && !previewMode}
        onRender={({ render }) => render}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <h2 className="text-lg font-semibold">{title}</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPreviewMode(!previewMode)}
              data-testid="button-toggle-preview"
            >
              {previewMode ? (
                <>
                  <EyeOff className="w-4 h-4 mr-2" />
                  Edit
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </>
              )}
            </Button>
            <Editor>
              {({ query }: { query: any }) => (
                <Button
                  onClick={() => handleSave(query)}
                  disabled={previewMode}
                  data-testid="button-save"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              )}
            </Editor>
          </div>
        </div>

        <div className="flex-1 flex">
          {/* Left Panel - Components & Settings */}
          {!previewMode && (
            <div className="w-80 border-r bg-gray-50 flex flex-col">
              <Tabs defaultValue="components" className="flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-2 m-2">
                  <TabsTrigger value="components" data-testid="tab-components">Components</TabsTrigger>
                  <TabsTrigger value="settings" data-testid="tab-settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="components" className="flex-1 m-0 p-2">
                  <ScrollArea className="h-full">
                    <Toolbox />
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="settings" className="flex-1 m-0 p-2">
                  <ScrollArea className="h-full">
                    <SettingsPanel />
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Main Canvas */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto bg-white">
              <div className="min-h-full p-4">
                <Frame data={initialData}>
                  <Element
                    canvas
                    is={Container}
                    background="transparent"
                    padding={20}
                    margin={0}
                    width="100%"
                    height="auto"
                    flexDirection="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    gap={10}
                    borderRadius={0}
                    borderWidth={0}
                    borderColor="#000000"
                    borderStyle="none"
                    data-testid="main-canvas"
                  >
                    <Text 
                      text="Drop components here to start building"
                      fontSize={16}
                      color="#666666"
                      fontWeight="normal"
                      textAlign="center"
                      marginTop={0}
                      marginBottom={0}
                      tag="p"
                    />
                  </Element>
                </Frame>
              </div>
            </div>
          </div>
        </div>
      </Editor>
    </div>
  );
};