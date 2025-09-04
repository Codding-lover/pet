import { useNode } from '@craftjs/core';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ContainerProps } from './Container';

export const ContainerSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as ContainerProps,
  }));

  return (
    <div className="space-y-4" data-testid="container-settings">
      <div>
        <Label htmlFor="background">Background Color</Label>
        <Input
          id="background"
          type="color"
          value={props.background === 'transparent' ? '#ffffff' : props.background}
          onChange={(e) => setProp((props: ContainerProps) => props.background = e.target.value)}
          data-testid="input-background"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="padding">Padding</Label>
          <Input
            id="padding"
            type="number"
            value={props.padding}
            onChange={(e) => setProp((props: ContainerProps) => props.padding = parseInt(e.target.value))}
            data-testid="input-padding"
          />
        </div>
        <div>
          <Label htmlFor="margin">Margin</Label>
          <Input
            id="margin"
            type="number"
            value={props.margin}
            onChange={(e) => setProp((props: ContainerProps) => props.margin = parseInt(e.target.value))}
            data-testid="input-margin"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="width">Width</Label>
          <Input
            id="width"
            value={props.width}
            onChange={(e) => setProp((props: ContainerProps) => props.width = e.target.value)}
            placeholder="100%, 300px, auto"
            data-testid="input-width"
          />
        </div>
        <div>
          <Label htmlFor="height">Height</Label>
          <Input
            id="height"
            value={props.height}
            onChange={(e) => setProp((props: ContainerProps) => props.height = e.target.value)}
            placeholder="auto, 200px"
            data-testid="input-height"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="flex-direction">Flex Direction</Label>
        <Select 
          value={props.flexDirection} 
          onValueChange={(value) => setProp((props: ContainerProps) => props.flexDirection = value as any)}
        >
          <SelectTrigger data-testid="select-flex-direction">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="row">Row (Horizontal)</SelectItem>
            <SelectItem value="column">Column (Vertical)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="justify-content">Justify Content</Label>
        <Select 
          value={props.justifyContent} 
          onValueChange={(value) => setProp((props: ContainerProps) => props.justifyContent = value as any)}
        >
          <SelectTrigger data-testid="select-justify-content">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="flex-start">Start</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="flex-end">End</SelectItem>
            <SelectItem value="space-between">Space Between</SelectItem>
            <SelectItem value="space-around">Space Around</SelectItem>
            <SelectItem value="space-evenly">Space Evenly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="align-items">Align Items</Label>
        <Select 
          value={props.alignItems} 
          onValueChange={(value) => setProp((props: ContainerProps) => props.alignItems = value as any)}
        >
          <SelectTrigger data-testid="select-align-items">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="flex-start">Start</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="flex-end">End</SelectItem>
            <SelectItem value="stretch">Stretch</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="gap">Gap</Label>
        <Input
          id="gap"
          type="number"
          value={props.gap}
          onChange={(e) => setProp((props: ContainerProps) => props.gap = parseInt(e.target.value))}
          data-testid="input-gap"
        />
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Border</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="border-width">Width</Label>
            <Input
              id="border-width"
              type="number"
              value={props.borderWidth}
              onChange={(e) => setProp((props: ContainerProps) => props.borderWidth = parseInt(e.target.value))}
              data-testid="input-border-width"
            />
          </div>
          <div>
            <Label htmlFor="border-radius">Radius</Label>
            <Input
              id="border-radius"
              type="number"
              value={props.borderRadius}
              onChange={(e) => setProp((props: ContainerProps) => props.borderRadius = parseInt(e.target.value))}
              data-testid="input-border-radius"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="border-style">Style</Label>
          <Select 
            value={props.borderStyle} 
            onValueChange={(value) => setProp((props: ContainerProps) => props.borderStyle = value as any)}
          >
            <SelectTrigger data-testid="select-border-style">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="solid">Solid</SelectItem>
              <SelectItem value="dashed">Dashed</SelectItem>
              <SelectItem value="dotted">Dotted</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="border-color">Color</Label>
          <Input
            id="border-color"
            type="color"
            value={props.borderColor}
            onChange={(e) => setProp((props: ContainerProps) => props.borderColor = e.target.value)}
            data-testid="input-border-color"
          />
        </div>
      </div>
    </div>
  );
};