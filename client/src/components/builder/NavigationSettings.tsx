import { useNode } from '@craftjs/core';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus } from 'lucide-react';
import { NavigationProps, NavigationItem } from './Navigation';

export const NavigationSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as NavigationProps,
  }));

  const addNavigationItem = () => {
    const newItem: NavigationItem = {
      id: Date.now().toString(),
      title: 'New Link',
      url: '/',
      target: '_self'
    };
    setProp((props: NavigationProps) => {
      props.items = [...props.items, newItem];
    });
  };

  const updateNavigationItem = (id: string, field: keyof NavigationItem, value: string) => {
    setProp((props: NavigationProps) => {
      const item = props.items.find(item => item.id === id);
      if (item) {
        (item as any)[field] = value;
      }
    });
  };

  const deleteNavigationItem = (id: string) => {
    setProp((props: NavigationProps) => {
      props.items = props.items.filter(item => item.id !== id);
    });
  };

  return (
    <div className="space-y-4" data-testid="navigation-settings">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Navigation Items</Label>
          <Button size="sm" onClick={addNavigationItem} data-testid="button-add-nav-item">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {props.items.map((item) => (
            <div key={item.id} className="p-3 border rounded-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Item {item.id}</span>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteNavigationItem(item.id)}
                  data-testid={`button-delete-nav-item-${item.id}`}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <div>
                <Label htmlFor={`title-${item.id}`}>Title</Label>
                <Input
                  id={`title-${item.id}`}
                  value={item.title}
                  onChange={(e) => updateNavigationItem(item.id, 'title', e.target.value)}
                  data-testid={`input-nav-title-${item.id}`}
                />
              </div>
              <div>
                <Label htmlFor={`url-${item.id}`}>URL</Label>
                <Input
                  id={`url-${item.id}`}
                  value={item.url}
                  onChange={(e) => updateNavigationItem(item.id, 'url', e.target.value)}
                  data-testid={`input-nav-url-${item.id}`}
                />
              </div>
              <div>
                <Label htmlFor={`target-${item.id}`}>Target</Label>
                <Select 
                  value={item.target} 
                  onValueChange={(value) => updateNavigationItem(item.id, 'target', value)}
                >
                  <SelectTrigger data-testid={`select-nav-target-${item.id}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_self">Same Window</SelectItem>
                    <SelectItem value="_blank">New Window</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="background-color">Background Color</Label>
        <Input
          id="background-color"
          type="color"
          value={props.backgroundColor === 'transparent' ? '#ffffff' : props.backgroundColor}
          onChange={(e) => setProp((props: NavigationProps) => props.backgroundColor = e.target.value)}
          data-testid="input-background-color"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="link-color">Link Color</Label>
          <Input
            id="link-color"
            type="color"
            value={props.linkColor}
            onChange={(e) => setProp((props: NavigationProps) => props.linkColor = e.target.value)}
            data-testid="input-link-color"
          />
        </div>
        <div>
          <Label htmlFor="hover-color">Hover Color</Label>
          <Input
            id="hover-color"
            type="color"
            value={props.hoverColor}
            onChange={(e) => setProp((props: NavigationProps) => props.hoverColor = e.target.value)}
            data-testid="input-hover-color"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="font-size">Font Size</Label>
          <Input
            id="font-size"
            type="number"
            value={props.fontSize}
            onChange={(e) => setProp((props: NavigationProps) => props.fontSize = parseInt(e.target.value))}
            data-testid="input-font-size"
          />
        </div>
        <div>
          <Label htmlFor="padding">Padding</Label>
          <Input
            id="padding"
            type="number"
            value={props.padding}
            onChange={(e) => setProp((props: NavigationProps) => props.padding = parseInt(e.target.value))}
            data-testid="input-padding"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="font-weight">Font Weight</Label>
        <Select 
          value={props.fontWeight} 
          onValueChange={(value) => setProp((props: NavigationProps) => props.fontWeight = value as any)}
        >
          <SelectTrigger data-testid="select-font-weight">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="bold">Bold</SelectItem>
            <SelectItem value="300">Light</SelectItem>
            <SelectItem value="500">Medium</SelectItem>
            <SelectItem value="600">Semi Bold</SelectItem>
            <SelectItem value="700">Bold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="alignment">Alignment</Label>
        <Select 
          value={props.alignment} 
          onValueChange={(value) => setProp((props: NavigationProps) => props.alignment = value as any)}
        >
          <SelectTrigger data-testid="select-alignment">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
            <SelectItem value="space-between">Space Between</SelectItem>
            <SelectItem value="space-around">Space Around</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="direction">Direction</Label>
        <Select 
          value={props.direction} 
          onValueChange={(value) => setProp((props: NavigationProps) => props.direction = value as any)}
        >
          <SelectTrigger data-testid="select-direction">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="horizontal">Horizontal</SelectItem>
            <SelectItem value="vertical">Vertical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="gap">Gap</Label>
          <Input
            id="gap"
            type="number"
            value={props.gap}
            onChange={(e) => setProp((props: NavigationProps) => props.gap = parseInt(e.target.value))}
            data-testid="input-gap"
          />
        </div>
        <div>
          <Label htmlFor="border-radius">Border Radius</Label>
          <Input
            id="border-radius"
            type="number"
            value={props.borderRadius}
            onChange={(e) => setProp((props: NavigationProps) => props.borderRadius = parseInt(e.target.value))}
            data-testid="input-border-radius"
          />
        </div>
      </div>
    </div>
  );
};